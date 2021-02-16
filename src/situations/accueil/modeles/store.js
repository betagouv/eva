import Vue from 'vue';
import Vuex from 'vuex';
import { CHANGEMENT_CONNEXION } from 'commun/infra/registre_utilisateur';

export const DECONNECTE = 'déconnecté';
export const CONTACT = 'contact';
export const DEMARRE = 'démarré';

Vue.use(Vuex);

export function creeStore (registreUtilisateur, fetch = window.fetch) {
  const store = new Vuex.Store({
    state: {
      estConnecte: registreUtilisateur.estConnecte(),
      nom: registreUtilisateur.nom(),
      situations: [],
      competencesFortes: [],
      situationsFaites: registreUtilisateur.situationsFaites(),
      etat: registreUtilisateur.estConnecte() ? DEMARRE : DECONNECTE
    },
    mutations: {
      connecte (state, nom) {
        state.estConnecte = true;
        state.nom = nom;
        state.situationsFaites = [];
        state.etat = CONTACT;
      },

      deconnecte (state) {
        state.estConnecte = false;
        state.nom = '';
        state.situationsFaites = [];
        state.situations = [];
        state.competences = [];
        state.etat = DECONNECTE;
      },

      metsAJourSituations (state, situations) {
        state.situations = situations;
      },

      metsAJourCompetencesFortes (state, competencesFortes) {
        state.competencesFortes = competencesFortes.slice(0, 2);
      },

      demarre (state) {
        state.etat = DEMARRE;
      }
    },
    actions: {
      inscris ({ commit }, { nom, campagne }) {
        return registreUtilisateur.inscris(nom, campagne);
      },
      enregistreContact ({ commit }, { email, telephone }) {
        return registreUtilisateur.enregistreContact(email, telephone)
          .then(() => {
            commit('demarre');
          });
      },
      deconnecte () {
        return registreUtilisateur.deconnecte();
      },
      synchroniseEvaluation ({ commit }) {
        return fetch(registreUtilisateur.urlEvaluation())
          .then((reponse) => {
            if (reponse.status === 404) {
              commit('deconnecte');
              throw reponse;
            }
            return reponse;
          })
          .then(reponse => reponse.json())
          .then((json) => {
            const situations = json.situations.map(function (situation, index) {
              return {
                nom: situation.libelle,
                chemin: `${situation.nom_technique}.html`,
                identifiant: situation.nom_technique,
                niveauMinimum: index + 1
              };
            });
            commit('metsAJourSituations', situations);
          });
      },
      synchroniseCompetencesFortes ({ commit }) {
        return fetch(registreUtilisateur.urlEvaluation())
          .then((reponse) => {
            if (reponse.status === 404) {
              commit('deconnecte');
              throw reponse;
            }
            return reponse;
          })
          .then(reponse => reponse.json())
          .then((json) => {
            commit('metsAJourCompetencesFortes', json.competences_fortes);
          });
      }
    }
  });

  registreUtilisateur.on(CHANGEMENT_CONNEXION, () => {
    if (registreUtilisateur.estConnecte()) {
      store.commit('connecte', registreUtilisateur.nom());
    } else {
      store.commit('deconnecte');
    }
  });

  return store;
}
