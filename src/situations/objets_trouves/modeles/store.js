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
<<<<<<< HEAD
      consigneEcranAccueil: null,
      etatTelephone: ACCUEIL
=======
      afficheEcranVerrouillage: null
>>>>>>> e25626da... ajoute la vue de l'écran de verouillage
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
<<<<<<< HEAD
        state.etatTelephone = etatTelephone;
=======
        state.afficheEcranVerrouillage = 'deverouillage' in apps;
        console.log(state.afficheEcranVerrouillage);
>>>>>>> e25626da... ajoute la vue de l'écran de verouillage
      },
      afficheApp (state, app) {
        state.appActive = app;
        state.etatTelephone = QUESTIONS_APP;
      },
      ajouteAppVisitee (state, app) {
        state.appsVisitees.push(app);
      },
<<<<<<< HEAD
      modifieEtatTelephone (state, etat) {
        state.etatTelephone = etat;
=======
      deverouillageTelephone (state, app) {
        state.afficheEcranVerrouillage = false;
        delete state.apps[app];
>>>>>>> e25626da... ajoute la vue de l'écran de verouillage
      }
    }
  });
}

export { CHARGEMENT, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI, QUESTIONS_APP, QUESTIONS_FIN, TRANSITION, ACCUEIL };
