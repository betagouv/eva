import { creeStore as creeStoreCommun } from 'commun/modeles/store';

export function creeStore () {
  return creeStoreCommun({
    state: {
      fondSituation: '',
      chapitreALrd: {
        sousConsignes: [],
        questions: []
      },
      chapitreACrd: {
        sousConsignes: [],
        questions: []
      },
    },

    mutations: {
      configureActe (state, { chapitreALrd, chapitreACrd }) {
        state.chapitreALrd = chapitreALrd;
        state.chapitreACrd = chapitreACrd;
      }
    }
  });
}
