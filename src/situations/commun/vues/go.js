import { traduction } from 'commun/infra/internationalisation';

import 'commun/styles/go.scss';

export class VueGo {
  constructor (pointInsertion, vueConsigne, journal) {
    const elementPointInsertion = document.querySelector(pointInsertion);
    this.overlay = document.createElement('div');
    this.overlay.id = 'overlay-go';
    this.overlay.classList.add('invisible', 'overlay');
    this.overlay.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    elementPointInsertion.appendChild(this.overlay);

    this.boutonGo = document.createElement('button');
    this.boutonGo.id = 'go';
    this.boutonGo.textContent = traduction('situation.go');
    this.boutonGo.classList.add('invisible', 'bouton-centre', 'bouton-go');
    this.boutonGo.addEventListener('click', () => {
      this.overlay.classList.add('invisible');
      journal.enregistreDemarrage();
    });
    this.overlay.appendChild(this.boutonGo);

    this.boutonDemarrerConsigne = document.createElement('button');
    this.boutonDemarrerConsigne.id = 'demarrer-consigne';
    this.boutonDemarrerConsigne.classList.add('invisible', 'bouton-centre', 'bouton-lire-consigne-demarrage');
    this.boutonDemarrerConsigne.addEventListener('click', () => {
      this.boutonDemarrerConsigne.classList.add('invisible');
      vueConsigne.jouerConsigneDemarrage(() => {
        this.boutonGo.classList.remove('invisible');
      });
    });
    this.overlay.appendChild(this.boutonDemarrerConsigne);
  }

  afficher () {
    this.overlay.classList.remove('invisible');
    this.boutonDemarrerConsigne.classList.remove('invisible');
  }
}
