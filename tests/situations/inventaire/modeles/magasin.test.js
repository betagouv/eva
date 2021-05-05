import Contenant from 'inventaire/modeles/contenant';
import { unMagasin } from '../aides/magasin';

describe('Le magasin', function () {
  it('connaît les produits en stock triés', function () {
    const magasin = unMagasin().avecCommeReferences(
      { idProduit: '0', nom: 'Nova Sky', image: 'chemin image Nova Sky', forme: 'petiteBouteille', position: 2 },
      { idProduit: '1', nom: 'Premium Terra', image: 'chemin image Premium Terra', forme: 'grandeBouteille', position: 1 }
    ).avecEnStock(
      new Contenant({ idContenu: '0', quantite: 12 }),
      new Contenant({ idContenu: '1', quantite: 3 })
    ).construit();

    const produits = magasin.produitsEnStock();
    expect(Array.from(produits)).toEqual([
      ['1', { nom: 'Premium Terra', image: 'chemin image Premium Terra', quantite: 3, forme: 'grandeBouteille', position: 1 }],
      ['0', { nom: 'Nova Sky', image: 'chemin image Nova Sky', quantite: 12, forme: 'petiteBouteille', position: 2 }]
    ]);
  });

  it('additionne les quantités', function () {
    const magasin = unMagasin().avecCommeReferences(
      { idProduit: '0', nom: 'Nova Sky', image: 'chemin image Nova Sky', forme: 'petiteBouteille', position: 1 }
    ).avecEnStock(
      new Contenant({ idContenu: '0', quantite: 12 }),
      new Contenant({ idContenu: '0', quantite: 3 })
    ).construit();

    const produits = magasin.produitsEnStock();
    expect(Array.from(produits)).toEqual([
      ['0', { nom: 'Nova Sky', image: 'chemin image Nova Sky', quantite: 15, forme: 'petiteBouteille', position: 1 }]
    ]);
  });
});
