import { VueContenu } from './contenu.js';

export class VueContenuUnitaire extends VueContenu {
  constructor (pointInsertion) {
    super(pointInsertion, 'contenu-unitaire');
    this.bouteilles = new Map();
    this.bouteilles.set('Premium Terra', require('../images/premterra.png'));
    this.bouteilles.set('Nova Sky', require('../images/novasky.png'));
    this.bouteilles.set("Gink'cola", require('../images/ginkcola.png'));
    this.bouteilles.set("Lem'cola", require('../images/lemcola.png'));
    this.bouteilles.set('Terra Cola', require('../images/terracola.png'));
    this.bouteilles.set("O'cola", require('../images/ocola.png'));
    this.element.classList.add('caisse');
  }

  getDimensions () {
    return { height: '18rem', width: '20rem' };
  }

  affiche (contenant) {
    super.affiche(contenant);
    this.element.classList.remove(this.element.classList.item(1));
    this.element.classList.add(contenant.couleur);

    this.elementInterieur.innerHTML = '';
    for (let i = 0; i < contenant.quantite; i++) {
      let bouteille = document.createElement('img');
      bouteille.classList.add('bouteille');
      bouteille.src = this.bouteilles.get(contenant.nom);
      this.elementInterieur.appendChild(bouteille);
    }
  }
}
