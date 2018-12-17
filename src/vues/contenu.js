import pluralize from 'pluralize';
import '../styles/contenu.scss';

export class VueContenu {
  constructor (pointInsertion) {
    this.element = document.createElement('div');
    this.element.id = 'contenu';
    pointInsertion.appendChild(this.element);
    this.element.classList.add('contenu');
    this.element.classList.add('invisible');
    this.element.addEventListener('click', (event) => {
      this.element.classList.add('invisible');
      event.stopPropagation();
    });
  }

  affiche (contenant) {
    this.element.innerHTML = `
      <div class="etiquette">
        <label class="type" id="nom">${contenant.nom}</label>
        <div class="quantite">
          <label id="quantite">${contenant.quantite}</label>
          <label id="unite">${pluralize('litre', contenant.quantite)}</label>
        </div>
      </div>
    `;
    this.element.classList.remove('invisible');
  }
}
