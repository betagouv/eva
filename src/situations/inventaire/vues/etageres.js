import VueContenants from './contenants';
import VueContenu from './contenu';
import imageEtageres from 'inventaire/assets/etageres.png';

export default class VueEtageres {
  constructor (situation, journal) {
    this.journal = journal;
    this.situation = situation;
  }

  affiche (pointInsertion) {
    this.element = document.createElement('div');
    this.element.id = 'etageres';
    this.element.classList.add('etageres');

    document.querySelector(pointInsertion).appendChild(this.element);
    document.querySelector(pointInsertion).classList.add('magasin');

    const etageres = document.createElement('img');
    etageres.id = 'imageEtageres';
    etageres.src = imageEtageres;
    etageres.classList.add('image-fond');
    this.element.appendChild(etageres);

    const avantPlan = document.createElement('div');
    avantPlan.classList.add('avant-plan');
    this.element.appendChild(avantPlan);

    const vueContenants = new VueContenants(avantPlan, this.journal);
    const vueContenu = new VueContenu(this.situation, avantPlan, this.journal);
    vueContenants.afficheLesContenants(this.situation.contenants, vueContenu);

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
