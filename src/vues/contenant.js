export class VueContenant {
  constructor (pointInsertion, contenant) {
    this.pointInsertion = pointInsertion;
    this.contenant = contenant;
  }

  affiche (cbOuvrirContenant) {
    let element = document.createElement('div');
    element.classList.add('contenant');

    element.style.left = this.contenant.posX + '%';
    element.style.top = this.contenant.posY + '%';
    element.style.width = this.contenant.largeur + '%';
    element.style.height = this.contenant.hauteur + '%';

    element.addEventListener('click', cbOuvrirContenant);

    this.pointInsertion.appendChild(element);
  }
}
