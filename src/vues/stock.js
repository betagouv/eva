import { VueContenant } from './contenant.js';
import { VueContenu } from './contenu.js';
const imageEtageres = require('../images/stock.png');

class VueStock {
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

  affiche (contenants) {
    const vue = this;

    const etageres = document.createElement('img');
    etageres.id = 'etageres';
    etageres.src = imageEtageres;
    this.stock.appendChild(etageres);

    const vueContenu = new VueContenu();

    const callback = function () {
      vueContenu.init(vue.stock.id);
      vue.afficheLesContenants(contenants, etageres, vueContenu);
    };
    etageres.addEventListener('load', callback);
    window.addEventListener('resize', callback);
  }

  afficheLesContenants (contenants, etageres, vueContenu) {
    const vueContenant = new VueContenant(this.topologie);
    vueContenant.init(this.stock);
    contenants.forEach(function (contenant) {
      vueContenant.afficheUnContenant(contenant, etageres,
        function (event) {
          vueContenu.affiche(contenant);
          event.stopPropagation();
        });
    });
  }
}

export function uneVueStock (topologie) {
  return new VueStock(topologie);
}
