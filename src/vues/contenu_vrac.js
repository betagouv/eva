import pluralize from 'pluralize';
import { VueContenu } from './contenu.js';

export class VueContenuVrac extends VueContenu {
  constructor (pointInsertion) {
    super(pointInsertion, 'contenu-vrac', { hauteur: 12, largeur: 13 });
    this.element.classList.add('etiquette');
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
