<template>
  <question
    :question="question"
    class="question--redaction-note"
  >
    <slot />
    <div class="question-entete">
      <p class="question-description">{{ question.description }}</p>
      <p
        v-html="question.intitule"
        class='question-intitule'
      ></p>
    </div>
    <div class="question-contenu">
      <p class="intitule-reponse">{{ question.intitule_reponse }}</p>
      <textarea
        v-model.trim="reponse"
        :placeholder="question.reponse_placeholder"
        class="reponse-redaction"></textarea>
    </div>
    <button
      class="question-bouton bouton-arrondi bouton-arrondi--petit"
      @click="envoi"
    >
      {{ $traduction('questions.redaction_note.envoyer') }}
    </button>
  </question>
</template>

<script>
import 'commun/styles/boutons.scss';
import 'questions/styles/redaction_note.scss';
import Question from 'commun/vues/question';

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
      reponse: ''
    };
  },

  methods: {
    envoi () {
      this.$emit('reponse', { reponse: this.reponse });
    }
  }
};
</script>
