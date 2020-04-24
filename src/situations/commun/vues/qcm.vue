<template>
  <div>
    <component
      :is="question.extensionVue"
      :question="question"
    />

    <question
      :question="question"
      class="question--qcm"
    >
      <slot />
      <p class="sans-marge">{{ question.description }}</p>
      <p class="question-intitule">{{ question.intitule }}</p>
      <p class="sans-marge">{{ question.consigne }}</p>
      <div
        v-if="question.numerique"
        class="question-choix"
      >
        <div class="numerique-input-conteneur"
             :class="{ 'chiffres-espaces' : question.espacerChiffres }">
          <div class="conteneur-traits-saisie">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <input
            v-model.trim="reponse"
            class="numerique-input"
            maxlength="4"
            type='text'
            />
        </div>
      </div>
      <div
        v-for="element in question.choix"
        :key="element.id"
        class="question-choix"
      >
        <label class="question-label">
          <input
            v-model="reponse"
            :value="element.id"
            name="question"
            type="radio"
            class="question-input"
          />
          <lecteur-audio
            v-if="element.audio"
            :joue-son="reponse == element.id"
            :src="son(element.audio, element.id)"
            class="question-reponse-intitule"
          />
          <img
            v-if="element.image"
            :src="element.image"
            class="question-reponse-intitule"
          />
          <span
            v-else
            class="question-reponse-intitule"
          >
            {{ element.intitule }}
          </span>
        </label>
      </div>
      <button
        :disabled="disabled"
        class="question-bouton bouton-arrondi bouton-arrondi--petit"
        @click="envoi"
      >
        {{ $traduction('questions.qcm.valider') }}
      </button>
    </question>
  </div>
</template>

<script>
import 'commun/styles/boutons.scss';
import 'commun/styles/formulaire_qcm.scss';

import LecteurAudio from './lecteur_audio';
import Question from './question';
import EvenementAffichageQuestionQCM from 'commun/modeles/evenement_affichage_question_qcm';

export default {
  components: { LecteurAudio, Question },

  props: {
    question: {
      type: Object,
      required: true
    }
  },

  mounted () {
    const evenement = new EvenementAffichageQuestionQCM({ question: this.question.id, metacompetence: this.question.metacompetence });
    this.$journal.enregistre(evenement);
  },

  data () {
    return {
      envoyer: false,
      reponse: ''
    };
  },

  computed: {
    disabled () {
      return !this.reponse || this.envoyer;
    },

    donneesReponse () {
      let donneesReponse;
      if (this.question.numerique) {
        const succes = this.reponse === this.question.bonneReponse;
        donneesReponse = { reponse: this.reponse, succes: succes };
      } else {
        const choix = this.question.choix.find((choix) => choix.id === this.reponse);
        donneesReponse = { reponse: choix.id, succes: choix.bonneReponse };
      }
      return donneesReponse;
    }
  },

  methods: {
    envoi () {
      this.envoyer = true;
      this.$emit('reponse', this.donneesReponse);
    },

    son (nomQuestionnaire, idReponse) {
      return this.$depotRessources.reponseAudio(nomQuestionnaire, idReponse);
    }
  }
};
</script>
