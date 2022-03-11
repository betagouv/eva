import { creeStore as creeStoreCommun } from 'commun/modeles/store';

export function creeStore () {
  return creeStoreCommun({
    state: {
      fondSituation: '',
      chapitreEnCours: {},
      chapitreALrd: {
        texteCliquable: '',
        sousConsignes: [],
        questions: []
      },
      chapitreACrd: {
        texteCliquable: '',
        sousConsignes: [],
        questions: []
      },
    },

    mutations: {
      configureActe (state, { chapitreALrd, chapitreACrd }) {
        state.chapitreALrd = chapitreALrd;
        state.chapitreACrd = chapitreACrd;
      },

      configureChapitre(state, nouveauChapitre) {
        state.chapitreEnCours = nouveauChapitre;
      }
    }
  });
}
