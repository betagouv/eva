import 'inventaire/styles/commun.scss';
import 'inventaire/styles/contenu.scss';

// Attention de maintenir la cohérence avec le temps
// de la transition css (class contenu)
const DELAY_FERMETURE_CONTENANT_MILLISEC = 400;

class VueContenu {
  constructor (pointInsertion, id, dimensions) {
    this.dimensions = dimensions;
    this.calque = document.createElement('div');
    this.calque.id = id;
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
    this.element = document.createElement('div');
    this.element.classList.add('contenu', 'fermer');
    pointInsertion.appendChild(this.element);

    this.elementInterieur = document.createElement('div');
    this.elementInterieur.classList.add('interieur');
    this.element.appendChild(this.elementInterieur);
  }

  position (position, dimensionFermee, dimensionOuverte) {
    return position + dimensionFermee / 2 - dimensionOuverte / 2;
  }

  affiche (contenant) {
    this.calque.classList.remove('invisible');
    this.element.classList.remove('invisible');
    this.element.style.top = this.position(contenant.posY, contenant.hauteur, this.dimensions.hauteur) + '%';
    this.element.style.left = this.position(contenant.posX, contenant.largeur, this.dimensions.largeur) + '%';
    this.element.style.height = this.dimensions.hauteur + '%';
    this.element.style.width = this.dimensions.largeur + '%';
    setTimeout(() => {
      this.element.classList.replace('fermer', 'ouvrir');
    }, 50);
  }
}

export { DELAY_FERMETURE_CONTENANT_MILLISEC, VueContenu };
