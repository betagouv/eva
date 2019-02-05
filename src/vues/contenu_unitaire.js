import { VueContenu } from './contenu.js';

export class VueContenuUnitaire extends VueContenu {
  constructor (pointInsertion) {
    super(pointInsertion, 'contenu-unitaire', { hauteur: 21.5, largeur: 16.5 });
    this.element.classList.add('caisse');
    this.bouteilles = new Map();
    this.bouteilles.set('Premium Terra', require('../images/premterra.png'));
    this.bouteilles.set('Nova Sky', require('../images/novasky.png'));
    this.bouteilles.set("Gink'cola", require('../images/ginkcola.png'));
    this.bouteilles.set("Lem'cola", require('../images/lemcola.png'));
    this.bouteilles.set('Terra Cola', require('../images/terracola.png'));
    this.bouteilles.set("O'cola", require('../images/ocola.png'));

    this.caisses = new Map();
    this.caisses.set('marron', '../images/carton.png');
    this.caisses.set('bleu', '../images/boite_bleue.png');
    this.caisses.set('jaune', '../images/boite_jaune.png');
    this.caisses.set('gris', '../images/boite_grise.png');
    this.caisses.set('rouge', '../images/boite_rouge.png');
    this.caisses.set('vert', '../images/boite_verte.png');
  }

  affiche (contenant) {
    super.affiche(contenant);
    this.element.style.backgroundImage = `url(${this.caisses.get(contenant.couleur)})`;

    this.elementInterieur.innerHTML = '';
    for (let i = 0; i < contenant.quantite; i++) {
      let bouteille = document.createElement('img');
      bouteille.classList.add('bouteille');
      bouteille.src = this.bouteilles.get(contenant.nom);
      this.elementInterieur.appendChild(bouteille);
    }
  }
}
