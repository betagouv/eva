import 'controle/styles/tapis.scss';

import { DEMARRE, CHANGEMENT_ETAT, FINI } from 'commun/modeles/situation';

export default class VueFondSonore {
  constructor (situation, depotRessources) {
    this.situation = situation;
    this.audio = depotRessources.fondSonore();
    this.audio.loop = true;
  }

  affiche (pointInsertion, $) {
    this.changeEtat(pointInsertion, $);
    this.situation.on(CHANGEMENT_ETAT, () => {
      this.changeEtat(pointInsertion, $);
    });
  }

  changeEtat (pointInsertion, $) {
    if (this.situation.etat() === DEMARRE) {
      this.audio.start();
    } else if (this.situation.etat() === FINI) {
      this.audio.stop();
    }
  }
}
