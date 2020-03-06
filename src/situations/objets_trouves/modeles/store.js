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
      apps: {},
      appActive: null,
      appsVisitees: []
    },
    mutations: {
      configureActe (state, { fondSituation, apps }) {
        state.fondSituation = fondSituation;
        state.apps = apps;
      },
      afficheApp (state, app) {
        state.appActive = app;
      },
      ajouteAppVisitee (state, app) {
        state.appsVisitees.push(app);
      }
    }
  });
}

export { CHARGEMENT, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI };
