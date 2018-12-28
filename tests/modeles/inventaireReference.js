import { nouvelInventaireReference } from '../../src/modeles/inventaireReference.js';

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
    expect(saisieValide).to.be(true);
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
    expect(saisieValide).to.be(false);
  });

  it("déclare les réponses incorrectes quand le nombre de réponses diffère de celui de produits dans l'inventaire", function () {
    let inventaire = new Map([
      ['0', { quantite: 12 }]
    ]);

    let reponsesUtilisateur = new Map([
      ['0', { quantite: '12' }],
      ['1', { quantite: '99' }]
    ]);

    let inventaireReference = nouvelInventaireReference(inventaire);
    let saisieValide = inventaireReference.valide(reponsesUtilisateur);
    expect(saisieValide).to.be(false);
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
    let saisieValide = inventaireReference.valide(reponsesUtilisateur);
    expect(saisieValide).to.be(false);
  });
});
