import {
  CHARGEMENT,
  ENTRAINEMENT_DEMARRE,
  ENTRAINEMENT_FINI,
  DEMARRE,
  FINI
} from 'commun/modeles/situation';
import { creeStore as creeStoreCommun } from 'commun/modeles/store';

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
      }
    },
    mutations: {
      configureActe (state, { questions }) {
        state.questions = questions || [];
        state.indexQuestion = 0;
        state.fini = false;
      },

      repondQuestionCourante (state) {
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
