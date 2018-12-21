import { VueContenants } from './contenants.js';
import { VueContenu } from './contenu.js';
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

    const vueContenu = new VueContenu(this.element);
    const vueContenants = new VueContenants(this.element, etageres, this.journal);

    const callback = function () {
      vueContenants.afficheLesContenants(contenants, vueContenu);
    };
    etageres.addEventListener('load', callback);
  }
}
