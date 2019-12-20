import Vue from 'vue';
import Vuex from 'vuex';

import {
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

export { CHARGEMENT, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI };
