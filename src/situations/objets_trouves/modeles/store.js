import {
  CHARGEMENT,
  ENTRAINEMENT_DEMARRE,
  ENTRAINEMENT_FINI,
  DEMARRE,
  FINI
} from 'commun/modeles/situation';

import {
  QUESTIONS_APP,
  QUESTIONS_FIN,
  TRANSITION,
  ACCUEIL
} from './situation';

import { creeStore as creeStoreCommun } from 'commun/modeles/store';

export function creeStore () {
  return creeStoreCommun({
    state: {
      fondSituation: '',
      apps: {},
      appActive: null,
      appsVisitees: [],
      questionsFin: [],
      consigneEcranAccueil: null,
      etatTelephone: ACCUEIL,
      afficheEcranVerrouillage: null
    },
    getters: {
      nombreApps (state) {
        return Object.keys(state.apps).length;
      }
    },
    mutations: {
      configureActe (state, { apps, consigneEcranAccueil, questionsFin, etatTelephone }) {
        state.apps = apps;
        state.questionsFin = questionsFin;
        state.appsVisitees = [];
        state.consigneEcranAccueil = consigneEcranAccueil;
        state.appActive = null;
        state.etatTelephone = etatTelephone;
        state.afficheEcranVerrouillage = 'deverouillage' in apps;
      },
      afficheApp (state, app) {
        state.appActive = app;
        state.etatTelephone = QUESTIONS_APP;
      },
      ajouteAppVisitee (state, app) {
        state.appsVisitees.push(app);
      },
      modifieEtatTelephone (state, etat) {
        state.etatTelephone = etat;
      },
      deverouillageTelephone (state, app) {
        state.afficheEcranVerrouillage = false;
        delete state.apps[app];
      }
    }
  });
}

export { CHARGEMENT, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI, QUESTIONS_APP, QUESTIONS_FIN, TRANSITION, ACCUEIL };
