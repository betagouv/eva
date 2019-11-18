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
      competencesFortes: [],
      situationsFaites: registreUtilisateur.situationsFaites()
    },
    mutations: {
      connecte (state, nom) {
        state.estConnecte = true;
        state.nom = nom;
        state.situationsFaites = [];
      },

      deconnecte (state) {
        state.estConnecte = false;
        state.nom = '';
        state.situationsFaites = [];
        state.situations = [];
        state.competences = [];
      },

      metsAJourSituations (state, situations) {
        state.situations = situations;
      },

      metsAJourCompetencesFortes (state, competencesFortes) {
        state.competencesFortes = competencesFortes.slice(0, 2);
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

      recupereCompetencesFortes ({ commit }) {
        return fetch(registreUtilisateur.urlEvaluation()).then((reponse) => {
          return reponse.json();
        }).then((json) => {
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
