import { nouvelInventaireReference } from 'inventaire/modeles/inventaire_reference';

describe("L'inventaire de référence", function () {
  it('sait valider les réponses correctes', function () {
    const inventaire = new Map([
      ['0', { quantite: 12 }]
    ]);

    const reponsesUtilisateur = new Map([
      ['0', { quantite: '12' }]
    ]);

    const inventaireReference = nouvelInventaireReference(inventaire);
    const saisieValide = inventaireReference.valide(reponsesUtilisateur);
    expect(Array.from(saisieValide)).to.eql([['0', true]]);
  });

  it('sait valider les réponses incorrectes', function () {
    const inventaire = new Map([
      ['0', { quantite: 12 }],
      ['1', { quantite: 34 }]
    ]);

    const reponsesUtilisateur = new Map([
      ['0', { quantite: '12' }],
      ['1', { quantite: '99' }]
    ]);

    const inventaireReference = nouvelInventaireReference(inventaire);
    const saisieValide = inventaireReference.valide(reponsesUtilisateur);
    expect(Array.from(saisieValide)).to.eql([
      ['0', true],
      ['1', false]
    ]);
  });

  it("lance une exception quand le nombre de réponses diffère de celui de produits dans l'inventaire", function () {
    const inventaire = new Map([
      ['0', { quantite: 12 }]
    ]);

    const reponsesUtilisateur = new Map([
      ['0', { quantite: '12' }],
      ['1', { quantite: '99' }]
    ]);

    const inventaireReference = nouvelInventaireReference(inventaire);
    expect(() => { inventaireReference.valide(reponsesUtilisateur); }).to.throwError();
  });

  it("déclare les réponses incorrectes quand un identifiant produit n'est pas dans l'inventaire", function () {
    const inventaire = new Map([
      ['0', { quantite: 12 }],
      ['1', { quantite: 99 }]
    ]);

    const reponsesUtilisateur = new Map([
      ['0', { quantite: '12' }],
      ['2', { quantite: '47' }]
    ]);

    const inventaireReference = nouvelInventaireReference(inventaire);
    expect(() => { inventaireReference.valide(reponsesUtilisateur); }).to.throwError();
  });
});
