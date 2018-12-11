import pluralize from 'pluralize';
import { VueContenu } from './contenu.js';

export class VueContenuUnitaire extends VueContenu {
  constructor (pointInsertion) {
    super(pointInsertion, 'contenu-unitaire');
  }

  affiche (contenant) {
    super.affiche(contenant);
    this.element.innerHTML = `
      <div class="caisse">
        <label class="type" id="nom">${contenant.nom}</label>
        <div class="quantite">
          <label id="quantite">${contenant.quantite}</label>
          <label id="unite">${pluralize('litre', contenant.quantite)}</label>
        </div>
      </div>
    `;
  }
}
