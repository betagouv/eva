import jsdom from 'jsdom-global';

import { CHANGEMENT_ETAT, DEMARRE } from 'commun/modeles/situation';
import { PIECE_CONFORME, PIECE_DEFECTUEUSE } from 'controle/modeles/piece';
import { Situation } from 'controle/modeles/situation';
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
      dureeViePiece: 1
    });

    const journal = {
      enregistre () {}
    };

    let nbPiecesAffichees = 0;
    let imagesAttendues = ['image-conforme', 'image-defectueuse'];
    const vueSituation = new VueSituation(situation, journal, ($piece) => {
      const imageAttendue = imagesAttendues.shift();
      expect($piece.attr('src')).to.be(imageAttendue);
      nbPiecesAffichees += 1;
      if (nbPiecesAffichees >= 2) { done(); }
    });

    vueSituation.affiche('#point-insertion', $);
    situation.emit(CHANGEMENT_ETAT, DEMARRE);
  });

  it('écoute les événements de disparition de pièce pour enregistrer dans le journal', function (done) {
    const situation = new Situation({
      cadence: 0,
      scenario: [true],
      positionApparitionPieces: { x: 10, y: 20 },
      dureeViePiece: 5
    });

    const journal = {
      enregistre (e) {
        expect(e.donnees()).to.eql({ position: { x: 10, y: 20 } });
        done();
      }
    };

    const vueSituation = new VueSituation(situation, journal, () => {});

    vueSituation.affiche('#point-insertion', $);
    vueSituation.demarre('#point-insertion', $);
  });
});
