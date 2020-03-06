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
      questionsFin: [],
      indexQuestionsFin: 0
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
      },
      afficheApp (state, app) {
        state.appActive = app;
      },
      ajouteAppVisitee (state, app) {
        state.appsVisitees.push(app);
      },
      repondQuestionFin (state) {
        state.indexQuestionsFin += 1;
      }
    }
  });
}

export { CHARGEMENT, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI };
