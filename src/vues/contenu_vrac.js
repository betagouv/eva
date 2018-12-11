import pluralize from 'pluralize';
import { VueContenu } from './contenu.js';

export class VueContenuVrac extends VueContenu {
  constructor (pointInsertion) {
    super(pointInsertion, 'contenu-vrac');
  }

  affiche (contenant) {
    super.affiche(contenant);
    this.element.innerHTML = `
      <div class="etiquette">
        <label class="type" id="nom">${contenant.nom}</label>
        <div class="quantite">
          <label id="quantite">${contenant.quantite}</label>
          <label id="unite">${pluralize('litre', contenant.quantite)}</label>
        </div>
      </div>
    `;
  }
}
