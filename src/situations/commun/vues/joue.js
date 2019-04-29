import { LECTURE_CONSIGNE, CONSIGNE_ECOUTEE } from 'commun/modeles/situation';
import VueActionOverlay from 'commun/vues/action_overlay';

import play from 'commun/assets/play.svg';
import { traduction } from 'commun/infra/internationalisation';

export default class VueJoue extends VueActionOverlay {
  constructor (situation) {
    super(play, traduction('situation.ecouter-consigne'), 'bouton-lire-consigne');
    this.situation = situation;
  }

  affiche (pointInsertion, $) {
    super.affiche(pointInsertion, $);
    this.passeLaConsigneSiAppuiToucheS();
  }

  click () {
    this.situation.modifieEtat(LECTURE_CONSIGNE);
  }

  passeLaConsigneSiAppuiToucheS () {
    this.$overlay.attr('tabindex', 0);
    this.$overlay.keydown((event) => {
      if (event.which === 'S'.charCodeAt()) {
        this.situation.modifieEtat(CONSIGNE_ECOUTEE);
      }
    });
    this.$overlay.focus();
  }
}
