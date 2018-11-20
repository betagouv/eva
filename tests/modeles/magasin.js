import { expect } from "chai";
import { unMagasin, desContenantsUnitaires, desContenantsVrac } from "../aides/magasin.js";

describe("Le magasin", function () {

  it("connaît les produits en stock", function () {

    let magasin = unMagasin().avecEnStock(
      desContenantsUnitaires("Nova Sky", 12),
      desContenantsUnitaires("Premium Terra", 3)
    ).construit();

    expect(magasin.produitsEnStock()).to.deep.equal([
      { "nom": "Nova Sky", "type": "ContenantUnitaire", "quantite": 12 },
      { "nom": "Premium Terra", "type": "ContenantUnitaire", "quantite": 3 }
    ]);
  });

  it("additionne les quantités", function () {
    let magasin = unMagasin().avecEnStock(
      desContenantsUnitaires("Nova Sky", 12),
      desContenantsUnitaires("Nova Sky", 3)
    ).construit();

    expect(magasin.produitsEnStock()).to.deep.equal([
      { "nom": "Nova Sky", "type": "ContenantUnitaire", "quantite": 15 }
    ]);
  });

  it("différencie les types de contenants", function () {
    let magasin = unMagasin().avecEnStock(
      desContenantsUnitaires("Nova Sky", 12),
      desContenantsVrac("Nova Sky", 3)
    ).construit();

    expect(magasin.produitsEnStock()).to.deep.equal([
      { "nom": "Nova Sky", "type": "ContenantUnitaire", "quantite": 12 },
      { "nom": "Nova Sky", "type": "ContenantVrac", "quantite": 3 }
    ]);
  });
});
