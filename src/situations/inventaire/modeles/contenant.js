import { scene, formes } from 'inventaire/data/stock.js';

export class Contenant {
  constructor (donneesContenant, contenu) {
    Object.assign(this, donneesContenant);
    this.contenu = contenu;

    if (this.forme) {
      this.posX = this.posX * 100 / scene.largeur;
      this.posY = this.posY * 100 / scene.hauteur;

      this.largeur = formes[this.forme].largeur * 100 / scene.largeur;
      this.hauteur = formes[this.forme].hauteur * 100 / scene.hauteur;
      this.profondeurX = formes[this.forme].profondeur * 100 / scene.largeur;
      this.profondeurY = formes[this.forme].profondeur * 100 / scene.hauteur;
      this.dimensionsOuvertes = formes[this.forme].dimensionsOuvertes;
    }
  }

  imageProduit () {
    return this.contenu.image;
  }

  nomProduit () {
    return this.contenu.nom;
  }
}
