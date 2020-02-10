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
      indexQuestions: 0
    },
    getters: {
      nombreQuestions (state) {
        return state.questions.length;
      },
      questionCourante (state) {
        let index = state.indexQuestions;
        if (index === state.questions.length) {
          index = index - 1;
        }
        return state.questions[index];
      },
      numeroQuestionCourante (state, getters) {
        return state.questions.findIndex((question) => question === getters.questionCourante) + 1;
      }
    },
    mutations: {
      configureActe (state, { questions }) {
        state.questions = questions;
      },

      repondQuestionCourante (state, reponse) {
        state.indexQuestions += 1;
      }
    }
  });
}

export { CHARGEMENT, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI };
