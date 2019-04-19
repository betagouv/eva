import VueContenant from './contenant';
import EvenementOuvertureContenant from 'inventaire/modeles/evenement_ouverture_contenant';

export default class VueContenants {
  constructor (pointInsertion, journal) {
    this.journal = journal;
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('preserveAspectRatio', 'none');
    this.svg.setAttribute('viewBox', '0 0 100 100');
    this.svg.classList.add('contenants');
    pointInsertion.appendChild(this.svg);
  }

  afficheLesContenants (contenants, vueContenu) {
    contenants.forEach((contenant) => {
      const vueContenant = new VueContenant(this.svg, contenant);
      vueContenant.affiche((event) => {
        vueContenu.affiche(contenant);
        this.journal.enregistre(new EvenementOuvertureContenant({ contenant: contenant.id }));
      });
    });
  }
}
