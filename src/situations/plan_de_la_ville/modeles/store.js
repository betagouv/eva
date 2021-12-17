import { creeStore as creeStoreCommun } from 'commun/modeles/store';

export function creeStore () {
  return creeStoreCommun({
    state: {
      fondSituation: '',
      questions: []
    },

    mutations: {
      configureActe (state, { questions, fondSituation }) {
        state.questions = questions;
        state.fondSituation = fondSituation;
      }
    }
  });
}
