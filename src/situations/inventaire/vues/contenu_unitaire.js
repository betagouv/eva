import { VueContenu } from './contenu.js';

export class VueContenuUnitaire extends VueContenu {
  constructor (pointInsertion) {
    super(pointInsertion, 'contenu-unitaire', { hauteur: 21.5, largeur: 16.5 });
    this.element.classList.add('caisse');
  }

  affiche (contenant) {
    super.affiche(contenant);
    this.element.classList.remove('marron', 'bleu', 'jaune', 'gris', 'rouge', 'vert');
    this.element.classList.add(contenant.couleur);

    this.elementInterieur.innerHTML = '';
    for (let i = 0; i < contenant.quantite; i++) {
      let bouteille = document.createElement('img');
      bouteille.classList.add('bouteille');
      bouteille.src = contenant.imageProduit();
      this.elementInterieur.appendChild(bouteille);
    }
  }
}
