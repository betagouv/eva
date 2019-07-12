import { EVENEMENT_REPONSE as EVENEMENT_REPONSE_SITUATION } from 'questions/modeles/situation';
import EvenementReponse from 'questions/modeles/evenement_reponse';
import { EVENEMENT_REPONSE as EVENEMENT_REPONSE_VUE } from './question';
import VueLitteratie from './litteratie';
import VueNumeratie from './numeratie';
const donneesNumeratie = require('../data/donnees_questions.json');

export default class VueSituation {
  constructor (situation, journal, depotRessources) {
    this.situation = situation;
    this.depotRessources = depotRessources;
    this.classesQuestions = {
      litteratie: VueLitteratie,
      numeratie: VueNumeratie,
      numeratie_inverse: VueNumeratie
    };

    this.situation.on(EVENEMENT_REPONSE_SITUATION, (question, reponse) => {
      const evenement = new EvenementReponse({ question, reponse });
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
    const libelleQuestion = this.situation.question();
    const donneesQuestion = donneesNumeratie[libelleQuestion];
    if (!libelleQuestion) {
      return;
    }
    if (this.question) {
      this.question.supprime();
    }
    this.question = new this.classesQuestions[libelleQuestion](this.depotRessources);
    const resource = this.recupereRessource(libelleQuestion, this.question);
    this.question.affiche(this.$vue, donneesQuestion, resource, this.$);
    this.question.on(EVENEMENT_REPONSE_VUE, (reponse) => {
      this.situation.repond(reponse);
    });
  }

  recupereRessource (libelle, question) {
    switch (libelle) {
      case 'litteratie':
        return question.depotRessources.accidentCarine().src;
      case 'numeratie':
        return question.depotRessources.palette().src;
      case 'numeratie_inverse':
        return question.depotRessources.palette().src;
      default:
        console.warn('libellé de question inconnu');
    }
  }
}
