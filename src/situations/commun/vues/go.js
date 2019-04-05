import { DEMARRE } from 'commun/modeles/situation';
import VueActionOverlay from 'commun/vues/action_overlay';

import go from 'commun/assets/go.svg';
import { traduction } from 'commun/infra/internationalisation';

export default class VueeGo extends VueActionOverlay {
  constructor (situation) {
    super(go, traduction('situation.go'), 'bouton-go');
    this.situation = situation;
  }

  click () {
    this.situation.modifieEtat(DEMARRE);
  }
}
