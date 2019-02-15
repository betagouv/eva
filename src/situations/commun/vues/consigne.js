
export class VueConsigne {
  constructor (pointInsertion, sonConsigneDemarrage) {
    this.element = document.createElement('audio');
    this.element.src = sonConsigneDemarrage;
    document.querySelector(pointInsertion).appendChild(this.element);

    this.element.id = 'consigne';
    this.element.addEventListener('ended', () => {
      this.actionFinConsigne();
    });
  }

  jouerConsigneDemarrage (actionFinConsigne, logErreur = (erreur) => {
    console.error('Erreur à la lecture de la consigne : ' + erreur);
  }) {
    Promise.resolve(this.element.play())
      .then(() => {
        this.actionFinConsigne = actionFinConsigne;
      })
      .catch(e => {
        logErreur(e.message);
        actionFinConsigne();
      });
  }
}
