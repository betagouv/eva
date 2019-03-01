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

    const calque = document.createElement('div');
    calque.classList.add('avant-plan');
    this.element.appendChild(calque);

    const vueContenants = new VueContenants(calque, this.journal);
    const vueContenu = new VueContenu(calque);
    vueContenants.afficheLesContenants(contenants, vueContenu);

    for (let classCss of ['barre-1', 'barre-2', 'barre-3']) {
      calque.appendChild(this.creerBarre(classCss));
    }

    const resize = () => {
      calque.style.width = etageres.width + 'px';
      calque.style.height = etageres.height + 'px';
    };

    window.addEventListener('resize', resize);
    etageres.addEventListener('load', () => {
      setTimeout(resize, 10);
    });
  }
}
