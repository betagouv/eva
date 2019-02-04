import dimensions from '../data/dimensionsContenants.json';

export class Contenant {
  constructor (donneesContenant, contenu) {
    Object.assign(this, donneesContenant);
    this.contenu = contenu;

    if (this.forme) {
      this.largeur = dimensions.formes[this.forme].largeur;
      this.hauteur = dimensions.formes[this.forme].hauteur;
    }
  }

  imageProduit () {
    return this.contenu.image;
  }

  nomProduit () {
    return this.contenu.nom;
  }
}
