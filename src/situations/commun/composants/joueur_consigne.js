import JoueurAudioBuffer from 'commun/composants/joueur_audio_buffer';

export default class JoueurConsigne extends JoueurAudioBuffer {
  constructor (depot, ressourceConsigne) {
    super();
    this.depot = depot;
    console.log('ressourceConsigne', ressourceConsigne);
    this.ressourceConsigne = ressourceConsigne;
  }

  joue (callbackFin = () => {}) {
    this.start(this.depot[this.ressourceConsigne](), callbackFin);
  }
}
