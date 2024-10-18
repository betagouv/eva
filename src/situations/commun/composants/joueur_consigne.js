import JoueurAudioBuffer from 'commun/composants/joueur_audio_buffer';

export default class JoueurConsigne extends JoueurAudioBuffer {
  constructor (depot, ressourceConsigne) {
    super();
    this.depot = depot;
    this.ressourceConsigne = ressourceConsigne;
  }

  joue (lectureTerminee) {
    const nomTechnique = this.depot['questionEnCours'];
    this.start(this.depot[this.ressourceConsigne](nomTechnique), lectureTerminee);
  }
}
