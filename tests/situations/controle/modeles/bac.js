import Bac from 'controle/modeles/bac';
import Piece from 'controle/modeles/piece';

describe('un bac', function () {
  it('sait quel catégorie de pièces accueillir', function () {
    const bac = new Bac({ categorie: true });
    expect(bac.categorie()).to.equal(true);
  });

  it('sait si la pièce correspond à sa catégorie', function () {
    const bac = new Bac({ categorie: false });
    const piece = new Piece({ categorie: false });
    expect(bac.correspondALaCategorie(piece)).to.be(true);
  });

  it('sait si la pièce ne correspond pas à sa catégorie', function () {
    const bac = new Bac({ categorie: true });
    const piece = new Piece({ categorie: false });
    expect(bac.correspondALaCategorie(piece)).to.be(false);
  });
});
