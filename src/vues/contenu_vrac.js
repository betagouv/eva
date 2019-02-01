import pluralize from 'pluralize';
import { VueContenu } from './contenu.js';

export class VueContenuVrac extends VueContenu {
  constructor (pointInsertion) {
    super(pointInsertion, 'contenu-vrac');
    this.element.classList.add('etiquette');
  }

  getDimensions () {
    return { height: '10rem', width: '15rem' };
  }

  affiche (contenant) {
    super.affiche(contenant);
    this.elementInterieur.innerHTML = `
      <label class="type" id="nom">${contenant.nom}</label>
      <div class="quantite">
        <label id="quantite">${contenant.quantite}</label>
        <label id="unite">${pluralize('litre', contenant.quantite)}</label>
      </div>
    `;
  }
}
