export default class VueContenant {
  constructor (pointInsertion, contenant) {
    this.pointInsertion = pointInsertion;
    this.contenant = contenant;
  }

  affiche (cbOuvrirContenant) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    element.setAttribute('d',
      `M   ${this.contenant.posX}   ${this.contenant.posY}
           v  -${this.contenant.hauteur}
           l  ${this.contenant.profondeurX}  -${this.contenant.profondeurY / 2}
           h  ${this.contenant.largeur}
           v  ${this.contenant.hauteur}
           l  -${this.contenant.profondeurX}  ${this.contenant.profondeurY / 2}
           h  -${this.contenant.largeur}
           Z`);
    element.setAttribute('fill-opacity', '0');
    element.classList.add('contenant');

    element.addEventListener('click', cbOuvrirContenant);

    this.pointInsertion.appendChild(element);
  }
}
