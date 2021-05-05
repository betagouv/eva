import Piece, { CHANGEMENT_POSITION, CHANGEMENT_SELECTION } from 'commun/modeles/piece';

describe("Le modèle commun d'une pièce", function () {
  it('a une position de départ', function () {
    const piece = new Piece({ x: 90, y: 50 });

    expect(piece.position()).toEqual({ x: 90, y: 50 });
  });

  it('connait sa catégorie', function () {
    const pieceConforme = new Piece({ categorie: true });
    const pieceDefectueuse = new Piece({ categorie: false });

    expect(pieceConforme.categorie()).toBe(true);
    expect(pieceDefectueuse.categorie()).toBe(false);
  });

  it('a des dimensions', function () {
    const piece = new Piece({ largeur: 10, hauteur: 20 });

    expect(piece.dimensions()).toEqual({ largeur: 10, hauteur: 20 });
  });

  it('peut changer de position', function () {
    const piece = new Piece({ x: 90, y: 50, largeur: 1, hauteur: 1 });

    piece.changePosition({ x: 12, y: 34 });
    expect(piece.position()).toEqual({ x: 12, y: 34 });
  });

  describe('ne peut pas être positionnée en dehors de la scène', function () {
    let piece;

    beforeEach(function () {
      piece = new Piece({ x: 50, y: 50, largeur: 10, hauteur: 11 });
    });

    it('ne peut pas sortir ni à gauche ni en haut', function () {
      piece.changePosition({ x: -1, y: -1 });
      expect(piece.position()).toEqual({ x: 0, y: 0 });
    });
    it('ne peut pas sortir ni à droite ni en bas', function () {
      piece.changePosition({ x: 100, y: 100 });
      expect(piece.position()).toEqual({ x: 90, y: 89 });
    });
  });

  it('notifie ses abonnés des changements de position', function (done) {
    const piece = new Piece({ x: 90, y: 50, hauteur: 1, largeur: 1 });
    piece.on(CHANGEMENT_POSITION, ({ x, y }) => {
      expect(x).toBe(35);
      expect(y).toBe(20);
      done();
    });

    piece.changePosition({ x: 35, y: 20 });
  });

  it('peut être sélectionnée', function () {
    const piece = new Piece({ x: 90, y: 50 });
    expect(piece.estSelectionnee()).toBe(false);

    piece.selectionne({ x: 95, y: 65 });
    expect(piece.estSelectionnee()).toBe(true);
  });

  it('peut être désélectionnée', function () {
    const piece = new Piece({ x: 90, y: 50 });
    piece.selectionne({ x: 95, y: 65 });
    expect(piece.estSelectionnee()).toBe(true);

    piece.deselectionne();
    expect(piece.estSelectionnee()).toBe(false);
  });

  it("notifie lorsqu'elle est sélectionné ou non", function (done) {
    const piece = new Piece({ x: 90, y: 50 });
    piece.on(CHANGEMENT_SELECTION, () => done());
    piece.selectionne({ x: 95, y: 65 });
  });

  it('ne notifie pas lorsque la sélection ne change pas', function () {
    let nombreAppels = 0;
    const piece = new Piece({ x: 90, y: 50 });
    piece.on(CHANGEMENT_SELECTION, () => nombreAppels++);
    piece.selectionne({ x: 95, y: 65 });
    piece.selectionne({ x: 95, y: 65 });
    expect(nombreAppels).toEqual(1);
  });

  it('peut être déplacée quand sélectionnée', function () {
    const piece = new Piece({ x: 90, y: 50, largeur: 1, hauteur: 1 });
    piece.selectionne({ x: 95, y: 65 });

    piece.deplaceSiSelectionnee({ x: 30, y: 35 });
    expect(piece.position()).toEqual({ x: 25, y: 20 });
  });

  it('ne peut pas être déplacée quand déselectionnée', function () {
    const piece = new Piece({ x: 90, y: 50, largeur: 1, hauteur: 1 });
    expect(piece.estSelectionnee()).toBe(false);

    piece.deplaceSiSelectionnee({ x: 30, y: 35 });
    expect(piece.position()).toEqual({ x: 90, y: 50 });
  });
});
