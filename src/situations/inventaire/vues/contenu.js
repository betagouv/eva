import 'inventaire/styles/commun.scss';
import 'inventaire/styles/contenu.scss';
import { scene } from 'inventaire/data/stock.js';

// Attention de maintenir la cohérence avec le temps
// de la transition css (class contenu)
const DELAY_FERMETURE_CONTENANT_MILLISEC = 400;

class VueContenu {
  constructor (pointInsertion) {
    this.dimensions = { largeur: 33 };
    this.calque = document.createElement('div');
    this.calque.id = 'calque';
    pointInsertion.appendChild(this.calque);
    this.calque.classList.add('calque');
    this.calque.classList.add('invisible');
    this.calque.addEventListener('click', (event) => {
      this.element.classList.replace('ouvrir', 'fermer');
      setTimeout(() => {
        this.calque.classList.add('invisible');
        this.element.classList.add('invisible');
      }, DELAY_FERMETURE_CONTENANT_MILLISEC);
      event.stopPropagation();
    });
    this.element = document.createElement('img');
    this.element.classList.add('contenu', 'fermer');
    pointInsertion.appendChild(this.element);
  }

  position (position, dimensionFermee, dimensionOuverte) {
    var positionCalculee = position + dimensionFermee / 2 - dimensionOuverte / 2;
    positionCalculee = Math.max(positionCalculee, 0);
    positionCalculee = Math.min(positionCalculee, 100 - dimensionOuverte);
    return positionCalculee;
  }

  calculeHauteurAdaptee (contenant, largeur) {
    if (!contenant.dimensionsOuvertes) {
      return largeur;
    }

    let proportionContenantOuvert = contenant.dimensionsOuvertes.hauteur / contenant.dimensionsOuvertes.largeur;
    var largeurEnPixels = largeur * scene.largeur;
    var hauteurEnPixels = largeurEnPixels * proportionContenantOuvert;

    return hauteurEnPixels / scene.hauteur;
  }

  affiche (contenant) {
    this.dimensions.hauteur = this.calculeHauteurAdaptee(contenant, this.dimensions.largeur);
    this.calque.classList.remove('invisible');
    this.element.classList.remove('invisible');
    this.element.style.top = this.position(contenant.posY - contenant.hauteur, contenant.hauteur, this.dimensions.hauteur) + '%';
    this.element.style.left = this.position(contenant.posX, contenant.largeur, this.dimensions.largeur) + '%';
    this.element.style.height = this.dimensions.hauteur + '%';
    this.element.style.width = this.dimensions.largeur + '%';
    this.element.src = contenant.imageOuvert;

    setTimeout(() => {
      this.element.classList.replace('fermer', 'ouvrir');
    }, 50);
  }
}

export { DELAY_FERMETURE_CONTENANT_MILLISEC, VueContenu };
