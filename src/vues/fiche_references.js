import '../styles/fiche_references.scss';
const imageFicheReferences = require('../images/fiche_references.png');

export class VueFicheReferences {
  constructor (pointInsertion) {
    this.pointInsertion = pointInsertion;
    this.element = document.createElement('img');
    this.element.src = imageFicheReferences;
    this.element.classList.add('fiche-references');
  }

  affiche () {
    document.querySelector(this.pointInsertion).appendChild(this.element);
  }
}
