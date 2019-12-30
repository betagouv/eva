import Vue from 'vue';

import {
  CHARGEMENT,
  ENTRAINEMENT_DEMARRE,
  ENTRAINEMENT_FINI,
  DEMARRE,
  FINI
} from 'commun/modeles/situation';

import { creeStore as creeStoreCommun } from 'commun/modeles/store';

export function creeStore () {
  return creeStoreCommun({
    state: {
      zones: [],
      dangers: {},
      fondSituation: '',
      dangersQualifies: {},
      nonDangersIdentifies: []
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
      }
    }
  });
}

export { CHARGEMENT, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI };
