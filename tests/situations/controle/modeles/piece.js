import { Piece } from 'controle/modeles/piece.js';

describe('Une pièce', function () {
  it('a une position de départ', function () {
    let piece = new Piece({ x: 90, y: 50 });

    expect(piece.position()).to.eql({ x: 90, y: 50 });
  });

  it('peut être conforme ou défectueuse', function () {
    let pieceConforme = new Piece({ conforme: true });
    let pieceDefectueuse = new Piece({ conforme: false });

    expect(pieceConforme.estConforme()).to.be(true);
    expect(pieceDefectueuse.estConforme()).to.be(false);
  });

  it('peut changer de position', function () {
    let piece = new Piece({ x: 90, y: 50 });

    piece.changePosition({ x: 12, y: 34 });
    expect(piece.position()).to.eql({ x: 12, y: 34 });
  });

  it('notifie ses abonnés des changements de position', function (done) {
    let piece = new Piece({ x: 90, y: 50 });
    piece.quandChangementPosition(function ({ x, y }) {
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
