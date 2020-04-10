<template>
  <question
    :question="question"
    class="question--qcm"
  >
    <slot />
    <p class="sans-marge">{{ question.description }}</p>
    <p class="question-intitule">{{ question.intitule }}</p>
    <div
      v-if="question.numerique"
      class="question-choix"
    >
      <div class="codepin-input-conteneur">
        <input
          v-model.trim="reponse"
          class="codepin-input"
          maxlength="4"
          type='text'
          />
        <span></span>
        <span></span>
        <span></span>
        <span></span>
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
    const evenement = new EvenementAffichageQuestionQCM({ question: this.question.id });
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
    }
  },

  methods: {
    envoi () {
      this.envoyer = true;
      this.$emit('reponse', this.reponse);
    },

    son (nomQuestionnaire, idReponse) {
      return this.$depotRessources.reponseAudio(nomQuestionnaire, idReponse);
    }
  }
};
</script>
