import Piece from 'controle/modeles/piece';

describe('Une pièce', function () {
  it('peut être conforme ou défectueuse', function () {
    let pieceConforme = new Piece({ conforme: true });
    let pieceDefectueuse = new Piece({ conforme: false });

    expect(pieceConforme.estConforme()).to.be(true);
    expect(pieceDefectueuse.estConforme()).to.be(false);
  });
});
