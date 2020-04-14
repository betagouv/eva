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
  ACCUEIL,
  ACCUEIL_VERROUILLE
} from './situation';

import { creeStore as creeStoreCommun } from 'commun/modeles/store';

export function creeStore () {
  return creeStoreCommun({
    state: {
      fondSituation: '',
      apps: {},
      appsAccueilVerrouille: {},
      appActive: null,
      appsVisitees: [],
      questionsFin: [],
      consigneEcranAccueil: null,
      etatTelephone: null
    },
    getters: {
      nombreApps (state, getters) {
        return Object.keys(getters.toutesLesApps).length;
      },
      toutesLesApps (state) {
        return {
          ...state.apps,
          ...state.appsAccueilVerrouille
        };
      },
      questionsAppActive (state, getters) {
        return getters.toutesLesApps[state.appActive];
      },
      urlIcone (state, getters) {
        return (nomApp) => {
          return getters.toutesLesApps[nomApp][0].icone;
        };
      }
    },
    mutations: {
      configureActe (state, { appsAccueilVerrouille, apps, consigneEcranAccueil, questionsFin, etatTelephone }) {
        state.appsAccueilVerrouille = appsAccueilVerrouille;
        state.apps = apps;
        state.questionsFin = questionsFin;
        state.appsVisitees = [];
        state.consigneEcranAccueil = consigneEcranAccueil;
        state.appActive = null;
        state.etatTelephone = appsAccueilVerrouille ? ACCUEIL_VERROUILLE : ACCUEIL;
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
      }
    }
  });
}

export { CHARGEMENT, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI, QUESTIONS_APP, QUESTIONS_FIN, TRANSITION, ACCUEIL, ACCUEIL_VERROUILLE };
