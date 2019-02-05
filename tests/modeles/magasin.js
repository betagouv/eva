import { Contenant } from '../../src/modeles/contenant.js';
import { unMagasin } from '../aides/magasin.js';

describe('Le magasin', function () {
  it('connaît les produits en stock', function () {
    let magasin = unMagasin().avecCommeReferences(
      { idProduit: '0', nom: 'Nova Sky', image: 'chemin image Nova Sky' },
      { idProduit: '1', nom: 'Premium Terra', image: 'chemin image Premium Terra' }
    ).avecEnStock(
      new Contenant({ idContenu: '0', quantite: 12 }),
      new Contenant({ idContenu: '1', quantite: 3 })
    ).construit();

    let produits = magasin.produitsEnStock();
    expect(Array.from(produits)).to.eql([
      ['0', { nom: 'Nova Sky', image: 'chemin image Nova Sky', quantite: 12 }],
      ['1', { nom: 'Premium Terra', image: 'chemin image Premium Terra', quantite: 3 }]
    ]);
  });

  it('additionne les quantités', function () {
    let magasin = unMagasin().avecCommeReferences(
      { idProduit: '0', nom: 'Nova Sky', image: 'chemin image Nova Sky' }
    ).avecEnStock(
      new Contenant({ idContenu: '0', quantite: 12 }),
      new Contenant({ idContenu: '0', quantite: 3 })
    ).construit();

    let produits = magasin.produitsEnStock();
    expect(Array.from(produits)).to.eql([
      ['0', { nom: 'Nova Sky', image: 'chemin image Nova Sky', quantite: 15 }]
    ]);
  });
});
