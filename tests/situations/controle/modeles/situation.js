import { FINI } from 'commun/modeles/situation';
import Situation, { NOUVELLE_PIECE, DISPARITION_PIECE, PIECE_BIEN_PLACEE, PIECE_MAL_PLACEE, PIECE_RATEE } from 'controle/modeles/situation';
import Bac from 'controle/modeles/bac';
import Piece from 'controle/modeles/piece';

function creeSituationMinimale () {
  return new Situation({
    cadence: 0,
    scenario: [{ conforme: false }],
    positionApparitionPieces: { x: 25, y: 50 },
    dureeViePiece: 1
  });
}

describe('La situation « Contrôle »', function () {
  it('connaît la cadence à laquelle arrivent les pièces', function () {
    let situation = new Situation({ cadence: 1000 });
    expect(situation.cadenceArriveePieces()).to.equal(1000);
  });

  it("connaît la durée de vie d'une pièce", function () {
    let situation = new Situation({ dureeViePiece: 42 });
    expect(situation.dureeViePiece()).to.equal(42);
  });

  it('sait reconnaître quand plus de pieces à venir', function () {
    let situation = new Situation({ scenario: [] });
    expect(situation.sequenceTerminee()).to.be(true);
  });

  it('initialise le résultat', function () {
    const situation = new Situation({ scenario: [] });
    expect(situation.resultat.bien_placees).to.eql(0);
    expect(situation.resultat.mal_placees).to.eql(0);
    expect(situation.resultat.ratees).to.eql(0);
  });

  it('sait donner la piece suivante quand il y en encore à venir', function () {
    let situation = new Situation({ scenario: [{ conforme: false }], positionApparitionPieces: { x: 25, y: 50 } });
    expect(situation.sequenceTerminee()).to.be(false);

    let piece = situation.pieceSuivante();
    expect(situation.sequenceTerminee()).to.be(true);
    expect(piece.estConforme()).to.be(false);
    expect(piece.position()).to.eql({ x: 25, y: 50 });
  });

  it('démarre la situation et ajoute la piece dans les pieces en cours', function () {
    const situation = creeSituationMinimale();
    expect(situation.piecesAffichees().length).to.eql(0);
    situation.demarre();
    expect(situation.piecesAffichees().length).to.eql(1);
  });

  it("démarre la situation et déclenche un événement a l'ajout de la piece dans les pieces en cours", function (done) {
    const situation = creeSituationMinimale();
    situation.on(NOUVELLE_PIECE, () => {
      done();
    });
    situation.demarre();
  });

  it('enleve la piece des pieces en cours apres le temps défini', function (done) {
    const situation = creeSituationMinimale();
    situation.on(NOUVELLE_PIECE, (piece) => {
      piece.on(DISPARITION_PIECE, () => {
        expect(situation.piecesAffichees().length).to.eql(0);
        done();
      });
    });
    situation.demarre();
  });

  it('passe la situation en fini une fois que toutes les pieces ont disparu', function () {
    const piece1 = new Piece({});
    const piece2 = new Piece({});
    const situation = new Situation({ scenario: [] });

    situation.ajoutePiece(piece1);
    situation.ajoutePiece(piece2);
    situation.faisDisparaitrePiece(piece1);
    expect(situation.etat()).to.not.eql(FINI);
    situation.faisDisparaitrePiece(piece2);
    expect(situation.etat()).to.eql(FINI);
  });

  it('on peut lui ajouter des bacs', function () {
    const situation = new Situation({ scenario: [] });
    situation.ajouteBac(new Bac({}));
    expect(situation.bacs().length).to.eql(1);
  });

  describe('avec un bac et une pièce', function () {
    let piece;
    let bac;
    let situation;

    beforeEach(function () {
      piece = new Piece({});
      bac = new Bac({});
      situation = creeSituationMinimale();

      situation.ajouteBac(bac);
      situation.ajoutePiece(piece);
    });

    it("déclenche l'événement PIECE_BIEN_PLACEE à la disparition", function (done) {
      bac.contient = () => true;
      bac.correspondALaCategorie = () => true;

      situation.on(PIECE_BIEN_PLACEE, (piece) => {
        expect(situation.resultat.bien_placees).to.equal(1);
        done();
      });
      situation.faisDisparaitrePiece(piece);
    });

    it("déclenche l'événement PIECE_MAL_PLACEE à la disparition", function (done) {
      bac.contient = () => true;
      bac.correspondALaCategorie = () => false;

      situation.on(PIECE_MAL_PLACEE, (piece) => {
        expect(situation.resultat.mal_placees).to.equal(1);
        done();
      });
      situation.faisDisparaitrePiece(piece);
    });

    it("déclenche l'événement PIECE_RATEE à la disparition", function (done) {
      bac.contient = () => false;

      situation.on(PIECE_RATEE, (piece) => {
        expect(situation.resultat.ratees).to.equal(1);
        done();
      });
      situation.faisDisparaitrePiece(piece);
    });
  });

  describe('avec un bac et une pièce sélectionnée', function () {
    let piece;
    let bac;
    let situation;

    beforeEach(function () {
      piece = new Piece({});
      bac = new Bac({});
      situation = new Situation({ scenario: [] });

      situation.ajouteBac(bac);
      situation.ajoutePiece(piece);

      piece.selectionne({ x: 0, y: 0 });
    });

    it("il change l'état survolé du bac", function (done) {
      bac.contient = () => true;
      bac.passeEnEtatSurvole = done;

      piece.deplaceSiSelectionnee({ x: 0, y: 0 });
    });

    it("réinitialise l'état survolé du bac", function (done) {
      bac.contient = () => false;
      bac.reinitialiseEtatSurvole = done;

      piece.deplaceSiSelectionnee({ x: 0, y: 0 });
    });

    it('réinitialise au changement de sélection', function (done) {
      bac.reinitialiseEtatSurvole = done;

      piece.deselectionne();
    });

    it("réinitialise l'état survolé des bacs lors de la disparition de la pièce", function (done) {
      bac.reinitialiseEtatSurvole = done;

      situation.faisDisparaitrePiece(piece);
    });

    it("ne réinitialise pas l'état survolé des bacs lorsque la pièce n'est pas sélectionné", function () {
      let nbReinitialiseEtatSurvole = 0;
      piece.deselectionne();
      bac.reinitialiseEtatSurvole = () => nbReinitialiseEtatSurvole++;

      situation.faisDisparaitrePiece(piece);
      expect(nbReinitialiseEtatSurvole).to.equal(0);
    });
  });
});
