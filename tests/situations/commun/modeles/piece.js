import Piece, { CHANGEMENT_POSITION, CHANGEMENT_SELECTION } from 'commun/modeles/piece';

describe("Le modèle commun d'une pièce", function () {
  it('a une position de départ', function () {
    let piece = new Piece({ x: 90, y: 50 });

    expect(piece.position()).to.eql({ x: 90, y: 50 });
  });

  it('peut changer de position', function () {
    let piece = new Piece({ x: 90, y: 50 });

    piece.changePosition({ x: 12, y: 34 });
    expect(piece.position()).to.eql({ x: 12, y: 34 });
  });

  it('a des dimensions', function () {
    const piece = new Piece({ largeur: 10, hauteur: 20 });

    expect(piece.dimensions()).to.eql({ largeur: 10, hauteur: 20 });
  });

  it('notifie ses abonnés des changements de position', function (done) {
    let piece = new Piece({ x: 90, y: 50 });
    piece.on(CHANGEMENT_POSITION, ({ x, y }) => {
      expect(x).to.equal(35);
      expect(y).to.equal(20);
      done();
    });

    piece.changePosition({ x: 35, y: 20 });
  });

  it('peut être sélectionnée', function () {
    let piece = new Piece({ x: 90, y: 50 });
    expect(piece.estSelectionnee()).to.be(false);

    piece.selectionne({ x: 95, y: 65 });
    expect(piece.estSelectionnee()).to.be(true);
  });

  it('peut être désélectionnée', function () {
    let piece = new Piece({ x: 90, y: 50 });
    piece.selectionne({ x: 95, y: 65 });
    expect(piece.estSelectionnee()).to.be(true);

    piece.deselectionne();
    expect(piece.estSelectionnee()).to.be(false);
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
    expect(nombreAppels).to.eql(1);
  });

  it('peut être déplacée quand sélectionnée', function () {
    let piece = new Piece({ x: 90, y: 50 });
    piece.selectionne({ x: 95, y: 65 });

    piece.deplaceSiSelectionnee({ x: 30, y: 35 });
    expect(piece.position()).to.eql({ x: 25, y: 20 });
  });

  it('ne peut pas être déplacée quand déselectionnée', function () {
    let piece = new Piece({ x: 90, y: 50 });
    expect(piece.estSelectionnee()).to.be(false);

    piece.deplaceSiSelectionnee({ x: 30, y: 35 });
    expect(piece.position()).to.eql({ x: 90, y: 50 });
  });
});
