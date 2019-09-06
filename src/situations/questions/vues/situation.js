import { EVENEMENT_REPONSE as EVENEMENT_REPONSE_SITUATION } from 'questions/modeles/situation';
import EvenementReponse from 'questions/modeles/evenement_reponse';
import { EVENEMENT_REPONSE as EVENEMENT_REPONSE_VUE } from './question';
import VueProgression from './progression';
import VueQCM from './qcm';
import VueRedactionNote from './redaction_note';

export default class VueSituation {
  constructor (situation, journal, depotRessources, registreUtilisateur) {
    this.situation = situation;
    this.depotRessources = depotRessources;

    this.ressourceEvaluation = registreUtilisateur.urlEvaluation();
    this.depotRessources.charge([this.ressourceEvaluation]);

    this.classesQuestions = {
      redaction_note: VueRedactionNote,
      qcm: VueQCM
    };

    this.situation.on(EVENEMENT_REPONSE_SITUATION, (question, reponse) => {
      const evenement = new EvenementReponse({ question: question.id, reponse });
      journal.enregistre(evenement);
      this.afficheQuestion();
    });
    this.progression = new VueProgression(situation);
  }

  affiche (pointInsertion, $) {
    this.situation.questions(this.depotRessources.ressource(this.ressourceEvaluation).questions);
    this.$ = $;
    this.pointInsertion = pointInsertion;
    this.afficheQuestion();
  }

  afficheQuestion () {
    const question = this.situation.question();
    if (!question) {
      return;
    }
    const cbAffichageQuestion = () => this.afficheNouvelleQuestion(question);
    if (this.question) {
      this.cacheQuestionPrecedente(cbAffichageQuestion);
    } else {
      cbAffichageQuestion();
    }
  }

  cacheQuestionPrecedente (callbackFinAnimation) {
    this.$('.question', this.pointInsertion).fadeOut(150, () => {
      this.question.supprime();
      callbackFinAnimation();
    });
  }

  afficheNouvelleQuestion (question) {
    this.question = new this.classesQuestions[question.type](question);
    this.question.affiche(this.pointInsertion, this.$);
    this.progression.affiche(this.$('.question-barre'), this.$);
    this.$('.question', this.pointInsertion).hide().fadeIn();
    this.question.on(EVENEMENT_REPONSE_VUE, (reponse) => {
      this.situation.repond(reponse);
    });
  }
}
