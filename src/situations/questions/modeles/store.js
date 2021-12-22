import {
  CHARGEMENT,
  ENTRAINEMENT_DEMARRE,
  ENTRAINEMENT_FINI,
  DEMARRE,
  FINI
} from 'commun/modeles/situation';
import { creeStore as creeStoreCommun } from 'commun/modeles/store';
import { illustrationsQuestions } from '../data/apps';

export function creeStore () {
  return creeStoreCommun({
    state: {
      questions: [],
      indexQuestion: 0,
      fini: false
    },
    getters: {
      nombreQuestions (state) {
        return state.questions.length;
      },
      questionCourante (state) {
        return state.questions[state.indexQuestion];
      },
      illustrationQuestion: (state) => (question) => {
        if (question.nom_technique && illustrationsQuestions[question.nom_technique]) {
          return illustrationsQuestions[question.nom_technique];
        } else {
          throw new Error(`La question ${question.id} avec le nom technique "${question.nom_technique}" ne possède pas d'illustration`);
        }
      }
    },
    mutations: {
      configureActe (state, { questions }) {
        state.questions = questions || [];
        state.indexQuestion = 0;
        state.fini = false;
      },

      repondQuestionCourante (state, reponse) {
        if (state.indexQuestion + 1 === state.questions.length) {
          state.fini = true;
        } else {
          state.indexQuestion++;
        }
      }
    }
  });
}

export { CHARGEMENT, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI };
