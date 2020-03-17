<template>
  <question
    :question="question"
    class="question--qcm"
  >
    <slot />
    <p class="sans-marge">{{ question.description }}</p>
    <p class="question-intitule sans-marge">{{ question.intitule }}</p>
    <div
      v-for="element in question.choix"
      :key="element.id"
      class="question-choix"
    >
      <label>
        <input
          v-model="reponse"
          :value="element.id"
          name="question"
          type="radio"
        />
        <lecteur-audio
          v-if="element.audio"
          :src="element.audio"
        />
        <template v-else>
          {{ element.intitule }}
        </template>
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

export default {
  components: { LecteurAudio, Question },

  props: {
    question: {
      type: Object,
      required: true
    }
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
    }
  }
};
</script>
