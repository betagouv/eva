import { scene, formes } from 'inventaire/data/stock';

function pourcentage (dimension, dimensionScene) {
  return dimension / dimensionScene * 100;
}

export default class Contenant {
  constructor (donneesContenant, contenu) {
    Object.assign(this, donneesContenant);
    this.contenu = contenu;

    if (this.forme) {
      this.posX = pourcentage(this.posX + scene.positionXEtageres, scene.largeur);
      this.posY = pourcentage(this.posY, scene.hauteur);

      this.largeur = pourcentage(formes[this.forme].largeur, scene.largeur);
      this.hauteur = pourcentage(formes[this.forme].hauteur, scene.hauteur);
      this.courbe = pourcentage(formes[this.forme].courbe, scene.hauteur);
      this.profondeurX = pourcentage(formes[this.forme].profondeur, scene.largeur);
      this.profondeurY = pourcentage(formes[this.forme].profondeur, scene.hauteur);
      this.dimensionsOuvert = {
        hauteur: pourcentage(formes[this.forme].dimensionsOuvert.hauteur, scene.hauteur),
        largeur: pourcentage(formes[this.forme].dimensionsOuvert.largeur, scene.largeur)
      };
    }
  }

  imageProduit () {
    return this.contenu.image;
  }

  nomProduit () {
    return this.contenu.nom;
  }
}
