import { uneVueContenant } from './contenant.js';
const imageEtageres = require('../images/stock.png');

class VueStock {
  constructor (topologie) {
    this.topologie = topologie;
  }

  affiche (idMagasin, contenants) {
    const vue = this;

    const magasin = document.getElementById(idMagasin);

    const etageres = document.createElement('img');
    etageres.id = 'etageres';
    etageres.src = imageEtageres;
    magasin.appendChild(etageres);

    const callback = function () {
      vue.afficheLesContenants(idMagasin, contenants, etageres);
    };
    etageres.addEventListener('load', callback);
    window.addEventListener('resize', callback);
  }

  afficheLesContenants (idMagasin, contenants, etageres) {
    let existingContenantList = document.getElementById('contenants');
    if (existingContenantList) {
      existingContenantList.remove();
    }

    const contenantsElements = document.createElement('div');
    contenantsElements.id = 'contenants';

    const magasin = document.getElementById(idMagasin);
    magasin.appendChild(contenantsElements);

    const vueContenant = uneVueContenant(this.topologie);
    contenants.forEach(function (contenant) {
      let element = vueContenant.createElement(contenant, etageres);
      contenantsElements.appendChild(element);
    });
  }
}

export function uneVueStock (topologie) {
  return new VueStock(topologie);
}
