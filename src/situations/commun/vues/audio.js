
export default class VueAudio {
  constructor (son) {
    this.son = son;
  }

  affiche (pointInsertion) {
    this.element = document.createElement('audio');
    this.element.type = 'audio/mp3';
    this.element.preload = 'none';
    this.element.src = this.son;
    document.querySelector(pointInsertion).appendChild(this.element);

    this.element.id = 'consigne';
    this.element.addEventListener('ended', () => {
      this.actionFinConsigne();
    });
  }

  joue (actionFinConsigne = () => {}, logErreur = (erreur) => {
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
