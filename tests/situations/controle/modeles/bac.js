import Bac from 'controle/modeles/bac';
import Piece, { PIECE_CONFORME, PIECE_DEFECTUEUSE } from 'controle/modeles/piece';

describe('un bac', function () {
  it('sait quel catégorie de pièces accueillir', function () {
    const bac = new Bac({ categorie: PIECE_CONFORME });
    expect(bac.categorie()).to.equal(PIECE_CONFORME);
  });

  it('sait si la pièce correspond à sa catégorie', function () {
    const bac = new Bac({ categorie: PIECE_CONFORME });
    const piece = new Piece({ conforme: PIECE_CONFORME });
    expect(bac.correspondALaCategorie(piece)).to.be(true);
  });

  it('sait si la pièce ne correspond pas à sa catégorie', function () {
    const bac = new Bac({ categorie: PIECE_CONFORME });
    const piece = new Piece({ conforme: PIECE_DEFECTUEUSE });
    expect(bac.correspondALaCategorie(piece)).to.be(false);
  });
});
