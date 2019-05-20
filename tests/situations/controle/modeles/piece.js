import Piece from 'controle/modeles/piece';

describe('Une pièce', function () {
  it('connait sa catégorie', function () {
    let pieceConforme = new Piece({ categorie: true });
    let pieceDefectueuse = new Piece({ categorie: false });

    expect(pieceConforme.categorie()).to.be(true);
    expect(pieceDefectueuse.categorie()).to.be(false);
  });
});
