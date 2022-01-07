import Piece from 'commun/modeles/piece';
import DeplaceurPieces from 'commun/modeles/deplaceur_pieces';

describe('Le modele DeplaceurPieces', function () {
  let deplaceur;

  beforeEach(function () {
    deplaceur = new DeplaceurPieces(50, 200);
  });

  describe('#termineSelection', function () {
    let piece;

    beforeEach(function () {
      piece = new Piece({ x: 90, y: 55, largeur: 10, hauteur: 10 });
      deplaceur.debuteSelection(piece, { clientX: 45, clientY: 110 });
    });

    it('déselectionne le pièce', function () {
      expect(piece.estSelectionnee()).toBe(true);

      deplaceur.termineSelection();
      expect(piece.estSelectionnee()).toBe(false);
    });
  });

  describe('#deplacePiecesSelectionnees', function () {
    let piece;

    describe('quand une pièce est selectionnée', function () {
      beforeEach(function () {
        piece = new Piece({ x: 90, y: 55, largeur: 10, hauteur: 10 });
        deplaceur.debuteSelection(piece, { clientX: 45, clientY: 110 });
      });

      it('deplace la pièce', function () {
        deplaceur.deplacePiecesSelectionnees({ clientX: 30, clientY: 20 });
        expect(piece.position()).toEqual({ x: 60, y: 10 });
      });
    });

    describe("quand aucune pièce n'est selectionnée", function () {
      beforeEach(function () {
        piece = new Piece({ x: 90, y: 55, largeur: 10, hauteur: 10 });
      });

      it('ne deplace pas la piece', function () {
        deplaceur.deplaceSouris({ buttons: 1, clientX: 30, clientY: 20 });
        expect(piece.position()).toEqual({ x: 90, y: 55 });
      });
    });
  });

  describe('#deplaceSouris', function () {
    let piece;

    beforeEach(function () {
      piece = new Piece({ x: 90, y: 55, largeur: 10, hauteur: 10 });
      deplaceur.debuteSelection(piece, { clientX: 45, clientY: 110 });
    });

    it('deplace la piece', function () {
      deplaceur.deplaceSouris({ buttons: 1, clientX: 30, clientY: 20 });
      expect(piece.position()).toEqual({ x: 60, y: 10 });
    });

    it('déselectionne les pièces si il y a un mousemove sans maintien du clic (dans le cas ou le mouseup a été fait en dehors de la zone)', function () {
      expect(piece.estSelectionnee()).toBe(true);

      deplaceur.deplaceSouris({ buttons: 0, clientX: 30, clientY: 20 });
      expect(piece.estSelectionnee()).toBe(false);
      expect(piece.position()).toEqual({ x: 90, y: 55 });
    });
  });
});
