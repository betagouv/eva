function inventaireProduits ({ contenants }) {
  var inventaire = new Map();

  contenants.forEach(function (c) {
    let clefProduit = JSON.stringify({ nom: c.nom, type: c.type });
    if (!inventaire.has(clefProduit)) {
      inventaire.set(clefProduit, 0);
    }
    inventaire.set(clefProduit, inventaire.get(clefProduit) + c.quantite);
  });

  var resultat = new Map();
  var index = 0;
  inventaire.forEach(function (quantite, clefProduit) {
    let produit = JSON.parse(clefProduit);
    resultat.set(index.toString(), { nom: produit.nom, type: produit.type, quantite: quantite });
    index += 1;
  });

  return resultat;
}

export function creeMagasin (unStock) {
  let produits = inventaireProduits(unStock);

  return {
    produitsEnStock: () => { return produits; }
  };
}
