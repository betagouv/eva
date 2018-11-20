function inventaireProduits({ contenants: contenants }) {
  var inventaire = new Map();

  contenants.forEach(function (c) {
    let clefProduit = JSON.stringify({ nom: c.nom, type: c.type });
    if (!inventaire.has(clefProduit)) {
      inventaire.set(clefProduit, 0);
    }
    inventaire.set(clefProduit, inventaire.get(clefProduit) + c.quantite);
  })

  return Array.from(inventaire).map(([clefProduit, quantite]) => {
    let produit = JSON.parse(clefProduit);
    return { nom: produit.nom, type: produit.type, quantite: quantite };
  });
}

export function creeMagasin(unStock) {
  let stock = unStock;

  return {
    produitsEnStock: () => inventaireProduits(stock)
  };
}
