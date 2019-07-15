import { EVENEMENT_REPONSE as EVENEMENT_REPONSE_SITUATION } from 'questions/modeles/situation';
import EvenementReponse from 'questions/modeles/evenement_reponse';
import { EVENEMENT_REPONSE as EVENEMENT_REPONSE_VUE } from './question';
import VueRedactionNote from './redaction_note';
import VueQCM from './qcm';

export default class VueSituation {
  constructor (situation, journal, depotRessources) {
    this.situation = situation;
    this.depotRessources = depotRessources;
    this.classesQuestions = {
      redaction_note: VueRedactionNote,
      qcm: VueQCM
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
    const question = this.situation.question();
    if (!question) {
      return;
    }
    if (this.question) {
      this.question.supprime();
    }
    const resource = this.recupereRessource(question.identifiant);
    this.question = new this.classesQuestions[question.type](question, resource);
    this.question.affiche(this.$vue, this.$);
    this.question.on(EVENEMENT_REPONSE_VUE, (reponse) => {
      this.situation.repond(reponse);
    });
  }

  recupereRessource (identifiant) {
    switch (identifiant) {
      case 'litteratie':
        return this.depotRessources.accidentCarine().src;
      case 'numeratie':
        return this.depotRessources.palette().src;
      case 'numeratie_inverse':
        return this.depotRessources.palette().src;
      default:
        console.warn('libellé de question inconnu');
    }
  }
}
