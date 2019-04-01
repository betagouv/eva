import { Contenant } from 'inventaire/modeles/contenant.js';
import { unMagasin } from '../aides/magasin.js';

describe('Le magasin', function () {
  it('connaît les produits en stock', function () {
    let magasin = unMagasin().avecCommeReferences(
      { idProduit: '0', nom: 'Nova Sky', image: 'chemin image Nova Sky', forme: 'petiteBouteille' },
      { idProduit: '1', nom: 'Premium Terra', image: 'chemin image Premium Terra', forme: 'grandeBouteille' }
    ).avecEnStock(
      new Contenant({ idContenu: '0', quantite: 12 }),
      new Contenant({ idContenu: '1', quantite: 3 })
    ).construit();

    let produits = magasin.produitsEnStock();
    expect(Array.from(produits)).to.eql([
      ['0', { nom: 'Nova Sky', image: 'chemin image Nova Sky', quantite: 12, forme: 'petiteBouteille' }],
      ['1', { nom: 'Premium Terra', image: 'chemin image Premium Terra', quantite: 3, forme: 'grandeBouteille' }]
    ]);
  });

  it('additionne les quantités', function () {
    let magasin = unMagasin().avecCommeReferences(
      { idProduit: '0', nom: 'Nova Sky', image: 'chemin image Nova Sky', forme: 'petiteBouteille' }
    ).avecEnStock(
      new Contenant({ idContenu: '0', quantite: 12 }),
      new Contenant({ idContenu: '0', quantite: 3 })
    ).construit();

    let produits = magasin.produitsEnStock();
    expect(Array.from(produits)).to.eql([
      ['0', { nom: 'Nova Sky', image: 'chemin image Nova Sky', quantite: 15, forme: 'petiteBouteille' }]
    ]);
  });
});
