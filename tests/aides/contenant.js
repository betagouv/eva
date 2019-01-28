class Contenant {
  constructor (nom, type, quantite) {
    this.nom = nom;
    this.type = type;
    this.quantite = quantite;
  }

  deCategorie (categorie) {
    this.categorie = categorie;
    return this;
  }

  deCouleur (couleur) {
    this.couleur = couleur;
    return this;
  }

  aLaPosition (posX, posY) {
    this.posX = posX;
    this.posY = posY;
    return this;
  }
}

export function unContenantVrac (nom, quantite) {
  return new Contenant(nom, 'ContenantVrac', quantite);
}

export function unContenantUnitaire (nom, quantite) {
  return new Contenant(nom, 'ContenantUnitaire', quantite);
}
