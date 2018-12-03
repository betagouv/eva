/* global alert */

class VueContenant {
  constructor (topologie) {
    this.topologie = topologie;
  }

  createElement (contenant, dimentionsEtageres) {
    const vue = this;

    const left = contenant.posX / 100.0 * dimentionsEtageres.width;
    const top = contenant.posY / 100.0 * dimentionsEtageres.height;
    const width = this.topologie.contenants[contenant.type][contenant.sousType].largeur / 100 * dimentionsEtageres.width;
    const height = this.topologie.contenants[contenant.type][contenant.sousType].hauteur / 100 * dimentionsEtageres.height;

    let contenantElement = document.createElement('div');
    contenantElement.classList.add('contenant');

    contenantElement.style.left = left + 'px';
    contenantElement.style.top = top + 'px';
    contenantElement.style.height = height + 'px';
    contenantElement.style.width = width + 'px';
    contenantElement.addEventListener('click', function () {
      vue.ouvreContenant(contenant);
    });
    return contenantElement;
  }

  ouvreContenant (contenant) {
    alert('Contient ' + contenant.quantite + ' ' + (contenant.type === 'ContenantVrac' ? 'litres' : 'bouteilles') + ' ' + 'de ' + contenant.nom);
  }
}

export function uneVueContenant (topologie) {
  return new VueContenant(topologie);
}
