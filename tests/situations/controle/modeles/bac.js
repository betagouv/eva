import { Bac } from 'controle/modeles/bac.js';
import { PIECE_CONFORME } from 'controle/modeles/piece.js';

describe('un bac', function () {
  it('connaît ses dimensions', function () {
    const bac = new Bac({ largeur: 20, hauteur: 30 });
    expect(bac.dimensions()).to.eql({ largeur: 20, hauteur: 30 });
  });

  it('connaît sa position', function () {
    const bac = new Bac({ x: 5, y: 10 });
    expect(bac.position()).to.eql({ x: 5, y: 10 });
  });

  it('sait quel catégorie de pièces accueillir', function () {
    const bac = new Bac({ categorie: PIECE_CONFORME });
    expect(bac.categorie()).to.equal(PIECE_CONFORME);
  });
});
