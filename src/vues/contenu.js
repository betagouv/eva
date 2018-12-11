import '../styles/commun.scss';
import '../styles/contenu.scss';

export class VueContenu {
  constructor (pointInsertion, id = 'contenu') {
    this.element = document.createElement('div');
    this.element.id = id;
    pointInsertion.appendChild(this.element);
    this.element.classList.add('contenu');
    this.element.classList.add('invisible');
    this.element.addEventListener('click', (event) => {
      this.element.classList.add('invisible');
      event.stopPropagation();
    });
  }

  affiche (contenant) {
    this.element.classList.remove('invisible');
  }
}
