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
        state.competencesFortes = competencesFortes;
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
      },

      recupereCompetencesFortes ({ commit }) {
        return fetch(registreUtilisateur.urlEvaluation()).then((reponse) => {
          return reponse.json();
        }).then((json) => {
          const deuxCompetencesFortes = json.competences.slice(0, 2);
          commit('metsAJourCompetencesFortes', deuxCompetencesFortes);
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
