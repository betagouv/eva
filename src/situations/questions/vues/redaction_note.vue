<template>
  <question
    :question="question"
    class="question--redaction-note"
  >
    <slot />
    <question-entete
      :question="question"
      />
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
import QuestionEntete from 'commun/vues/question_entete';

export default {
  components: { Question, QuestionEntete },

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
