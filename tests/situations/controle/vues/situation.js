import jsdom from 'jsdom-global';

import { Journal } from 'commun/modeles/journal';
import { PIECE_CONFORME, PIECE_DEFECTUEUSE } from 'controle/modeles/piece';
import { Situation } from 'controle/modeles/situation';
import EvenementDemarrage from 'commun/modeles/evenement_demarrage';
import { DISPARITION_PIECE, DUREE_VIE_PIECE_INFINIE, VuePiece } from 'controle/vues/piece';
import { VueSituation } from 'controle/vues/situation';

function vueSituationMinimaliste (journal) {
  const situation = new Situation({ scenario: [] });
  return new VueSituation(situation, journal, () => {});
}

describe('La situation « Contrôle »', function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
  });

  it('affiche les bacs et le tapis', function () {
    const vueSituation = vueSituationMinimaliste();
    expect($('#point-insertion .bac.pieces-conformes').length).to.equal(0);
    expect($('#point-insertion .bac.pieces-defectueuses').length).to.equal(0);

    vueSituation.affiche('#point-insertion', $);

    expect($('#point-insertion').hasClass('controle')).to.be(true);
    expect($('#point-insertion .bac.pieces-conformes').length).to.equal(1);
    expect($('#point-insertion .bac.pieces-defectueuses').length).to.equal(1);
    expect($('#point-insertion .tapis').length).to.equal(1);
  });

  it('connaît les bacs associés à la vue', function () {
    const vueSituation = vueSituationMinimaliste();
    const bacs = vueSituation.bacs();

    expect(bacs.length).to.equal(2);
    expect(bacs[0].categorie()).to.equal(PIECE_CONFORME);
    expect(bacs[1].categorie()).to.equal(PIECE_DEFECTUEUSE);
  });

  it('affiche les pièces en séquence selon le scénario pré-établi', function (done) {
    const situation = new Situation({
      cadence: 0,
      scenario: [{ conforme: true, image: 'image-conforme' }, { conforme: false, image: 'image-defectueuse' }],
      positionApparitionPieces: { x: 10, y: 20 },
      dureeViePiece: DUREE_VIE_PIECE_INFINIE
    });

    const journal = new Journal();

    let nbPiecesAffichees = 0;
    let imagesAttendues = ['image-conforme', 'image-defectueuse'];
    const vueSituation = new VueSituation(situation, journal, ($piece) => {
      const imageAttendue = imagesAttendues.shift();
      expect($piece.attr('src')).to.be(imageAttendue);
      nbPiecesAffichees += 1;
      if (nbPiecesAffichees >= 2) { done(); }
    });

    vueSituation.affiche('#point-insertion', $);
    situation.notifie(new EvenementDemarrage());
  });

  it('écoute les événements de disparition de pièce', function (done) {
    const situation = new Situation({
      cadence: 0,
      scenario: [true],
      positionApparitionPieces: { x: 10, y: 20 },
      dureeViePiece: 5
    });

    const journal = {
      enregistre (e) {
        expect(e.donnees()).to.eql({ position: { x: 45, y: 5 } });
        done();
      }
    };

    const vueSituation = new VueSituation(situation, journal, () => {});

    vueSituation.creeVuePiece = (piece) => {
      const vuePiece = new VuePiece(piece, 5, () => {}, () => {});
      setTimeout(() => { vuePiece.emit(DISPARITION_PIECE, { position: { x: 45, y: 5 } }); });
      return vuePiece;
    };
    vueSituation.affiche('#point-insertion', $);
    vueSituation.demarre('#point-insertion', $);
  });
});
