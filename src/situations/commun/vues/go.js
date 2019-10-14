import { ENTRAINEMENT_DEMARRE, DEMARRE } from 'commun/modeles/situation';
import VueActionOverlay from 'commun/vues/action_overlay';

import go from 'commun/assets/go.svg';
import { traduction } from 'commun/infra/internationalisation';

export default class VueGo extends VueActionOverlay {
  constructor (situation) {
    const message = situation.entrainementDisponible() ? 'situation.entrainement_go' : 'situation.go';
    super(go, traduction(message), 'bouton-go', 'bouton-centre-visible', 'hors-actions');

    this.situation = situation;
  }

  click () {
    const prochainEtat = this.situation.entrainementDisponible() ? ENTRAINEMENT_DEMARRE : DEMARRE;
    this.situation.modifieEtat(prochainEtat);
  }
}
