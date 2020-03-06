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
      fondSituation: '',
      appActive: null,
      appsVisitees: []
    },
    mutations: {
      configureActe (state, { fondSituation }) {
        state.fondSituation = fondSituation;
      },
      afficheAppli (state, app) {
        state.appActive = app;
      },
      ajouteAppVisitee (state, app) {
        state.appsVisitees.push(app);
      }
    }
  });
}

export { CHARGEMENT, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI };
