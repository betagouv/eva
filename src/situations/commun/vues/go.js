import 'commun/styles/go.scss';
import go from 'commun/assets/go.svg';
import play from 'commun/assets/play.svg';

export class VueGo {
  constructor (vueConsigne, journal) {
    this.overlay = document.createElement('div');
    this.overlay.id = 'overlay-go';
    this.overlay.classList.add('overlay');
    this.overlay.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    this.boutonGo = document.createElement('div');
    this.boutonGo.id = 'go';
    const imageGo = document.createElement('img');
    imageGo.src = go;
    this.boutonGo.appendChild(imageGo);
    this.boutonGo.classList.add('invisible', 'bouton-centre', 'bouton-go');
    this.boutonGo.addEventListener('click', () => {
      this.overlay.classList.add('invisible');
      journal.enregistreDemarrage();
    });
    this.overlay.appendChild(this.boutonGo);

    this.boutonDemarrerConsigne = document.createElement('div');
    this.boutonDemarrerConsigne.id = 'demarrer-consigne';
    const imagePlay = document.createElement('img');
    imagePlay.src = play;
    this.boutonDemarrerConsigne.appendChild(imagePlay);
    this.boutonDemarrerConsigne.classList.add('bouton-centre', 'bouton-lire-consigne-demarrage');
    this.boutonDemarrerConsigne.addEventListener('click', () => {
      this.boutonDemarrerConsigne.classList.add('invisible');
      vueConsigne.jouerConsigneDemarrage(() => {
        this.boutonGo.classList.remove('invisible');
      });
    });
    this.overlay.appendChild(this.boutonDemarrerConsigne);
  }

  affiche (pointInsertion) {
    document.querySelector(pointInsertion).appendChild(this.overlay);
  }
}
