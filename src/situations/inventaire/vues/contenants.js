import { VueContenant } from './contenant.js';

export class VueContenants {
  constructor (pointInsertion, journal) {
    this.journal = journal;
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('preserveAspectRatio', 'none');
    this.svg.setAttribute('viewBox', '0 0 100 100');
    this.svg.style.width = '100%';
    this.svg.style.height = '100%';
    pointInsertion.appendChild(this.svg);
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
