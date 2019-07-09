import { EVENEMENT_REPONSE as EVENEMENT_REPONSE_SITUATION } from 'questions/modeles/situation';
import EvenementReponseEnvoyee from 'questions/modeles/evenement_reponse_envoyee';
import { EVENEMENT_REPONSE as EVENEMENT_REPONSE_VUE } from './question';
import VueLitteratie from './litteratie';
import VueNumeratie from './numeratie';

export default class VueSituation {
  constructor (situation, journal, depotRessources) {
    this.situation = situation;
    this.depotRessources = depotRessources;
    this.classesQuestions = {
      litteratie: VueLitteratie,
      numeratie: VueNumeratie
    };

    this.situation.on(EVENEMENT_REPONSE_SITUATION, (question, reponse) => {
      const evenement = new EvenementReponseEnvoyee({ reponse });
      journal.enregistre(evenement);
      this.afficheQuestion();
    });
  }

  affiche (pointInsertion, $) {
    this.$vue = $(`<div class="scene-compte-rendu"></div>`);
    this.$ = $;
    this.afficheQuestion();
    $(pointInsertion).append(this.$vue);
  }

  afficheQuestion () {
    if (!this.situation.question()) {
      return;
    }
    if (this.question) {
      this.question.supprime();
    }
    this.question = new this.classesQuestions[this.situation.question()](this.depotRessources);
    this.question.affiche(this.$vue, this.$);
    this.question.on(EVENEMENT_REPONSE_VUE, (reponse) => {
      this.situation.repond(reponse);
    });
  }
}
