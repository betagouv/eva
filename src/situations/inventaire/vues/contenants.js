import { VueContenant } from './contenant.js';

export class VueContenants {
  constructor (pointInsertion, imageEtageres, journal) {
    this.journal = journal;
    this.imageEtageres = imageEtageres;
    this.element = document.createElement('div');
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('preserveAspectRatio', 'none');
    this.svg.setAttribute('viewBox', '0 0 100 100');
    this.element.classList.add('contenants');
    this.element.id = 'contenants';
    pointInsertion.appendChild(this.element);
    this.element.appendChild(this.svg);

    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  resize () {
    this.svg.setAttribute('width', this.imageEtageres.width + 'px');
    this.svg.setAttribute('height', this.imageEtageres.height + 'px');
  }

  afficheLesContenants (contenants, vueContenu) {
    contenants.forEach((contenant) => {
      const vueContenant = new VueContenant(this.svg, contenant);
      vueContenant.affiche((event) => {
        vueContenu.affiche(contenant);
        this.journal.enregistreOuvertureContenant({ contenant: contenant.id });
      });
    });
  }
}
