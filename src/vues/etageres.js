import { VueContenants } from './contenants.js';
import { FabriqueVuesContenus } from './fabrique_vues_contenus.js';
const imageEtageres = require('../images/etageres.png');

export class VueEtageres {
  constructor (pointInsertion, journal) {
    this.journal = journal;
    this.element = document.createElement('div');
    this.element.id = 'etageres';
    this.element.classList.add('etageres');
    document.querySelector(pointInsertion).appendChild(this.element);
  }

  affiche (contenants) {
    const etageres = document.createElement('img');
    etageres.id = 'imageEtageres';
    etageres.src = imageEtageres;
    this.element.appendChild(etageres);

    const vueContenants = new VueContenants(this.element, etageres, this.journal);
    const vuesContenus = new FabriqueVuesContenus(vueContenants.element);

    const callback = function () {
      vueContenants.afficheLesContenants(contenants, vuesContenus);
    };
    etageres.addEventListener('load', callback);
  }
}
