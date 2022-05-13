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
      configureActe (state, configuration) {
        state.configuration = configuration;
        this.commit('demarreParcours', 'orientation');
      },

      carteSuivanteParcours(state) {
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
            state.parcoursTermine = true;
          }
        }
      },

      demarreParcours(state, parcours) {
        state.parcours = parcours;
        state.parcoursTermine = false;
        state.indexSerie = 0;
        state.indexCarte = 0;
        state.series = state.configuration[state.parcours].series;
        state.carteActive = state.series[state.indexSerie].cartes[state.indexCarte];
      },

      carteSuivante(state) {
        this.commit('carteSuivanteParcours');
        if(state.parcoursTermine) {
          if(state.parcours == 'orientation') {
            this.commit('demarreParcours', state.score < 10 ? 'parcoursBas' : 'parcoursHaut');
          }
          else {
            state.termine = true;
          }
        }
      },

      enregistreReponse(state, reponse) {
        state.reponses[reponse.question] = reponse;
        if(reponse.succes && reponse.score) {
          state.score += reponse.score;
        }
      },

      sauteALaCarte(state, idCarte) {
        while(!state.parcoursTermine && state.carteActive.id != idCarte) {
          this.commit('carteSuivante');
        }
        if(state.termine){
          state.termine = false;
          this.commit('demarreParcours', 'parcoursHaut');
          while(!state.parcoursTermine && state.carteActive.id != idCarte) {
            this.commit('carteSuivante');
          }
        }
      }
    }
  });
}
