import jsdom from 'jsdom-global';

import { NON_DEMARRE, FINI } from 'commun/modeles/situation';
import { Piece, PIECE_CONFORME, PIECE_DEFECTUEUSE } from 'controle/modeles/piece';
import { Situation, NOUVELLE_PIECE, DISPARITION_PIECE } from 'controle/modeles/situation';
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

  it('demarre la situation', function (done) {
    const journal = { enregistre (e) {} };
    const vueSituation = vueSituationMinimaliste(journal);
    vueSituation.demarre = done();

    vueSituation.affiche('#point-insertion', $);
    vueSituation.demarre('#point-insertion', $);
  });

  it('écoute les événements de disparition de pièce pour enregistrer dans le journal', function (done) {
    const journal = {
      enregistre (e) {
        expect(e.donnees()).to.eql({ position: { x: 10, y: 20 } });
        done();
      }
    };
    const piece = new Piece({});
    const vueSituation = vueSituationMinimaliste(journal);
    vueSituation.situation.demarre = () => {};

    vueSituation.affiche('#point-insertion', $);
    vueSituation.demarre('#point-insertion', $);
    vueSituation.situation.emit(NOUVELLE_PIECE, piece);
    piece.changePosition({ x: 10, y: 20 });
    piece.emit(DISPARITION_PIECE);
  });

  it('passe la situation en fini une fois que toutes les pieces ont disparu', function () {
    const journal = { enregistre (e) {} };
    const piece = new Piece({});
    const vueSituation = vueSituationMinimaliste(journal);
    vueSituation.situation.demarre = () => {};

    vueSituation.affiche('#point-insertion', $);
    vueSituation.demarre('#point-insertion', $);
    vueSituation.situation.emit(NOUVELLE_PIECE, piece);
    vueSituation.situation.piecesEnCours().push(piece);
    piece.emit(DISPARITION_PIECE);
    expect(vueSituation.situation.etat()).to.eql(NON_DEMARRE);
    vueSituation.situation.piecesEnCours().pop();
    piece.emit(DISPARITION_PIECE);
    expect(vueSituation.situation.etat()).to.eql(FINI);
  });
});
