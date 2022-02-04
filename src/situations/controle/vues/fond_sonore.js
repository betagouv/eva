import 'controle/styles/tapis.scss';

import { DEMARRE, CHANGEMENT_ETAT, FINI } from 'commun/modeles/situation';

export default class VueFondSonore {
  constructor (situation, depotRessources) {
    this.situation = situation;
    this.depotRessources = depotRessources;
    this.audio = depotRessources.fondSonore();
    this.audio.loop = true;

    this.actionsEtats = new Map();
    this.actionsEtats.set(DEMARRE, this.demarre.bind(this));
    this.actionsEtats.set(FINI, this.arrete.bind(this));
  }

  affiche () {
    this.changeEtat();
    this.situation.on(CHANGEMENT_ETAT, () => {
      this.changeEtat();
    });
  }

  changeEtat () {
    if (this.actionsEtats.get(this.situation.etat())) {
      this.actionsEtats.get(this.situation.etat())();
    }
  }

  demarre () {
    this.audio.start();
  }

  arrete () {
    this.audio.stop();
  }
}
