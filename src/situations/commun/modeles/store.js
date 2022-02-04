import Vue from 'vue';
import Vuex from 'vuex';

import {
  CHARGEMENT,
  ACTIVATION_AIDE,
  CHANGEMENT_ETAT,
  DEMARRE,
  ENTRAINEMENT_DEMARRE
} from 'commun/modeles/situation';

Vue.use(Vuex);

export function creeStore ({ state, mutations, getters, actions } = {}) {
  return new Vuex.Store({
    state: {
      etat: CHARGEMENT,
      aide: false,
      ...state
    },
    mutations: {
      modifieEtat (state, etat) {
        state.etat = etat;
      },
      activeAide (state) {
        state.aide = true;
      },
      ...mutations
    },
    getters: {
      illustrationQuestion: () => (question) => {
        return question.illustration;
      },

      acteEnCours: (state) => {
        return state.etat === DEMARRE || state.etat === ENTRAINEMENT_DEMARRE;
      },
      ...getters
    },
    actions
  });
}

export function synchroniseStoreEtModeleSituation (situation, store) {
  situation.on(CHANGEMENT_ETAT, (etat) => {
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
        if (situation.aideActivee) {
          return;
        }
        situation.activeAide();
        break;
    }
  });
  store.commit('modifieEtat', situation.etat());
}
