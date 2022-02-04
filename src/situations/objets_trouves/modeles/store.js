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
      etatTelephone: null,
      consignesEcranAccueil: []
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
      },
      consigneEcranAccueil (state) {
        return () => {
          if (state.consignesEcranAccueil) {
            if (state.indexConsigne < state.consignesEcranAccueil.length - 1) {
              state.indexConsigne++;
            }
            return state.consignesEcranAccueil[state.indexConsigne];
          }
        };
      }
    },

    mutations: {
      configureActe (state, { appsAccueilVerrouille, apps, consignesEcranAccueil, questionsFin}) {
        state.appsAccueilVerrouille = appsAccueilVerrouille;
        state.apps = apps;
        state.questionsFin = questionsFin;
        state.appsVisitees = [];
        state.indexConsigne = -1;
        state.consignesEcranAccueil = consignesEcranAccueil;
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
