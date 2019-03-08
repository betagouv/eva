import { Bac } from 'controle/modeles/bac.js';

describe('un bac', function () {
  it('connaît ses dimensions', function () {
    const bac = new Bac({ largeur: 20, hauteur: 30 });
    expect(bac.dimensions()).to.eql({ largeur: 20, hauteur: 30 });
  });

  it('connaît sa position', function () {
    const bac = new Bac({ x: 5, y: 10 });
    expect(bac.position()).to.eql({ x: 5, y: 10 });
  });
});
