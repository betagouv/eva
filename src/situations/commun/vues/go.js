import { ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE } from 'commun/modeles/situation';
import VueActionOverlay from 'commun/vues/action_overlay';

import go from 'commun/assets/go.svg';
import { traduction } from 'commun/infra/internationalisation';

function messageVueGo (situation) {
  if (situation.etat() === ENTRAINEMENT_FINI) {
    return 'situation.entrainement_fini';
  }
  return situation.entrainementDisponible() ? 'situation.entrainement_go' : 'situation.go';
}

export default class VueGo extends VueActionOverlay {
  constructor (situation) {
    const message = messageVueGo(situation);
    super(go, traduction(message), 'bouton-go', 'bouton-centre-visible', 'hors-actions');

    this.situation = situation;
  }

  click () {
    this.situation.modifieEtat(this.prochainEtat());
  }

  prochainEtat () {
    if (this.situation.etat() === ENTRAINEMENT_FINI ||
        !this.situation.entrainementDisponible()) {
      return DEMARRE;
    }
    return ENTRAINEMENT_DEMARRE;
  }
}
