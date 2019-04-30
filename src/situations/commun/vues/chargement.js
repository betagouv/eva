import { ERREUR_CHARGEMENT, ATTENTE_DEMARRAGE } from 'commun/modeles/situation';
import VueActionOverlay from 'commun/vues/action_overlay';

import chargement from 'commun/assets/chargement.svg';
import { traduction } from 'commun/infra/internationalisation';

export default class VueChargement extends VueActionOverlay {
  constructor (situation, chargeurRessources) {
    super(chargement, traduction('situation.chargement'), 'bouton-chargement');
    this.situation = situation;
    this.chargeurRessources = chargeurRessources;
  }

  affiche (pointInsertion, $) {
    super.affiche(pointInsertion, $);
    this.$overlay.addClass('opaque');
    this.$overlay.children().css('background', 'transparent');

    return this.chargeurRessources.chargement().then(() => {
      this.situation.modifieEtat(ATTENTE_DEMARRAGE);
    }).catch(() => {
      this.situation.modifieEtat(ERREUR_CHARGEMENT);
    });
  }
}
