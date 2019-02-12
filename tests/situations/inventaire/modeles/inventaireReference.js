import { nouvelInventaireReference } from 'inventaire/modeles/inventaireReference.js';

describe("L'inventaire de référence", function () {
  it('sait valider les réponses correctes', function () {
    let inventaire = new Map([
      ['0', { quantite: 12 }]
    ]);

    let reponsesUtilisateur = new Map([
      ['0', { quantite: '12' }]
    ]);

    let inventaireReference = nouvelInventaireReference(inventaire);
    let saisieValide = inventaireReference.valide(reponsesUtilisateur);
    expect(Array.from(saisieValide)).to.eql([['0', true]]);
  });

  it('sait valider les réponses incorrectes', function () {
    let inventaire = new Map([
      ['0', { quantite: 12 }],
      ['1', { quantite: 34 }]
    ]);

    let reponsesUtilisateur = new Map([
      ['0', { quantite: '12' }],
      ['1', { quantite: '99' }]
    ]);

    let inventaireReference = nouvelInventaireReference(inventaire);
    let saisieValide = inventaireReference.valide(reponsesUtilisateur);
    expect(Array.from(saisieValide)).to.eql([
      ['0', true],
      ['1', false]
    ]);
  });

  it("lance une exception quand le nombre de réponses diffère de celui de produits dans l'inventaire", function () {
    let inventaire = new Map([
      ['0', { quantite: 12 }]
    ]);

    let reponsesUtilisateur = new Map([
      ['0', { quantite: '12' }],
      ['1', { quantite: '99' }]
    ]);

    let inventaireReference = nouvelInventaireReference(inventaire);
    expect(() => { inventaireReference.valide(reponsesUtilisateur); }).to.throwError();
  });

  it("déclare les réponses incorrectes quand un identifiant produit n'est pas dans l'inventaire", function () {
    let inventaire = new Map([
      ['0', { quantite: 12 }],
      ['1', { quantite: 99 }]
    ]);

    let reponsesUtilisateur = new Map([
      ['0', { quantite: '12' }],
      ['2', { quantite: '47' }]
    ]);

    let inventaireReference = nouvelInventaireReference(inventaire);
    expect(() => { inventaireReference.valide(reponsesUtilisateur); }).to.throwError();
  });
});
