import Vue from 'vue';
import Vuex from 'vuex';
import { CHANGEMENT_CONNEXION } from 'commun/infra/registre_utilisateur';

Vue.use(Vuex);

export function creeStore (registreUtilisateur) {
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
