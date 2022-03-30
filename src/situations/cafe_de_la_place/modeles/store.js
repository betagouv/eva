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
      chapitreACrdClic: {
        texteCliquable: '',
        sousConsignes: [],
        questions: []
      },
      chapitreACrdChoix: {
        texteCliquable: '',
        sousConsignes: [],
        questions: []
      },
      chapitreAPlc: {
        questions: []
      }
    },

    mutations: {
      configureActe (state, { chapitreALrd, chapitreACrdClic, chapitreACrdChoix, chapitreAPlc }) {
        state.chapitreALrd = chapitreALrd;
        state.chapitreACrdClic = chapitreACrdClic;
        state.chapitreACrdChoix = chapitreACrdChoix;
        state.chapitreAPlc = chapitreAPlc;
      },

      configureChapitre(state, nouveauChapitre) {
        state.chapitreEnCours = nouveauChapitre;
      }
    }
  });
}
