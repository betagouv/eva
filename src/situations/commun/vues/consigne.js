import { CONSIGNE_ECOUTEE } from 'commun/modeles/situation';
import _joueConsigne from 'commun/composants/joueur_consigne';
import VueActionOverlay from './action_overlay';

import lectureEnCours from 'commun/assets/lecture-en-cours.svg';

export default class VueConsigne extends VueActionOverlay {
  constructor (situation, depot, joueConsigne = _joueConsigne) {
    super(lectureEnCours, '', 'bouton-lecture-en-cours', 'bouton-centre-visible');
    this.situation = situation;
    this.depot = depot;
    this.joueConsigne = joueConsigne;
  }

  affiche (pointInsertion, $) {
    super.affiche(pointInsertion, $);
    this.joueConsigne(this.depot, true, () => this.lectureTerminee());
  }

  lectureTerminee () {
    this.situation.modifieEtat(CONSIGNE_ECOUTEE);
  }
}
