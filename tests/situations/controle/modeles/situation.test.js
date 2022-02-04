import { FINI } from 'commun/modeles/situation';
import Situation, { NOUVELLE_PIECE, PIECE_RATEE } from 'controle/modeles/situation';
import Piece, {
  DISPARITION_PIECE,
  PIECE_BIEN_PLACEE,
  PIECE_MAL_PLACEE,
  PIECE_DEPOSE_HORS_BACS,
  PIECE_DEPOSE_DANS_BAC,
  PIECE_PRISE
} from 'commun/modeles/piece';

function creeSituationMinimale (bacs = []) {
  return new Situation({
    cadence: 0,
    scenario: [{ conforme: false }],
    positionApparitionPieces: { x: 25, y: 50 },
    dureeViePiece: 1,
    bacs
  });
}

describe('La situation « Contrôle »', function () {
  it('connaît la cadence à laquelle arrivent les pièces', function () {
    const situation = new Situation({ cadence: 1000 });
    expect(situation._cadence).toBe(1000);
  });

  it("connaît la durée de vie d'une pièce", function () {
    const situation = new Situation({ dureeViePiece: 42 });
    expect(situation.dureeViePiece()).toBe(42);
  });

  it('sait reconnaître quand plus de pieces à venir', function () {
    const situation = new Situation({ scenario: [] });
    expect(situation.sequenceTerminee()).toBe(true);
  });

  it('initialise le résultat', function () {
    const situation = new Situation({ scenario: [] });
    expect(situation.resultat.bien_placees).toEqual(0);
    expect(situation.resultat.mal_placees).toEqual(0);
    expect(situation.resultat.ratees).toEqual(0);
  });

  it('sait donner la piece suivante quand il y en encore à venir', function () {
    const situation = new Situation({ scenario: [{ categorie: false }], positionApparitionPieces: { x: 25, y: 50 } });
    expect(situation.sequenceTerminee()).toBe(false);

    const piece = situation.pieceSuivante();
    expect(situation.sequenceTerminee()).toBe(true);
    expect(piece.categorie()).toBe(false);
    expect(piece.position()).toEqual({ x: 25, y: 50 });
  });

  it("démarre la situation mais n'ajoute pas immediatement une piece dans les pieces en cours", function () {
    const situation = creeSituationMinimale();
    expect(situation.piecesAffichees().length).toEqual(0);
    situation.demarre();
    expect(situation.piecesAffichees().length).toEqual(0);
  });

  it("démarre la situation et déclenche un événement à l'ajout de la piece dans les pieces en cours", function (done) {
    const situation = creeSituationMinimale();
    situation.on(NOUVELLE_PIECE, () => {
      done();
    });
    situation.demarre();
  });

  it('enlève la pièce des pieces en cours après le temps défini', function (done) {
    const situation = creeSituationMinimale();
    situation.on(NOUVELLE_PIECE, (piece) => {
      piece.on(DISPARITION_PIECE, () => {
        expect(situation.piecesAffichees().length).toEqual(0);
        done();
      });
    });
    situation.demarre();
  });

  it('passe la situation en fini une fois que toutes les pièces ont disparu', function () {
    const piece1 = new Piece({});
    const piece2 = new Piece({});
    const situation = new Situation({ scenario: [] });

    situation.ajoutePiece(piece1);
    situation.ajoutePiece(piece2);
    situation.faisDisparaitrePiece(piece1);

    expect(situation.etat()).not.toEqual(FINI);
    situation.faisDisparaitrePiece(piece2);
    expect(situation.etat()).toEqual(FINI);
  });

  describe('avec un bac et une pièce', function () {
    let piece;
    let bac;
    let situation;

    beforeEach(function () {
      piece = new Piece({});
      situation = creeSituationMinimale([{}]);
      bac = situation.bacs()[0];

      situation.ajoutePiece(piece);
    });

    it("déclenche l'événement PIECE_BIEN_PLACEE à la disparition", function (done) {
      bac.contient = () => true;
      bac.correspondALaCategorie = () => true;

      situation.on(PIECE_BIEN_PLACEE, () => {
        expect(situation.resultat.bien_placees).toBe(1);
        done();
      });
      situation.faisDisparaitrePiece(piece);
    });

    it("déclenche l'événement PIECE_MAL_PLACEE à la disparition", function (done) {
      bac.contient = () => true;
      bac.correspondALaCategorie = () => false;

      situation.on(PIECE_MAL_PLACEE, () => {
        expect(situation.resultat.mal_placees).toBe(1);
        done();
      });
      situation.faisDisparaitrePiece(piece);
    });

    it("déclenche l'événement PIECE_RATEE à la disparition", function (done) {
      bac.contient = () => false;

      situation.on(PIECE_RATEE, () => {
        expect(situation.resultat.ratees).toBe(1);
        done();
      });
      situation.faisDisparaitrePiece(piece);
    });

    it("déclenche l'événement PIECE_PRISE lorsque la pièce est sélectionnée", function (done) {
      situation.on(PIECE_PRISE, (piece2) => {
        expect(piece2).toBe(piece);
        done();
      });
      piece.selectionne({ x: 0, y: 0 });
    });

    it("déclenche l'événement PIECE_PRISE seulement lorsque la pièce est sélectionnée", function () {
      let nombreAppelsPiecePrise = 0;
      situation.on(PIECE_PRISE, () => {
        nombreAppelsPiecePrise++;
      });
      piece.selectionne({ x: 0, y: 0 });
      piece.deselectionne();
      expect(nombreAppelsPiecePrise).toEqual(1);
    });
  });

  describe('avec un bac et une pièce sélectionnée', function () {
    let piece;
    let bac;
    let situation;

    beforeEach(function () {
      piece = new Piece({});
      situation = new Situation({ scenario: [], bacs: [{}] });
      bac = situation.bacs()[0];

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
      expect(nbReinitialiseEtatSurvole).toBe(0);
    });

    it("envoi l'événement PIECE_DEPOSE_HORS_BACS a la dépose d'un biscuit hors bacs", function (done) {
      situation.on(PIECE_DEPOSE_HORS_BACS, (piece2) => {
        expect(piece2).toEqual(piece);
        done();
      });
      piece.deselectionne();
    });

    it("n'envoi pas l'événement PIECE_DEPOSE_HORS_BACS a la dépose d'un biscuit dans un bac", function () {
      bac.contient = () => true;
      let nombreAppelsDeposeHorsBacs = 0;
      situation.on(PIECE_DEPOSE_HORS_BACS, () => {
        nombreAppelsDeposeHorsBacs++;
      });
      piece.deselectionne();
      expect(nombreAppelsDeposeHorsBacs).toEqual(0);
    });

    it("l'événement PIECE_DANS_BAC a la dépose d'un biscuit dans un bac", function (done) {
      bac.contient = () => true;
      situation.on(PIECE_DEPOSE_DANS_BAC, (piece2) => {
        expect(piece2).toEqual(piece);
        done();
      });
      piece.deselectionne();
    });

    it("n'écoute plus le changement de sélection après la fin de la situation", function () {
      let appelsReinitialisation = 0;
      situation.reinitialiseBacs = () => appelsReinitialisation++;
      situation.termine();
      piece.deselectionne();

      expect(appelsReinitialisation).toEqual(0);
    });
  });
});
