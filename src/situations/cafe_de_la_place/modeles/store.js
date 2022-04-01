import { creeStore as creeStoreCommun } from 'commun/modeles/store';

export function creeStore () {
  return creeStoreCommun({
    state: {
      fondSituation: '',
      chapitreEnCours: {},
      indexCarte: 0,
      indexSerie: 0,
      indexChapitre: 0,
      carteActive: {},
      chapitres: [],
      termine: false
    },

    getters: {
      nombreCartes (state) {
        return state.chapitreEnCours.series[state.indexSerie].length;
      },

      texteCliquable(state) {
        return state.chapitreEnCours.texteCliquable;
      }
    },

    mutations: {
      configureActe (state, { chapitres }) {
        state.chapitres = chapitres;
        state.chapitreEnCours = chapitres[0];
        state.carteActive = state.chapitreEnCours.series[0][0];
      },

      carteSuivante(state) {
        state.indexCarte++;
        if (state.indexCarte < state.chapitreEnCours.series[state.indexSerie].length) {
          state.carteActive = state.chapitreEnCours.series[state.indexSerie][state.indexCarte];
        }
        else {
          state.indexCarte = 0;
          state.indexSerie++;
          if (state.indexSerie < state.chapitreEnCours.series.length) {
            state.carteActive = state.chapitreEnCours.series[state.indexSerie][state.indexCarte];
          }
          else {
            state.indexSerie = 0;
            state.indexChapitre++;
            if(state.indexChapitre < state.chapitres.length) {
              state.chapitreEnCours = state.chapitres[state.indexChapitre];
              state.carteActive = state.chapitreEnCours.series[state.indexSerie][state.indexCarte];
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
