import Vue from 'vue';
import { EVENEMENT_REPONSE as EVENEMENT_REPONSE_SITUATION } from 'questions/modeles/situation';
import EvenementReponse from 'questions/modeles/evenement_reponse';
import VueProgression from './progression';

import VueQCM from './qcm';
import VueRedactionNote from './redaction_note';

export default class VueSituation {
  constructor (situation, journal, depotRessources, registreUtilisateur) {
    this.situation = situation;
    this.depotRessources = depotRessources;

    const urlEvaluation = registreUtilisateur.urlEvaluation();
    this.depotRessources.chargeEvaluation(urlEvaluation, situation.identifiant);

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
    const questions = this.depotRessources.questions();
    this.situation.questions(questions);

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
      this.question.$destroy();
      this.question.$el.remove();
      callbackFinAnimation();
    });
  }

  afficheNouvelleQuestion (question) {
    const div = document.createElement('div');
    this.$(this.pointInsertion).append(div);
    this.question = new Vue({
      render: createEle => createEle(this.classesQuestions[question.type], {
        ref: 'question',
        props: {
          question
        }
      })
    }).$mount(div);
    this.progression.affiche(this.$('.question-barre'), this.$);
    this.$('.question', this.pointInsertion).hide().fadeIn();
    this.question.$refs.question.$on('reponse', (reponse) => {
      this.situation.repond(reponse);
    });
  }
}
