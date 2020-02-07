<template>
  <div class="question question--qcm">
    <img
      :src="question.illustration"
      class="question-illustration"
    />
    <div class="question-barre">
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
    </div>
  </div>
</template>

<script>
import 'commun/styles/boutons.scss';
import 'questions/styles/situation.scss';
import { EVENEMENT_REPONSE } from './question';

export default {
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
      this.$emit(EVENEMENT_REPONSE, this.reponse);
    }
  }
};
</script>
