import jsdom from 'jsdom-global';
import { Situation } from 'controle/modeles/situation.js';
import { DUREE_VIE_PIECE_INFINIE } from 'controle/vues/piece.js';
import { VueSituation } from 'controle/vues/situation.js';

describe('La situation « Contrôle »', function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="situation-controle"></div>');
    $ = jQuery(window);
  });

  it('affiche le bac des pièces conformes et le bac des pièces défectueuses', function () {
    const situation = new Situation({ scenario: [] });
    const vueSituation = new VueSituation(situation, () => {});
    expect($('#situation-controle .bac.pieces-conformes').length).to.equal(0);
    expect($('#situation-controle .bac.pieces-defectueuses').length).to.equal(0);

    vueSituation.affiche('#situation-controle', $);

    expect($('#situation-controle .bac.pieces-conformes').length).to.equal(1);
    expect($('#situation-controle .bac.pieces-defectueuses').length).to.equal(1);
  });

  it('affiche les pièces en séquence selon le scénario pré-établi', function (done) {
    const situation = new Situation({
      cadence: 0,
      scenario: [true, false],
      positionApparitionPieces: { x: 10, y: 20 },
      dureeViePiece: DUREE_VIE_PIECE_INFINIE
    });

    let nbPiecesAffichees = 0;
    let classesAttendues = ['conforme', 'defectueuse'];
    const vueSituation = new VueSituation(situation, ($piece) => {
      const classeAttendue = classesAttendues.shift();
      expect($piece.hasClass(classeAttendue)).to.be(true);
      nbPiecesAffichees += 1;
      if (nbPiecesAffichees >= 2) { done(); }
    });

    vueSituation.affiche('#situation-controle', $);
  });
});
