import Piece from 'tri/modeles/piece';

describe('La pièce du « Tri »', function () {
  it('stocke la position originelle', function () {
    const piece = new Piece({ x: 5, y: 10 });
    piece.changePosition({ x: 30, y: 5 });
    expect(piece.positionOriginelle()).toEqual({ x: 5, y: 10 });
  });
});
