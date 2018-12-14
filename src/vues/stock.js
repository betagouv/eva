import { VueContenant } from './contenant.js';
import { VueContenu } from './contenu.js';
const imageEtageres = require('../images/stock.png');

export class VueStock {
  constructor (topologie) {
    this.topologie = topologie;
  }

  init (pointInsertion) {
    this.stock = document.createElement('div');
    this.stock.id = 'stock';
    this.stock.classList.add('stock');
    document.querySelector(pointInsertion).appendChild(this.stock);
    return this;
  }

  creerElementContenants (dimensionsEtageres) {
    let elementContenants = document.createElement('div');
    elementContenants.classList.add('contenants');
    elementContenants.id = 'contenants';
    this.stock.appendChild(elementContenants);

    const resizeContenants = function () {
      elementContenants.style.width = dimensionsEtageres.width + 'px';
      elementContenants.style.height = dimensionsEtageres.height + 'px';
    };

    resizeContenants();
    window.addEventListener('resize', resizeContenants);

    return elementContenants;
  }

  affiche (contenants) {
    const vue = this;

    const etageres = document.createElement('img');
    etageres.id = 'etageres';
    etageres.src = imageEtageres;
    this.stock.appendChild(etageres);

    const vueContenu = new VueContenu();
    vueContenu.init(this.stock);

    const callback = function () {
      const elementContenants = vue.creerElementContenants(etageres);
      vue.afficheLesContenants(contenants, elementContenants, vueContenu);
    };
    etageres.addEventListener('load', callback);
  }

  afficheLesContenants (contenants, elementContenants, vueContenu) {
    const vueContenant = new VueContenant(this.topologie, elementContenants);
    contenants.forEach(function (contenant) {
      vueContenant.affiche(contenant, function (event) {
        vueContenu.affiche(contenant);
        event.stopPropagation();
      });
    });
  }
}
