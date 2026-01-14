import { createStore } from 'vuex';

import {
  CHARGEMENT,
  ACTIVATION_AIDE,
  CHANGEMENT_ETAT,
  DEMARRE,
  ENTRAINEMENT_DEMARRE
} from 'commun/modeles/situation';
import { nomTechniqueSansVariant } from './question';

export const TOUTES_QUESTIONS = 'toutes_questions';

function toutesLesSeries(configuration) {
  const series = [];
  for (const nomParcours in configuration) {
    series.push(...configuration[nomParcours].series);
  }
  return series;
}

const actionsCommunes = {
  sauteALaCarte({ state, getters, commit }, idCarte) {
    for (const parcours of getters.tousLesParcours) {
      commit('demarreParcours', parcours);
      while (!state.parcoursTermine) {
        if (getters.estCarteActive(idCarte)) return;
        commit('carteSuivante');
      }
      if (getters.estCarteActive(idCarte)) return;
    }
  }
};

export const storeAvecAudio = {
  state: {
    audioIdEnCours: null
  },
  mutations: {
    modifieAudioIdEnCours(state, audioId) {
      state.audioIdEnCours = audioId;
    }
  },
  getters: {
    audioIdEnCours: (state) => {
      return state.audioIdEnCours;
    }
  }
};

export function creeStore({ state, mutations, getters, actions } = {}) {
  return createStore({
    state: {
      etat: CHARGEMENT,
      aide: false,
      questions: [],
      ...state,
      ...storeAvecAudio.state
    },
    mutations: {
      modifieEtat(state, etat) {
        state.etat = etat;
      },

      activeAide(state) {
        state.aide = true;
      },

      recupereQuestionsServeur(state, questions) {
        state.questions = questions;
      },

      initialiseParcours(state, parcours) {
        state.parcours = parcours;
        state.parcoursTermine = false;
        state.termine = false;
        state.indexSerie = 0;
        state.indexCarte = 0;

        if (parcours === TOUTES_QUESTIONS) {
          state.series = toutesLesSeries(state.configuration);
        } else {
          state.series = state.configuration[state.parcours].series;
        }
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

      ...mutations,
      ...storeAvecAudio.mutations
    },
    getters: {
      acteEnCours: (state) => {
        return state.etat === DEMARRE || state.etat === ENTRAINEMENT_DEMARRE;
      },

      questionServeur: (state) => (questionActive) => {
        const nomTechnique = nomTechniqueSansVariant(questionActive.nom_technique);

        const question = state.questions.find(q => q.nom_technique.startsWith(nomTechnique));

        if (!question) return undefined;

        const { score, score_bonus, score_acceptable, metacompetence, extensionVue, id, retranscription_audio, template } = questionActive;
        Object.assign(question, {
          id,
          score,
          score_bonus,
          score_acceptable,
          metacompetence,
          template,
          extensionVue,
          retranscription_audio,
        });

        if (question.type === 'clic-dans-image' || question.type === 'glisser-deposer' || question.type === 'clic-sur-mots') {
          question.extensionVue = question.type;
          delete question.type;
        }

        return question;
      },
      ...getters,
      ...storeAvecAudio.getters
    },
    actions: {
      ...actionsCommunes,
      ...actions
    },
    watch: {
      questionActive(question) {
        console.log(question.nomTechnique);
      }
    }
  });
}

export function synchroniseStoreEtModeleSituation(situation, store) {
  situation.on(CHANGEMENT_ETAT, (etat) => {
    if (store.state.etat == etat) return;

    store.commit('modifieEtat', etat);
  });
  situation.on(ACTIVATION_AIDE, () => {
    store.commit('activeAide');
  });
  store.subscribe((mutation) => {
    switch (mutation.type) {
      case 'modifieEtat':
        situation.modifieEtat(mutation.payload);
        break;
      case 'activeAide':
        if (!situation.aideActivee) {
          situation.activeAide();
        }
        break;
    }
  });
  store.commit('modifieEtat', situation.etat());
}
