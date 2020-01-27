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
      evaluationZones: {},
      zones: [],
      fondSituation: ''
    },
    getters: {
      evaluationZone (state) {
        return (id) => state.evaluationZones[id];
      }
    },
    mutations: {
      configureActe (state, { zones, fondSituation }) {
        state.zones = zones;
        state.fondSituation = fondSituation;
      },
      previentZone (state, { id, panneau }) {
        Vue.set(state.evaluationZones, id, panneau);
      }
    }
  });
}

export { CHARGEMENT, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI };
