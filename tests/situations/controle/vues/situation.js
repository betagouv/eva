import jsdom from 'jsdom-global';
import { PIECE_CONFORME, PIECE_DEFECTUEUSE } from 'controle/modeles/piece.js';
import { Situation } from 'controle/modeles/situation.js';
import { DUREE_VIE_PIECE_INFINIE } from 'controle/vues/piece.js';
import { VueSituation } from 'controle/vues/situation.js';

function vueSituationMinimaliste () {
  const situation = new Situation({ scenario: [] });
  return new VueSituation(situation, () => {});
}

describe('La situation « Contrôle »', function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="situation-controle"></div>');
    $ = jQuery(window);
  });

  it('affiche le bac des pièces conformes et le bac des pièces défectueuses', function () {
    const vueSituation = vueSituationMinimaliste();
    expect($('#situation-controle .bac.pieces-conformes').length).to.equal(0);
    expect($('#situation-controle .bac.pieces-defectueuses').length).to.equal(0);

    vueSituation.affiche('#situation-controle', $);

    expect($('#situation-controle .bac.pieces-conformes').length).to.equal(1);
    expect($('#situation-controle .bac.pieces-defectueuses').length).to.equal(1);
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
      scenario: [true, false],
      positionApparitionPieces: { x: 10, y: 20 },
      dimensionsPieces: { largeur: 10, hauteur: 35 },
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

  it('est notifiée quand une pièce disparaît', function (done) {
    const situation = new Situation({
      cadence: 0,
      scenario: [true],
      positionApparitionPieces: { x: 10, y: 20 },
      dimensionsPieces: { largeur: 10, hauteur: 35 },
      dureeViePiece: 1
    });

    const verifiePositionEtDimensions = (position, dimensions) => {
      expect(position).to.eql({ x: 10, y: 20 });
      expect(dimensions).to.eql({ largeur: 10, hauteur: 35 });
      done();
    };

    const vueSituation = new VueSituation(situation, () => {});
    vueSituation.surDisparitionPiece(verifiePositionEtDimensions);
    vueSituation.affiche('#situation-controle', $);
  });
});
