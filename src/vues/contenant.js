export class VueContenant {
  constructor (topologie, pointInsertion, contenant) {
    this.topologie = topologie;
    this.pointInsertion = pointInsertion;
    this.contenant = contenant;
  }

  affiche (cbOuvrirContenant) {
    const type = this.contenant.type;
    const categorie = this.contenant.categorie;
    const width = this.topologie.contenants[type][categorie].largeur;
    const height = this.topologie.contenants[type][categorie].hauteur;

    let element = document.createElement('div');
    element.classList.add('contenant');

    element.style.left = this.contenant.posX + '%';
    element.style.top = this.contenant.posY + '%';
    element.style.width = width + '%';
    element.style.height = height + '%';

    element.addEventListener('click', cbOuvrirContenant);

    this.pointInsertion.appendChild(element);
  }
}
