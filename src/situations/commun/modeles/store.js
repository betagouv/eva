import { createStore } from 'vuex';

import {
  CHARGEMENT,
  ACTIVATION_AIDE,
  CHANGEMENT_ETAT,
  DEMARRE,
  ENTRAINEMENT_DEMARRE
} from 'commun/modeles/situation';

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

export function creeStore ({ state, mutations, getters, actions } = {}) {
  return createStore({
    state: {
      etat: CHARGEMENT,
      aide: false,
      questions: [],
      ...state
    },
    mutations: {
      modifieEtat (state, etat) {
        state.etat = etat;
      },

      activeAide (state) {
        state.aide = true;
      },

      recupereQuestionsServeur(state, questions) {
        state.questions = questions;
      },
      ...mutations
    },
    getters: {
      acteEnCours: (state) => {
        return state.etat === DEMARRE || state.etat === ENTRAINEMENT_DEMARRE;
      },

      questionServeur: (state) => (questionActive) => {
        const question = state.questions.find(q => q.nom_technique.startsWith(questionActive.nom_technique));

        if (!question) return undefined;

        const { score, score_bonus, score_acceptable, metacompetence, extensionVue, id, retranscription_audio } = questionActive;
        Object.assign(question, {
          id,
          score,
          score_bonus,
          score_acceptable,
          metacompetence,
          extensionVue,
          retranscription_audio,
        });

        return question;
      },
      ...getters
    },
    actions: {
      ...actionsCommunes,
      ...actions
    }
  });
}

export function synchroniseStoreEtModeleSituation (situation, store) {
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
