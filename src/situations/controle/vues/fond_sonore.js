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

  affiche (pointInsertion) {
    this.changeEtat(pointInsertion);
    this.situation.on(CHANGEMENT_ETAT, () => {
      this.changeEtat(pointInsertion);
    });
  }

  changeEtat (pointInsertion) {
    if (this.actionsEtats.get(this.situation.etat())) {
      this.actionsEtats.get(this.situation.etat())();
    }
  }

  demarre () {
    this.audio.start();
    this.joueKlaxon(this.situation.delaiKlaxonSuivant());
  }

  joueKlaxon (delai) {
    clearTimeout(this.idTimeoutKlaxon);
    if (delai) {
      this.idTimeoutKlaxon = setTimeout(
        () => {
          this.depotRessources.klaxon().start();
          this.joueKlaxon(this.situation.delaiKlaxonSuivant());
        },
        delai
      );
    }
  }

  arrete () {
    this.audio.stop();
    clearTimeout(this.idTimeoutKlaxon);
  }
}
