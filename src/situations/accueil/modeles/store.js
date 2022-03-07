import Vue from 'vue';
import Vuex from 'vuex';
import { CHANGEMENT_CONNEXION } from 'commun/infra/registre_utilisateur';
import ErreurCampagne from 'commun/infra/erreur_campagne';
import { traduction } from 'commun/infra/internationalisation';

export const DECONNECTE = 'déconnecté';
export const DEMARRE = 'démarré';

Vue.use(Vuex);

export function creeStore (registreUtilisateur, registreCampagne) {
  const store = new Vuex.Store({
    state: {
      estConnecte: registreUtilisateur.estConnecte(),
      erreurFormulaireIdentification: '',
      nom: registreUtilisateur.nom(),
      nomCampagne: '',
      situations: [],
      competencesFortes: [],
      evaluationTerminee: false,
      situationsFaites: registreUtilisateur.situationsFaites(),
      etat: registreUtilisateur.estConnecte() ? DEMARRE : DECONNECTE
    },
    mutations: {
      connecte (state, nom) {
        state.estConnecte = true;
        state.nom = nom;
        state.situationsFaites = [];
        state.etat = DEMARRE;
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

      metsAJourEvaluationTerminee (state, evaluationTerminee) {
        state.evaluationTerminee = evaluationTerminee;
      }
    },
    actions: {
      inscris (pasUtile, { nom, campagne }) {
        this.state.erreurFormulaireIdentification = '';
        return new Promise((resolve, reject) => {
          registreUtilisateur.inscris(nom, campagne)
            .then(resolve)
            .catch((xhr) => {
              if (xhr.status === 422) {
                this.state.erreurFormulaireIdentification = xhr.responseJSON;
                resolve();
              } else if (xhr.status === 0) {
                this.state.erreurFormulaireIdentification = { generale: traduction('accueil.erreurs.reseau') };
                resolve();
              } else {
                reject(xhr);
              }
            });
        });
      },
      recupereCampagne (pasUtile, { codeCampagne }) {
        this.state.erreurFormulaireIdentification = '';
        return new Promise((resolve, reject) => {
          registreCampagne.recupereCampagne(codeCampagne)
            .then((campagne) => {
              registreCampagne.assigneCampagneCourante(codeCampagne);
              resolve(campagne);
            })
            .catch((erreur) => {
              if (erreur instanceof ErreurCampagne) {
                this.state.erreurFormulaireIdentification = { code: erreur.message };
                resolve();
              } else if (erreur.status === 0) {
                this.state.erreurFormulaireIdentification = { generale: traduction('accueil.erreurs.reseau') };
                resolve();
              } else {
                reject(erreur);
              }
            });
        });
      },
      deconnecte () {
        return registreUtilisateur.deconnecte();
      },
      recupereSituations ({ commit }) {
        const campagne = registreCampagne.recupereCampagneCourante();
        this.state.nomCampagne = campagne.libelle;

        if (!campagne.situations) {
          commit('deconnecte');
          return;
        }

        const situations = campagne.situations.map(function (situation, index) {
          return {
            nom: situation.libelle,
            chemin: `${situation.nom_technique}.html`,
            identifiant: situation.nom_technique,
            niveauMinimum: index + 1
          };
        });
        commit('metsAJourSituations', situations);
      },
      termineEvaluation ({ commit }) {
        return registreUtilisateur.termineEvaluation()
          .then((competencesFortes) => {
            commit('metsAJourCompetencesFortes', competencesFortes);
          })
          .finally(() => {
            commit('metsAJourEvaluationTerminee', true);
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
