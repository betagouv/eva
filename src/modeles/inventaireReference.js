function ontLesMemesClefs (map1, map2) {
  if (map1.size !== map2.size) return false;

  let clefs = Array.from(map1.keys());
  return clefs.every((clef) => { return map2.has(clef); });
}

function quantiteProduit (clefProduit, inventaire) {
  return inventaire.get(clefProduit).quantite.toString();
}

function valide (reponses, inventaireReference) {
  if (!ontLesMemesClefs(reponses, inventaireReference)) return false;

  let clefsProduits = Array.from(inventaireReference.keys());
  return clefsProduits.every((clef) => {
    return quantiteProduit(clef, reponses) === quantiteProduit(clef, inventaireReference);
  });
}

export function nouvelInventaireReference (inventaire) {
  let inventaireReference = inventaire;

  return {
    valide: (reponses) => { return valide(reponses, inventaireReference); }
  };
}
