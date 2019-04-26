import VueActionOverlay from 'commun/vues/action_overlay';

import recharge from 'commun/assets/recharge.svg';
import { traduction } from 'commun/infra/internationalisation';

export default class VueErreurChargement extends VueActionOverlay {
  constructor () {
    super(recharge, traduction('situation.erreur_chargement'), 'bouton-erreur-chargement');
  }

  affiche (pointInsertion, $) {
    super.affiche(pointInsertion, $);
    this.$overlay.addClass('opaque');
  }

  click () {
    window.location.reload();
  }
}
