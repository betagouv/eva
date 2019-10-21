import Vue from 'vue';
import Vuex from 'vuex';

import { CHANGEMENT_ETAT, CHARGEMENT, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI } from 'commun/modeles/situation';

Vue.use(Vuex);

export function creeStore () {
  return new Vuex.Store({
    state: {
      etat: CHARGEMENT,
      zones: [],
      dangers: {},
      fondSituation: '',
      dangersQualifies: {},
      afficheAide: true,
      aide: false
    },
    getters: {
      qualification (state) {
        return (nomDanger) => state.dangersQualifies[nomDanger];
      },
      nombreDangersQualifies (state) {
        return Object.keys(state.dangersQualifies).length;
      }
    },
    mutations: {
      modifieEtat (state, etat) {
        state.etat = etat;
      },
      configureActe (state, { zones, dangers, fondSituation, afficheAide }) {
        state.zones = zones;
        state.dangers = dangers;
        state.fondSituation = fondSituation;
        state.afficheAide = afficheAide;
        state.dangersQualifies = {};
        state.aide = false;
      },
      ajouteDangerQualifie (state, dangerQualifie) {
        Vue.set(state.dangersQualifies, dangerQualifie.nom, dangerQualifie.choix);
      },
      activeAide (state) {
        state.aide = true;
      }
    }
  });
}

export function synchroniseStoreEtModeleSituation (situation, store) {
  situation.on(CHANGEMENT_ETAT, (etat) => {
    store.commit('modifieEtat', etat);
  });
  store.subscribe((mutation, state) => {
    if (mutation.type === 'modifieEtat') {
      situation.modifieEtat(mutation.payload);
    }
  });
  store.commit('modifieEtat', situation.etat());
}

export { CHARGEMENT, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI };
