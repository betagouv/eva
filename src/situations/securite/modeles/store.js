import Vue from 'vue';
import Vuex from 'vuex';

import {
  ACTIVATION_AIDE,
  CHANGEMENT_ETAT,
  CHARGEMENT,
  ENTRAINEMENT_DEMARRE,
  ENTRAINEMENT_FINI,
  DEMARRE,
  FINI
} from 'commun/modeles/situation';

Vue.use(Vuex);

export function creeStore () {
  return new Vuex.Store({
    state: {
      etat: CHARGEMENT,
      zones: [],
      dangers: {},
      fondSituation: '',
      dangersQualifies: {},
      nonDangersIdentifies: [],
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
      configureActe (state, { zones, dangers, fondSituation }) {
        state.zones = zones;
        state.dangers = dangers;
        state.fondSituation = fondSituation;
        state.dangersQualifies = {};
        state.aide = false;
        state.nonDangersIdentifies = [];
      },
      ajouteDangerQualifie (state, dangerQualifie) {
        Vue.set(state.dangersQualifies, dangerQualifie.nom, dangerQualifie.choix);
      },
      ajouteNonDangerIdentifie (state, zoneId) {
        if (!state.nonDangersIdentifies.includes(zoneId)) {
          state.nonDangersIdentifies.push(zoneId);
        }
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
  situation.on(ACTIVATION_AIDE, () => {
    store.commit('activeAide');
  });
  store.subscribe((mutation, state) => {
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

export { CHARGEMENT, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI };
