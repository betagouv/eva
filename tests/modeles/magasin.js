import { unMagasin } from '../aides/magasin.js';
import { unContenantUnitaire, unContenantVrac } from '../aides/contenant.js';

describe('Le magasin', function () {
  it('connaît les produits en stock', function () {
    let magasin = unMagasin().avecEnStock(
      unContenantUnitaire('Nova Sky', 12),
      unContenantUnitaire('Premium Terra', 3)
    ).construit();

    expect(magasin.produitsEnStock()).to.eql([
      { nom: 'Nova Sky', type: 'ContenantUnitaire', quantite: 12 },
      { nom: 'Premium Terra', type: 'ContenantUnitaire', quantite: 3 }
    ]);
  });

  it('additionne les quantités', function () {
    let magasin = unMagasin().avecEnStock(
      unContenantUnitaire('Nova Sky', 12),
      unContenantUnitaire('Nova Sky', 3)
    ).construit();

    expect(magasin.produitsEnStock()).to.eql([
      { nom: 'Nova Sky', type: 'ContenantUnitaire', quantite: 15 }
    ]);
  });

  it('différencie les types de contenants', function () {
    let magasin = unMagasin().avecEnStock(
      unContenantUnitaire('Nova Sky', 12),
      unContenantVrac('Nova Sky', 3)
    ).construit();

    expect(magasin.produitsEnStock()).to.eql([
      { nom: 'Nova Sky', type: 'ContenantUnitaire', quantite: 12 },
      { nom: 'Nova Sky', type: 'ContenantVrac', quantite: 3 }
    ]);
  });
});
