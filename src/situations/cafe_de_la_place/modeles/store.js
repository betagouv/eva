import { creeStore as creeStoreCommun } from 'commun/modeles/store';

export const ORIENTATION = 'orientation';
export const PARCOURS_BAS = 'parcoursBas';
export const PARCOURS_HAUT_1 = 'parcoursHaut1';
export const PARCOURS_HAUT_2 = 'parcoursHaut2';

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
      scoreOrientation: 0,
      scoreHaut1: 0
    },

    getters: {
      nombreCartes (state) {
        return state.series[state.indexSerie].cartes.length;
      },

      texteCliquable(state) {
        const serie = state.series[state.indexSerie];
        if(serie.texteNonCliquable) {
          return serie.texte.replaceAll('[','').replaceAll(']()', '');
        }
        return serie.texte;
      },

      reponse: (state) => (idQuestion) => {
        return state.reponses[idQuestion];
      }
    },

    mutations: {
      configureActe (state, configuration) {
        state.configuration = configuration;
        this.commit('demarreParcours', ORIENTATION);
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
          if(state.parcours == ORIENTATION) {
            this.commit('demarreParcours', state.scoreOrientation < 10 ? PARCOURS_BAS : PARCOURS_HAUT_1);
          }
          else if(state.parcours == PARCOURS_HAUT_1) {
            const parcoursSuivant = state.scoreHaut1 <= 5 ? PARCOURS_BAS : PARCOURS_HAUT_2;
            this.commit('demarreParcours', parcoursSuivant);
          }
          else {
            state.termine = true;
          }
        }
      },

      enregistreReponse(state, reponse) {
        state.reponses[reponse.question] = reponse;
        if(reponse.score) {
          if(state.parcours == ORIENTATION) {
            state.scoreOrientation += reponse.score;
          }
          if(state.parcours == PARCOURS_HAUT_1) {
            state.scoreHaut1 += reponse.score;
          }
        }
      },

      sauteALaCarte(state, idCarte) {
        while(!state.parcoursTermine && state.carteActive.id != idCarte) {
          this.commit('carteSuivante');
        }
        if(state.termine){
          state.termine = false;
          this.commit('demarreParcours', PARCOURS_HAUT_1);
          while(!state.parcoursTermine && state.carteActive.id != idCarte) {
            this.commit('carteSuivante');
          }
        }
      }
    }
  });
}
