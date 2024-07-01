import { creeStore as creeStoreCommun } from 'commun/modeles/store';

export const NUMERATIE = 'numeratie';
export const NIVEAU1 = 'niveau1';
export const NIVEAU2 = 'niveau2';
export const NIVEAU3 = 'niveau3';
export const NIVEAUX = [NIVEAU1, NIVEAU2, NIVEAU3];

export function creeStore () {
  return creeStoreCommun({
    state: {
      fondSituation: '',
      indexCarte: 0,
      indexSerie: 0,
      indexNiveau: 0,
      indexRattrapage: 0,
      carteActive: {},
      series: [],
      termine: false,
      reponses: {},
      pourcentageDeReussiteGlobal: 0,
      pourcentageDeReussiteCompetence: { 'N1Prn': 100 },
    },

    getters: {
      nombreCartes (state) {
        return state.series[state.indexSerie].cartes.length;
      },

      reponse(state) {
        return (idQuestion) => state.reponses[idQuestion];
      },

      maxScoreNiveauEnCours(state) {
        let totalScore = 0;

        state.series.forEach(item => {
          item.cartes.forEach(carte => {
            totalScore += carte.score;
          });
        });
        return totalScore;
      },

      codeCompetenceEnCours(state) {
        return state.carteActive.nom_technique.substring(0, 5);
      },

      estCompetenceARattraper(state) {
        return state.carteActive.nom_technique.substring(0, 5) in state.pourcentageDeReussiteCompetence;
      },

      rattrapagesAPasser(state) {
        return Object.keys(state.pourcentageDeReussiteCompetence).filter((competence) => state.pourcentageDeReussiteCompetence[competence] < 100);
      },

      estDernierNiveau(state) {
        return state.parcours == NIVEAUX[NIVEAUX.length -1];
      },

      rattrapageEnCours(state) {
        return !NIVEAUX.includes(state.parcours);
      }
    },

    mutations: {
      configureActe (state, configuration) {
        state.configuration = configuration;
        this.commit('demarreParcours', NIVEAU1);
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
        state.termine = false;
        state.parcoursTermine = false;
        state.indexSerie = 0;
        state.indexCarte = 0;
        state.pourcentageDeReussiteGlobal = 0;
        state.series = state.configuration[state.parcours].series;
        state.carteActive = state.series[state.indexSerie].cartes[state.indexCarte];
      },

      carteSuivante(state) {
        this.commit('carteSuivanteParcours');

        if (!state.parcoursTermine) {
          return;
        }

        const { pourcentageDeReussiteGlobal, indexRattrapage } = state;
        const { estDernierNiveau, rattrapagesAPasser } = this.getters;

        if (pourcentageDeReussiteGlobal > 70) {
          if (!estDernierNiveau) {
            state.indexNiveau += 1;
            this.commit('demarreParcours', NIVEAUX[state.indexNiveau]);
          } else {
            state.termine = true;
          }
        } else {
          if (rattrapagesAPasser.length === indexRattrapage) {
            state.termine = true;
          } else if (rattrapagesAPasser.length > 0) {
            this.commit('demarreParcours', rattrapagesAPasser[indexRattrapage]);
            state.indexRattrapage += 1;
          } else {
            state.termine = true;
          }
        }
      },


      enregistreReponse(state, reponse) {
        const { question, succes } = reponse;
        const { carteActive, pourcentageDeReussiteCompetence, reponses } = state;
        const { rattrapageEnCours, estCompetenceARattraper, codeCompetenceEnCours, maxScoreNiveauEnCours } = this.getters;

        reponses[question] = reponse;
        reponses[question].score = succes ? carteActive.score : 0;

        if (succes && !rattrapageEnCours) {
          state.pourcentageDeReussiteGlobal += Math.round(carteActive.score / maxScoreNiveauEnCours * 100);
        } else if (!succes && estCompetenceARattraper) {
          pourcentageDeReussiteCompetence[codeCompetenceEnCours] = Math.round(carteActive.score / 2 * 100);
        }
      },
    }
  });
}
