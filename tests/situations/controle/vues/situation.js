import jsdom from 'jsdom-global';

import { Piece, PIECE_CONFORME, PIECE_DEFECTUEUSE } from 'controle/modeles/piece';
import { Situation } from 'controle/modeles/situation';
import { VueSituation } from 'controle/vues/situation';
import MockAudio from '../../commun/aides/mock_audio';

class SituationDeTest extends Situation {
  constructor (donnees) {
    super(donnees);
    this.audios.fondSonore = new MockAudio();
  }
  demarre () {}
}

function vueSituationMinimaliste (journal) {
  const situation = new SituationDeTest({ scenario: [] });
  return new VueSituation(situation, journal);
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

  it('demarre la situation', function (done) {
    const journal = { enregistre (e) {} };
    const vueSituation = vueSituationMinimaliste(journal);
    vueSituation.demarre = done();

    vueSituation.affiche('#point-insertion', $);
    vueSituation.demarre('#point-insertion', $);
  });

  it('écoute les événements de disparition de pièce pour enregistrer dans le journal', function (done) {
    $.fx.off = true;
    const journal = {
      enregistre (e) {
        expect(e.donnees()).to.eql({ position: { x: 10, y: 20 } });
        done();
      }
    };
    const piece = new Piece({});
    const vueSituation = vueSituationMinimaliste(journal);

    vueSituation.affiche('#point-insertion', $);
    vueSituation.demarre('#point-insertion', $);
    vueSituation.situation.ajoutePiece(piece);
    piece.changePosition({ x: 10, y: 20 });
    vueSituation.situation.faisDisparaitrePiece(piece);
  });
});
