import { CONSIGNE_ECOUTEE } from 'commun/modeles/situation';
import _JoueurConsigne from 'commun/composants/joueur_consigne';
import VueActionOverlay from './action_overlay';

import lectureEnCours from 'commun/assets/lecture-en-cours.svg';

export default class VueConsigne extends VueActionOverlay {
  constructor (situation, depot, JoueurConsigne = _JoueurConsigne) {
    super(lectureEnCours, '', 'bouton-lecture-en-cours', 'bouton-centre-visible');
    this.situation = situation;
    this.joueurConsigne = new JoueurConsigne(depot);
  }

  affiche (pointInsertion, $) {
    super.affiche(pointInsertion, $);
    this.joueurConsigne.joue(true, this.lectureTerminee.bind(this));
  }

  lectureTerminee () {
    this.situation.modifieEtat(CONSIGNE_ECOUTEE);
  }
}
