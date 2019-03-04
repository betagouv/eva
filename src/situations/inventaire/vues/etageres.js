import { VueContenants } from './contenants.js';
import { VueContenu } from './contenu.js';
import imageEtageres from 'inventaire/assets/etageres.png';
import imageBarreDevant from 'inventaire/assets/barreDevant.png';

export class VueEtageres {
  constructor (pointInsertion, journal) {
    this.journal = journal;
    this.element = document.createElement('div');
    this.element.id = 'etageres';
    this.element.classList.add('etageres');
    document.querySelector(pointInsertion).appendChild(this.element);
  }

  creerBarre (classCss) {
    const barresDevants = document.createElement('img');
    barresDevants.src = imageBarreDevant;
    barresDevants.classList.add('barres', classCss);
    return barresDevants;
  }

  affiche (contenants) {
    const etageres = document.createElement('img');
    etageres.id = 'imageEtageres';
    etageres.src = imageEtageres;
    this.element.appendChild(etageres);

    const vueContenants = new VueContenants(this.element, etageres, this.journal);
    const vueContenu = new VueContenu(vueContenants.element);
    vueContenants.afficheLesContenants(contenants, vueContenu);

    for (let classCss of ['barre-1', 'barre-2', 'barre-3']) {
      vueContenants.element.appendChild(this.creerBarre(classCss));
    }

    etageres.addEventListener('load', () => {
      setTimeout(() => {
        vueContenants.resize();
      }, 10);
    });
  }
}
