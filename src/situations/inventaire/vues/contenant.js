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
           c  ${this.contenant.largeur * 0.2} -${this.contenant.courbe}  ${this.contenant.largeur} -${this.contenant.courbe} ${this.contenant.largeur} 0
           v  ${this.contenant.hauteur}
           l  -${this.contenant.profondeurX}  ${this.contenant.profondeurY / 2}
           c  -${this.contenant.largeur * 0.2} ${this.contenant.courbe} -${this.contenant.largeur} ${this.contenant.courbe} -${this.contenant.largeur} 0
           Z`);
    element.setAttribute('fill-opacity', '0');
    element.classList.add('contenant');

    element.addEventListener('click', cbOuvrirContenant);

    this.pointInsertion.appendChild(element);
  }
}
