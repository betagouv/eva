import { creeStore as creeStoreCommun } from 'commun/modeles/store';

export const NUMERATIE = 'numeratie';

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
      parcours: NUMERATIE,
      pourcentageDeReussite: 0,
    },

    getters: {
      nombreCartes (state) {
        return state.series[state.indexSerie].cartes.length;
      },

      reponse(state) {
        return (idQuestion) => state.reponses[idQuestion];
      },

      maxScoreNiveauEnCours(state) {
        return state.series[state.indexSerie].cartes.reduce((total, carte) => total + carte.score, 0);
      },
    },

    mutations: {
      configureActe (state, configuration) {
        state.configuration = configuration;
        this.commit('demarreParcours');
      },

      carteSuivanteParcours(state) {
        state.indexCarte++;
        if (state.indexCarte < state.series[state.indexSerie].cartes.length) {
          state.carteActive = state.series[state.indexSerie].cartes[state.indexCarte];
        }
        else {
          state.indexCarte = 0;
          state.indexSerie++;

          if (state.indexSerie < state.series.length && state.pourcentageDeReussite > 70) {
            state.carteActive = state.series[state.indexSerie].cartes[state.indexCarte];
            state.pourcentageDeReussite = 0;
          }
          else {
            state.indexSerie--;
            state.parcoursTermine = true;
          }
        }
      },

      demarreParcours(state) {
        state.termine = false;
        state.indexSerie = 0;
        state.indexCarte = 0;
        state.series = state.configuration[state.parcours].series;
        state.carteActive = state.series[state.indexSerie].cartes[state.indexCarte];
      },

      carteSuivante(state) {
        this.commit('carteSuivanteParcours');
        if(state.parcoursTermine) {
          state.termine = true;
        }
      },

      enregistreReponse(state, reponse) {
        state.reponses[reponse.question] = reponse;
        state.reponses[reponse.question].score = state.carteActive.score;
        if(reponse.succes) {
          state.pourcentageDeReussite += Math.round(state.carteActive.score / this.getters.maxScoreNiveauEnCours * 100);
        }
      },
    },
  });
}
