import { formes } from '../data/stock.js';

export class Contenant {
  constructor (donneesContenant, contenu) {
    Object.assign(this, donneesContenant);
    this.contenu = contenu;

    if (this.forme) {
      this.largeur = formes[this.forme].largeur;
      this.hauteur = formes[this.forme].hauteur;
    }
  }

  imageProduit () {
    return this.contenu.image;
  }

  nomProduit () {
    return this.contenu.nom;
  }
}
