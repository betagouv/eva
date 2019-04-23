import VueActionOverlay from 'commun/vues/action_overlay';

import go from 'commun/assets/lecture-en-cours.svg';
import { traduction } from 'commun/infra/internationalisation';

export default class VueErreurChargement extends VueActionOverlay {
  constructor () {
    super(go, traduction('situation.erreur_chargement'), 'bouton-chargement');
  }

  affiche (pointInsertion, $) {
    super.affiche(pointInsertion, $);
    this.$overlay.addClass('opaque');
  }

  click () {
    window.location.reload();
  }
}
