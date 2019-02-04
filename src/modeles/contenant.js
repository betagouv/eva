import dimensions from '../data/dimensionsContenants.json';

export class Contenant {
  constructor (donneesContenant) {
    Object.assign(this, donneesContenant);
    if (this.forme) {
      this.largeur = dimensions.formes[this.forme].largeur;
      this.hauteur = dimensions.formes[this.forme].hauteur;
    }
  }
}
