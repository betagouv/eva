import { VueContenant } from './contenant.js';
import topologie from '../data/topologieContenants.json';

export class VueContenants {
  constructor (pointInsertion, imageEtageres, journal) {
    this.journal = journal;
    this.imageEtageres = imageEtageres;
    this.element = document.createElement('div');
    this.element.classList.add('contenants');
    this.element.id = 'contenants';
    pointInsertion.appendChild(this.element);

    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  resize () {
    this.element.style.width = this.imageEtageres.width + 'px';
    this.element.style.height = this.imageEtageres.height + 'px';
  }

  afficheLesContenants (contenants, vueContenu) {
    this.resize();
    contenants.forEach((contenant) => {
      const vueContenant = new VueContenant(topologie, this.element, contenant);
      vueContenant.affiche((event) => {
        vueContenu.affiche(contenant);
        this.journal.enregistreOuvertureContenant(contenant);
      });
    });
  }
}
