import { CONSIGNE_ECOUTEE } from 'commun/modeles/situation';
import VueActionOverlay from './action_overlay';
import lectureEnCours from 'commun/assets/lecture-en-cours.svg';

export default class VueConsigne extends VueActionOverlay {
  constructor (situation) {
    super(lectureEnCours, '', 'bouton-lecture-en-cours');
    this.situation = situation;
    this.audio = document.createElement('audio');
    this.audio.type = 'audio/mp3';
    this.audio.preload = 'none';
    this.audio.src = situation.consigneAudio;
  }

  affiche (pointInsertion, $) {
    super.affiche(pointInsertion, $);
    this.$overlay.append(this.audio);
    $(this.audio).on('ended', this.lectureTermine.bind(this));
    return Promise.resolve(this.audio.play())
      .catch(e => {
        this.lectureTermine();
      });
  }

  lectureTermine () {
    this.situation.modifieEtat(CONSIGNE_ECOUTEE);
  }
}
