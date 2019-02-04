import '../styles/commun.scss';
import '../styles/contenu.scss';

export class VueContenu {
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
      }, 200);
      event.stopPropagation();
    });
    this.element = document.createElement('div');
    this.element.classList.add('contenu', 'fermer');
    this.calque.appendChild(this.element);

    this.elementInterieur = document.createElement('div');
    this.elementInterieur.classList.add('interieur');
    this.element.appendChild(this.elementInterieur);
  }

  position (position, dimensionFermee, dimensionOuverte) {
    return position + dimensionFermee / 2 - dimensionOuverte / 2;
  }

  affiche (contenant) {
    this.calque.classList.remove('invisible');
    this.element.style.top = this.position(contenant.posY, contenant.hauteur, this.dimensions.hauteur) + '%';
    this.element.style.left = this.position(contenant.posX, contenant.largeur, this.dimensions.largeur) + '%';
    this.element.style.height = this.dimensions.hauteur + '%';
    this.element.style.width = this.dimensions.largeur + '%';
    setTimeout(() => {
      this.element.classList.replace('fermer', 'ouvrir');
    }, 50);
  }
}
