import Vue from 'vue';
import Vuex from 'vuex';
import { CHANGEMENT_CONNEXION } from 'commun/infra/registre_utilisateur';

Vue.use(Vuex);

export function creeStore (registreUtilisateur, fetch = window.fetch) {
  const store = new Vuex.Store({
    state: {
      estConnecte: registreUtilisateur.estConnecte(),
      nom: registreUtilisateur.nom(),
      situations: [],
      situationsFaites: registreUtilisateur.situationsFaites()
    },
    mutations: {
      connecte (state, nom) {
        state.estConnecte = true;
        state.nom = nom;
      },

      deconnecte (state) {
        state.estConnecte = false;
        state.nom = '';
        state.situationsFaites = [];
      },

      metsAJourSituations (state, situations) {
        state.situations = situations;
      }
    },
    actions: {
      inscris ({ commit }, { nom, campagne }) {
        return registreUtilisateur
          .inscris(nom, campagne);
      },
      deconnecte () {
        return registreUtilisateur
          .deconnecte();
      },
      synchroniseSituations ({ commit }) {
        return fetch(registreUtilisateur.urlEvaluation()).then((reponse) => {
          return reponse.json();
        }).then((json) => {
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
      }
    },
    getters: {
      niveauActuel (state) {
        return state.situationsFaites.length + 1;
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
