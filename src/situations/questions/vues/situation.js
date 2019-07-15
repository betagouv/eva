import VueResultat from 'commun/vues/resultat';
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
    this.resultat = new VueResultat(situation);
  }

  affiche (pointInsertion, $) {
    this.$ = $;
    this.pointInsertion = pointInsertion;
    this.afficheQuestion();
    this.resultat.affiche(pointInsertion, $);
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
    const resource = this.recupereRessource(question.illustration);
    this.question = new this.classesQuestions[question.type](question, resource);
    this.question.affiche(this.pointInsertion, this.$);
    this.$('.question', this.pointInsertion).hide().fadeIn();
    this.question.on(EVENEMENT_REPONSE_VUE, (reponse) => {
      this.situation.repond(reponse);
    });
  }

  recupereRessource (nom) {
    return this.depotRessources[nom]().src;
  }
}
