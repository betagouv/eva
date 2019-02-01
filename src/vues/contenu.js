import '../styles/commun.scss';
import '../styles/contenu.scss';

export class VueContenu {
  constructor (pointInsertion, id = 'contenu') {
    this.calque = document.createElement('div');
    this.calque.id = id;
    pointInsertion.appendChild(this.calque);
    this.calque.classList.add('calque');
    this.calque.classList.add('invisible');
    this.calque.addEventListener('click', (event) => {
      this.unzoom();
      setTimeout(() => {
        this.calque.classList.add('invisible');
      }, 100);
      event.stopPropagation();
    });
    this.element = document.createElement('div');
    this.calque.appendChild(this.element);

    this.elementInterieur = document.createElement('div');
    this.elementInterieur.classList.add('interieur', 'invisible');
    this.element.appendChild(this.elementInterieur);
  }

  getDimensions () {
    return { height: '33%', width: '33%' };
  }

  affiche (contenant) {
    this.calque.classList.remove('invisible');
    let sourceX = contenant.posX + '%';
    let sourceY = contenant.posY + '%';
    let destinationX = contenant.posX + '%';
    let destinationY = Math.min(contenant.posY, 65) + '%';
    let dimensions = this.getDimensions();
    this.element.animate([
      { top: sourceY, left: sourceX, height: '1px', width: '1px' },
      { top: destinationY,
        left: destinationX,
        height: dimensions.height,
        width: dimensions.width }
    ], {
      duration: 200,
      fill: 'forwards'
    });
    setTimeout(() => { this.elementInterieur.classList.remove('invisible'); }, 200);

    this.unzoom = () => {
      this.elementInterieur.classList.add('invisible');
      this.element.animate([
        { top: destinationY,
          left: destinationX,
          height: dimensions.height,
          width: dimensions.width },
        { top: sourceY, left: sourceX, height: '1px', width: '1px' }
      ], {
        duration: 200,
        fill: 'forwards'
      });
    };
  }
}
