import { creeStore as creeStoreCommun } from 'commun/modeles/store';

export function creeStore () {
  return creeStoreCommun({
    state: {
      fondSituation: '',
      chapitreEnCours: {},
      indexCarte: 0,
      indexChapitre: 0,
      carteActive: {},
      chapitres: [],
      termine: false
    },

    mutations: {
      configureActe (state, { chapitres }) {
        state.chapitres = chapitres;
        state.chapitreEnCours = chapitres[0];
        state.carteActive = state.chapitreEnCours.sousConsignes[0];
      },

      carteSuivante(state) {
        state.indexCarte++;
        if(state.carteActive.type === 'sous-consigne') {
          if (state.indexCarte < state.chapitreEnCours.sousConsignes.length) {
            state.carteActive = state.chapitreEnCours.sousConsignes[state.indexCarte];
          }
          else {
            state.indexCarte = 0;
            state.carteActive = state.chapitreEnCours.questions[state.indexCarte];
          }
        }
        else {
          if (state.indexCarte < state.chapitreEnCours.questions.length) {
            state.carteActive = state.chapitreEnCours.questions[state.indexCarte];
          }
          else {
            state.indexChapitre++;
            if(state.indexChapitre < state.chapitres.length) {
              state.chapitreEnCours = state.chapitres[state.indexChapitre];
              state.indexCarte = 0;
              state.carteActive = state.chapitreEnCours.sousConsignes[0];
            }
            else {
              state.termine = true;
            }
          }
        }
      }
    }
  });
}
