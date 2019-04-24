import { ERREUR_CHARGEMENT, ATTENTE_DEMARRAGE } from 'commun/modeles/situation';
import VueActionOverlay from 'commun/vues/action_overlay';

import go from 'commun/assets/lecture-en-cours.svg';
import { traduction } from 'commun/infra/internationalisation';

export default class VueChargement extends VueActionOverlay {
  constructor (situation, chargeurRessources) {
    super(go, traduction('situation.chargement'), 'bouton-chargement');
    this.situation = situation;
    this.chargeurRessources = chargeurRessources;
  }

  affiche (pointInsertion, $) {
    super.affiche(pointInsertion, $);
    this.$overlay.addClass('opaque');

    return this.chargeurRessources.chargement().then(() => {
      this.situation.modifieEtat(ATTENTE_DEMARRAGE);
    }).catch(() => {
      this.situation.modifieEtat(ERREUR_CHARGEMENT);
    });
  }
}
