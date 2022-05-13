import { creeStore as creeStoreCommun } from 'commun/modeles/store';

export function creeStore () {
  return creeStoreCommun({
    state: {
      fondSituation: '',
      indexCarte: 0,
      indexSerie: 0,
      carteActive: {},
      series: [],
      termine: false,
      reponses: {},
      score: 0
    },

    getters: {
      nombreCartes (state) {
        return state.series[state.indexSerie].cartes.length;
      },

      texteCliquable(state) {
        return state.series[state.indexSerie].texteCliquable;
      },

      reponse: (state) => (idQuestion) => {
        return state.reponses[idQuestion];
      }
    },

    mutations: {
      configureActe (state, { series }) {
        state.series = series;
        state.carteActive = state.series[0].cartes[0];
      },

      avanceDUneCarte(state) {
        state.indexCarte++;
        if (state.indexCarte < state.series[state.indexSerie].cartes.length) {
          state.carteActive = state.series[state.indexSerie].cartes[state.indexCarte];
        }
        else {
          state.indexCarte = 0;
          state.indexSerie++;
          if (state.indexSerie < state.series.length) {
            state.carteActive = state.series[state.indexSerie].cartes[state.indexCarte];
          }
          else {
            state.indexSerie--;
            state.termine = true;
          }
        }
      },

      carteSuivante(state) {
        if(state.carteActive.id == 'LOdi13') {
          this.commit('avanceDUneCarte');
        }
        else {
          this.commit('avanceDUneCarte');
        }
      },

      enregistreReponse(state, reponse) {
        state.reponses[reponse.question] = reponse;
        if(reponse.succes && reponse.score) {
          state.score += reponse.score;
        }
      },

      sauteALaCarte(state, idCarte) {
        while(!state.termine && state.carteActive.id != idCarte) {
          this.commit('avanceDUneCarte');
        }
      }
    }
  });
}
