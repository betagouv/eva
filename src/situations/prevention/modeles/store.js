import {
  CHARGEMENT,
  ENTRAINEMENT_DEMARRE,
  ENTRAINEMENT_FINI,
  DEMARRE,
  FINI
} from 'commun/modeles/situation';
import { creeStore as creeStoreCommun } from 'commun/modeles/store';

function chercheParId (zones, id) {
  return zones.find(zone => zone.id === id);
}

export function creeStore () {
  return creeStoreCommun({
    state: {
      zones: [],
      fondSituation: ''
    },
    getters: {
      evaluationZone (state) {
        return id => chercheParId(state.zones, id).evaluation;
      },
      preventionZone (state) {
        return id => chercheParId(state.zones, id).prevention;
      }
    },
    mutations: {
      configureActe (state, { zones, fondSituation }) {
        state.zones = zones.map((zone) => {
          return {
            ...zone,
            evaluation: null,
            prevention: null
          };
        });
        state.fondSituation = fondSituation;
      },
      previentZone (state, { id, panneau }) {
        chercheParId(state.zones, id).evaluation = panneau;
      },
      selectionPrevention (state, { id }) {
        chercheParId(state.zones, id).prevention = true;
      }
    }
  });
}

export { CHARGEMENT, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI };
