import { VueContenants } from './contenants';
import { VueContenu } from './contenu';
import imageEtageres from 'inventaire/assets/etageres.png';

export class VueEtageres {
  constructor (pointInsertion, journal) {
    this.journal = journal;
    this.element = document.createElement('div');
    this.element.id = 'etageres';
    this.element.classList.add('etageres');
    document.querySelector(pointInsertion).appendChild(this.element);
    document.querySelector(pointInsertion).classList.add('magasin');
  }

  affiche (contenants) {
    const etageres = document.createElement('img');
    etageres.id = 'imageEtageres';
    etageres.src = imageEtageres;
    etageres.classList.add('image-fond');
    this.element.appendChild(etageres);

    const avantPlan = document.createElement('div');
    avantPlan.classList.add('avant-plan');
    this.element.appendChild(avantPlan);

    const vueContenants = new VueContenants(avantPlan, this.journal);
    const vueContenu = new VueContenu(avantPlan);
    vueContenants.afficheLesContenants(contenants, vueContenu);

    const redimensionne = () => {
      avantPlan.style.width = etageres.width + 'px';
      avantPlan.style.height = etageres.height + 'px';
    };

    window.addEventListener('resize', redimensionne);
    etageres.addEventListener('load', () => {
      setTimeout(redimensionne, 10);
    });
  }
}
