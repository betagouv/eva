import 'commun/styles/boutons.scss';
import 'compte_rendu/styles/situation.scss';

import { FINI } from 'commun/modeles/situation';
import EvenementReponseEnvoyee from 'compte_rendu/modeles/evenement_reponse_envoyee';
import VueLitteratie, { EVENEMENT_REPONSE } from './litteratie';

export default class VueSituation {
  constructor (situation, journal, depotRessources) {
    this.situation = situation;
    this.depotRessources = depotRessources;
    this.journal = journal;
  }

  affiche (pointInsertion, $) {
    const $vue = $(`<div class="scene-compte-rendu"></div>`);
    this.question = new VueLitteratie(this.depotRessources);
    this.question.affiche($vue, $);
    $(pointInsertion).append($vue);
    this.question.on(EVENEMENT_REPONSE, (reponse) => {
      const evenement = new EvenementReponseEnvoyee({ reponse });
      this.journal.enregistre(evenement)
        .finally(() => {
          this.situation.modifieEtat(FINI);
        });
    });
  }
}
