class Contenant {
  constructor(nom, type, quantite) {
    this.nom = nom;
    this.type = type;
    this.quantite = quantite;
  }

  deType(sousType) {
    this.sousType = sousType;
    return this;
  }

  surEtagere(numeroEtagere) {
    this.hauteur = numeroEtagere;
    return this;
  }

  aLaPosition(positionHorizontale) {
    this.position = positionHorizontale;
    return this;
  }
}

export function unContenantVrac(nom, quantite) {
  return new Contenant(nom, "ContenantVrac", quantite);
}

export function unContenantUnitaire(nom, quantite) {
  return new Contenant(nom, "ContenantUnitaire", quantite);
}
