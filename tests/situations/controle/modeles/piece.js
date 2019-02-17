import { Piece } from 'controle/modeles/piece.js';

describe('Une pièce', function () {
  it('a une position de départ', function () {
    let piece = new Piece({ x: 90, y: 50 });

    expect(piece.position()).to.eql({ x: 90, y: 50 });
  });

  it('peut changer de position', function () {
    let piece = new Piece({ x: 90, y: 50 });

    piece.changePosition({ x: 12, y: 34 });
    expect(piece.position()).to.eql({ x: 12, y: 34 });
  });
});
