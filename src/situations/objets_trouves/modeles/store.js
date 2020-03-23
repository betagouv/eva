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
      appsVisitees: [],
      questionsFin: []
    },
    getters: {
      nombreApps (state) {
        return Object.keys(state.apps).length;
      }
    },
    mutations: {
      configureActe (state, { apps, questionsFin }) {
        state.apps = apps;
        state.questionsFin = questionsFin;
        state.appsVisitees = [];
        state.appActive = null;
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
