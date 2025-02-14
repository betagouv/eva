import { creeStore as creeStoreCommun } from 'commun/modeles/store';
import {
  DEMARRE,
} from 'commun/modeles/situation';

export const NUMERATIE = 'numeratie';
export const NIVEAU1 = 'niveau1';
export const NIVEAU2 = 'niveau2';
export const NIVEAU3 = 'niveau3';
export const NIVEAUX = [NIVEAU1, NIVEAU2, NIVEAU3];

// Le tableau suivant correspond au tableau NUMERATIE_METRIQUES de app/models/restitution/evacob/score_module.rb dans eva-serveur
export const numeratieMetriques = {
  'N1Pse' : null,
  'N1Prn' : 'N1Rrn',
  'N1Pde' : 'N1Rde',
  'N1Pes' : 'N1Res',
  'N1Pon' : 'N1Ron',
  'N1Poa' : 'N1Roa',
  'N1Pos' : 'N1Ros',
  'N1Pvn' : null,
  'N2Plp' : 'N2Rlp',
  'N2Ppe' : 'N2Rpe',
  'N2Psu' : 'N2Rsu',
  'N2Pom' : 'N2Rom',
  'N2Pon' : 'N2Ron',
  'N2Pod' : 'N2Rod',
  'N2Put' : 'N2Rut',
  'N2Prh' : 'N2Rrh',
  'N2Ptg' : 'N2Rtg',
  'N2Ppl' : 'N2Rpl',
  'N3Ppl' : 'N3Rpl',
  'N3Put' : 'N3Rut',
  'N3Pum' : null,
  'N3Pim' : null,
  'N3Ppo' : 'N3Rpo',
  'N3Ppr' : 'N3Rpr',
  'N3Pps' : 'N3Rps',
  'N3Pvo' : 'N3Rvo',
  'N3Prp' : 'N3Rrp',
};

