export class VueContenant {
  constructor (topologie) {
    this.topologie = topologie;
  }

  init (pointInsertion) {
    let existingContenantList = document.getElementById('contenants');
    if (existingContenantList) {
      existingContenantList.remove();
    }

    this.contenantsElements = document.createElement('div');
    this.contenantsElements.id = 'contenants';

    pointInsertion.appendChild(this.contenantsElements);
  }

  afficheUnContenant (contenant, dimentionsEtageres, cbOuvrirContenant) {
    const left = contenant.posX / 100.0 * dimentionsEtageres.width;
    const top = contenant.posY / 100.0 * dimentionsEtageres.height;
    const width = this.topologie.contenants[contenant.type][contenant.categorie].largeur / 100 * dimentionsEtageres.width;
    const height = this.topologie.contenants[contenant.type][contenant.categorie].hauteur / 100 * dimentionsEtageres.height;

    let element = document.createElement('div');
    element.classList.add('contenant');

    element.style.left = left + 'px';
    element.style.top = top + 'px';
    element.style.height = height + 'px';
    element.style.width = width + 'px';

    element.addEventListener('click', cbOuvrirContenant);

    this.contenantsElements.appendChild(element);
  }
}
