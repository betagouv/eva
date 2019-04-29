import { CONSIGNE_ECOUTEE } from 'commun/modeles/situation';
import VueActionOverlay from './action_overlay';
import lectureEnCours from 'commun/assets/lecture-en-cours.svg';

export default class VueConsigne extends VueActionOverlay {
  constructor (situation) {
    super(lectureEnCours, '', 'bouton-lecture-en-cours');
    this.situation = situation;
    this.consigne = situation.audios.consigne;
  }

  affiche (pointInsertion, $) {
    super.affiche(pointInsertion, $);
    return this.joueConsigne($);
  }

  lectureTermine () {
    this.situation.modifieEtat(CONSIGNE_ECOUTEE);
  }

  joueConsigne ($) {
    $(this.consigne).on('ended', this.lectureTermine.bind(this));
    return Promise.resolve(this.consigne.play())
      .catch(e => {
        this.lectureTermine();
      });
  }
}
