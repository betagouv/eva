import { nouvelInventaireReference } from './inventaireReference.js';
import { Contenant } from './contenant.js';

function inventaireProduits ({ contenants, contenus }) {
  var inventaire = new Map();

  contenants.forEach(function (c) {
    let clefProduit = c.idContenu;
    if (!inventaire.has(clefProduit)) {
      inventaire.set(clefProduit, 0);
    }
    inventaire.set(clefProduit, inventaire.get(clefProduit) + c.quantite);
  });

  var resultat = new Map();
  inventaire.forEach(function (quantite, clefProduit) {
    let produit = contenus[clefProduit];
    resultat.set(clefProduit, { nom: produit.nom, quantite: quantite });
  });

  return resultat;
}

function creerContenants ({ contenants, contenus }) {
  return contenants.map((contenant) => {
    const contenu = contenus[contenant.idContenu];
    return new Contenant(contenant, contenu);
  });
}

export function creeMagasin (unStock) {
  const produits = inventaireProduits(unStock);
  const contenants = creerContenants(unStock);

  return {
    inventaireReference: () => { return nouvelInventaireReference(produits); },
    produitsEnStock: () => { return produits; },
    contenants: () => { return contenants; }
  };
}
