export class VueContenant {
  constructor (topologie, elementContenants) {
    this.topologie = topologie;
    this.elementContenants = elementContenants;
  }

  affiche (contenant, cbOuvrirContenant) {
    const width = this.topologie.contenants[contenant.type][contenant.categorie].largeur;
    const height = this.topologie.contenants[contenant.type][contenant.categorie].hauteur;

    let element = document.createElement('div');
    element.classList.add('contenant');

    element.style.left = contenant.posX + '%';
    element.style.top = contenant.posY + '%';
    element.style.width = width + '%';
    element.style.height = height + '%';

    element.addEventListener('click', cbOuvrirContenant);

    this.elementContenants.appendChild(element);
  }
}
