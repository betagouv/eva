import { creeStore as creeStoreCommun } from 'commun/modeles/store';

export function creeStore () {
  return creeStoreCommun({
    state: {
      fondSituation: '',
      chapitreALrd: {
        sousConsignes:[],
        questions: []
      },
    },

    mutations: {
      configureActe (state, { chapitreALrd }) {
        state.chapitreALrd.sousConsignes = chapitreALrd.sousConsignes;
        state.chapitreALrd.questions = chapitreALrd.questions;
      }
    }
  });
}
