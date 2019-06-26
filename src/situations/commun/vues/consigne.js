import { CONSIGNE_ECOUTEE } from 'commun/modeles/situation';
import joueConsigne from 'commun/composants/joueur_consigne';
import VueActionOverlay from './action_overlay';

import lectureEnCours from 'commun/assets/lecture-en-cours.svg';

export default class VueConsigne extends VueActionOverlay {
  constructor (situation, depot) {
    super(lectureEnCours, '', 'bouton-lecture-en-cours', 'bouton-centre-visible');
    this.situation = situation;
    this.depot = depot;
  }

  affiche (pointInsertion, $) {
    super.affiche(pointInsertion, $);
    joueConsigne($, this.depot, true, () => this.lectureTerminee());
  }

  lectureTerminee () {
    this.situation.modifieEtat(CONSIGNE_ECOUTEE);
  }
}
