import { createStore } from 'vuex';

import {
  CHARGEMENT,
  ACTIVATION_AIDE,
  CHANGEMENT_ETAT,
  DEMARRE,
  ENTRAINEMENT_DEMARRE
} from 'commun/modeles/situation';

const actionsCommunes = {
  sauteALaCarte({ state, getters, commit }, idCarte) {
    for (const parcours of getters.tousLesParcours) {
      commit('demarreParcours', parcours);
      while (!state.parcoursTermine) {
        if (getters.estCarteActive(idCarte)) return;
        commit('carteSuivante');
      }
      if (getters.estCarteActive(idCarte)) return;
    }
  }
};

export function creeStore ({ state, mutations, getters, actions } = {}) {
  return createStore({
    state: {
      etat: CHARGEMENT,
      aide: false,
      questions: [],
      audioIdEnCours: null,
      ...state
    },
    mutations: {
      modifieAudioIdEnCours (state, audioId) {
        state.audioIdEnCours = audioId;
      },

      modifieEtat (state, etat) {
        state.etat = etat;
      },

      activeAide (state) {
        state.aide = true;
      },

      recupereQuestionsServeur(state, questions) {
        state.questions = questions;
      },
      ...mutations
    },
    getters: {
      audioIdEnCours: (state) => {
        return state.audioIdEnCours;
      },

      acteEnCours: (state) => {
        return state.etat === DEMARRE || state.etat === ENTRAINEMENT_DEMARRE;
      },

      questionServeur: (state) => (questionActive) => {
        const question = state.questions.find(q => q.nom_technique.startsWith(questionActive.nom_technique));

        if (!question) return undefined;

        const { score, score_bonus, score_acceptable, metacompetence, extensionVue, id, retranscription_audio, template } = questionActive;
        Object.assign(question, {
          id,
          score,
          score_bonus,
          score_acceptable,
          metacompetence,
          template,
          extensionVue,
          retranscription_audio,
        });

        if(question.type === 'clic-dans-image' || question.type === 'glisser-deposer' || question.type === 'clic-sur-mots') {
          question.extensionVue = question.type;
          delete question.type;
        }

        return question;
      },
      ...getters
    },
    actions: {
      ...actionsCommunes,
      ...actions
    }
  });
}

export function synchroniseStoreEtModeleSituation (situation, store) {
  situation.on(CHANGEMENT_ETAT, (etat) => {
    if (store.state.etat == etat) return;

    store.commit('modifieEtat', etat);
  });
  situation.on(ACTIVATION_AIDE, () => {
    store.commit('activeAide');
  });
  store.subscribe((mutation) => {
    switch (mutation.type) {
    case 'modifieEtat':
      situation.modifieEtat(mutation.payload);
      break;
    case 'activeAide':
      if (!situation.aideActivee) {
        situation.activeAide();
      }
      break;
    }
  });
  store.commit('modifieEtat', situation.etat());
}
