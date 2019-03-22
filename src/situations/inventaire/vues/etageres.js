import { VueContenants } from './contenants.js';
import { VueContenu } from './contenu.js';
import imageEtageres from 'inventaire/assets/etageres.png';

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
    etageres.classList.add('image-fond');
    this.element.appendChild(etageres);

    const vueContenants = new VueContenants(this.element, this.journal);
    const vueContenu = new VueContenu(this.element);
    vueContenants.afficheLesContenants(contenants, vueContenu);

    const redimensionne = () => {
      vueContenants.redimensionne(etageres.width, etageres.height);
    };

    window.addEventListener('resize', redimensionne);
    etageres.addEventListener('load', () => {
      setTimeout(redimensionne, 10);
    });
  }
}
