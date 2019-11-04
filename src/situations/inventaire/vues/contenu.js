import 'commun/styles/commun.scss';
import 'inventaire/styles/contenu.scss';

// Attention de maintenir la cohérence avec le temps
// de la transition css (class contenu)
const DELAI_FERMETURE_CONTENANT_MILLISEC = 400;

export default class VueContenu {
  constructor (pointInsertion, delaiFermeture = DELAI_FERMETURE_CONTENANT_MILLISEC) {
    this.calque = document.createElement('div');
    this.calque.id = 'calque';
    this.calque.classList.add('calque', 'invisible');
    this.calque.addEventListener('click', (event) => {
      this.element.classList.replace('ouvrir', 'fermer');
      setTimeout(() => {
        this.calque.classList.add('invisible');
        this.element.classList.add('invisible');
        this.element.remove();
        this.calque.remove();
      }, delaiFermeture);
      event.stopPropagation();
    });
    this.pointInsertion = pointInsertion;
  }

  position (position, dimensionFermee, dimensionOuvert) {
    return position + dimensionFermee / 2 - dimensionOuvert / 2;
  }

  affiche (contenant) {
    this.element = document.createElement('img');
    this.element.src = contenant.imageOuvert;
    this.element.classList.add('contenu', 'fermer', 'invisible');
    this.element.style.top = this.position(contenant.posY - contenant.hauteur, contenant.hauteur, contenant.dimensionsOuvert.hauteur) + '%';
    this.element.style.left = this.position(contenant.posX, contenant.largeur, contenant.dimensionsOuvert.largeur) + '%';
    this.element.style.height = contenant.dimensionsOuvert.hauteur + '%';
    this.element.style.width = contenant.dimensionsOuvert.largeur + '%';

    this.pointInsertion.appendChild(this.element);
    this.pointInsertion.appendChild(this.calque);

    this.calque.classList.remove('invisible');
    this.element.classList.remove('invisible');
    setTimeout(() => {
      this.element.classList.replace('fermer', 'ouvrir');
    }, 50);
  }
}