export function creeStore () {
  return creeStoreCommun({
    state: {
      fondSituation: '',
      indexCarte: 0,
      indexSerie: 0,
      indexNiveau: 0,
      indexRattrapage: 0,
      questionActive: {},
      series: [],
      termine: false,
      reponses: {},
      pourcentageDeReussiteGlobal: 0,
      pourcentageDeReussiteCompetence: {
        'N1Prn': 100,
        'N1Pde': 100,
        'N1Pes': 100,
        'N1Pon': 100,
        'N1Poa': 100,
        'N1Pos': 100,
        'N2Plp': 100,
        'N2Ppe': 100,
        'N2Psu': 100,
        'N2Pom': 100,
        'N2Pon': 100,
        'N2Pod': 100,
        'N2Put': 100,
        'N2Prh': 100,
        'N2Ptg': 100,
        'N2Ppl': 100,
        'N3Ppl': 100,
        'N3Put': 100,
        'N3Ppo': 100,
        'N3Ppr': 100,
        'N3Pps': 100,
        'N3Pvo': 100,
        'N3Prp': 100
      },
      maxScoreNiveauEnCours: 0
    },

    getters: {
      nombreCartes (state) {
        return state.series[state.indexSerie].cartes.length;
      },

      reponse(state) {
        return (idQuestion) => state.reponses[idQuestion];
      },

      maxScoreSerieEnCours(state) {
        let totalScore = 0;

        state.series.forEach(item => {
          item.cartes.forEach(carte => {
            if (carte.score)
              totalScore += carte.score;
          });
        });
        return totalScore;
      },

      codeCompetenceEnCours(state) {
        return state.questionActive.nom_technique.substring(0, 5);
      },

      estCompetenceARattraper(state) {
        return state.questionActive.nom_technique.substring(0, 5) in state.pourcentageDeReussiteCompetence;
      },

      rattrapagesAPasser(state) {
        return Object.keys(state.pourcentageDeReussiteCompetence).filter((competence) => state.pourcentageDeReussiteCompetence[competence] < 100);
      },

      estDernierNiveau(state) {
        return state.parcours == NIVEAUX[NIVEAUX.length -1];
      },

      rattrapageEnCours(state) {
        return !NIVEAUX.includes(state.parcours);
      },

      derniereQuestionRattrapage(state, getters) {
        const dernierRattrapageAPasser = getters.rattrapagesAPasser[getters.rattrapagesAPasser.length - 1];
        return retrouveQuestionConfiguration(state.configuration, numeratieMetriques[dernierRattrapageAPasser]);
      },

      estDerniereQuestionRattrapage(state, getters) {
        if(!getters.rattrapageEnCours) return false;
        return state.questionActive.nom_technique === getters.derniereQuestionRattrapage;
      },

      estCarteActive(state) {
        return (idCarte) => state.questionActive.nom_technique == idCarte;
      },

      tousLesParcours(state) {
        return Object.keys(state.configuration);
      }
    },

    mutations: {
      configureActe (state, { questions, fondSituation }) {
        state.configuration = questions;
        state.fondSituation = fondSituation;
        this.commit('demarreParcours', NIVEAU1);
      },

      carteSuivanteParcours(state) {
        state.indexCarte++;
        if (state.indexCarte < state.series[state.indexSerie].cartes.length) {
          state.questionActive = state.series[state.indexSerie].cartes[state.indexCarte];
        }
        else {
          state.indexCarte = 0;
          state.indexSerie++;
          if (state.indexSerie < state.series.length) {
            state.questionActive = state.series[state.indexSerie].cartes[state.indexCarte];
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
        if(state.etat === DEMARRE) {
          state.questionActive = state.series[state.indexSerie].cartes[state.indexCarte];
        }
        if(!this.getters.rattrapageEnCours) {
          state.maxScoreNiveauEnCours = this.getters.maxScoreSerieEnCours;
        }
      },

      carteSuivante(state) {
        state.aide = false;
        this.commit('carteSuivanteParcours');

        if (!state.parcoursTermine) {
          return;
        }

        const { pourcentageDeReussiteGlobal, indexRattrapage } = state;
        const { estDernierNiveau, rattrapagesAPasser } = this.getters;

        if (pourcentageDeReussiteGlobal >= 70) {
          if (!estDernierNiveau) {
            state.indexNiveau += 1;
            reinitialiseRattrapagesAPasser(state);
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
        const { question, succes, score } = reponse;
        const { questionActive, pourcentageDeReussiteCompetence, reponses } = state;
        const { rattrapageEnCours, estCompetenceARattraper, codeCompetenceEnCours, maxScoreSerieEnCours } = this.getters;

        reponses[question] = {
          ...reponse,
          score: score ?? (succes ? questionActive.score : 0)
        };

        if (succes && !rattrapageEnCours) {
          state.pourcentageDeReussiteGlobal += calculPourcentage(questionActive.score, maxScoreSerieEnCours);
        } else if (!succes && estCompetenceARattraper) {
          pourcentageDeReussiteCompetence[codeCompetenceEnCours] = calculPourcentage(questionActive.score, 2);
        }
      },

      recalculePourcentageReussiteGlobal(state) {
        if(!this.getters.estDerniereQuestionRattrapage) {
          return;
        }

        const scoresParMetrique = calculeScoreParMetrique(state.reponses);
        const meilleursScores = filtreMeilleursScores(scoresParMetrique);
        const reponses = recupereReponsesMeilleursScores(meilleursScores, state.reponses);
        const scoreTotal = additionneScores(reponses);

        state.pourcentageDeReussiteGlobal =  calculPourcentage(scoreTotal, state.maxScoreNiveauEnCours);
      },
    },
  });
}

export function additionneScores(reponses) {
  return reponses.reduce((acc, reponse) => acc + reponse.score, 0);
}

export function calculPourcentage(valeur, total) {
  return Math.round(valeur / total * 100);
}

export function calculeScoreParMetrique(reponses) {
  const scoresTotaux = {};

  for (const [questionInitiale, rattrapage] of Object.entries(numeratieMetriques)) {
    scoresTotaux[questionInitiale] = Object.values(reponses)
      .filter(e => e.question.startsWith(questionInitiale))
      .reduce((total, e) => total + e.score, 0);
    if (rattrapage) {
      scoresTotaux[rattrapage] = Object.values(reponses)
        .filter(e => e.question.startsWith(rattrapage))
        .reduce((total, e) => total + e.score, 0);
    }
  }

  return scoresTotaux;
}

export function filtreMeilleursScores(scoresParMetrique) {
  return Object.keys(numeratieMetriques).map(question => {
    const rattrapage = numeratieMetriques[question];
    if (!rattrapage) return question;
    return scoresParMetrique[question] > scoresParMetrique[rattrapage] ? question : rattrapage;
  });
}

export function recupereReponsesMeilleursScores(meilleursScores, reponses) {
  return meilleursScores.flatMap(metrique =>
    Object.values(reponses).filter(e => e.question.startsWith(metrique))
  );
}

export function reinitialiseRattrapagesAPasser(state) {
  Object.keys(state.pourcentageDeReussiteCompetence).forEach(competence => {
    state.pourcentageDeReussiteCompetence[competence] = 100;
  });
}

export function retrouveQuestionConfiguration(config, nomTechnique) {
  let derniereCorrespondance = null;

  for (const niveau in config) {
    for (const series of config[niveau].series) {
      if (series.cartes) {
        for (const question of series.cartes) {
          if (question && question.nom_technique.startsWith(nomTechnique)) {
            derniereCorrespondance = question;
          }
        }
      }
    }
  }

  return derniereCorrespondance?.nom_technique;
}
