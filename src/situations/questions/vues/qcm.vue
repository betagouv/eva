<template>
  <question
    :question="question"
    class="question--qcm"
  >
    <p class="sans-marge">{{ question.description }}</p>
    <p class="intitule-question sans-marge">{{ question.intitule }}</p>
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
        {{ element.intitule }}
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
import 'questions/styles/situation.scss';

import Question from './question';

export default {
  components: { Question },

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
