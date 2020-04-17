<template>
  <question
    :question="question"
    class="question--redaction-note messagerie"
  >
    <slot />
    <p class="messagerie-sujet">{{ question.intitule }}</p>
    <p class="messagerie-expediteur">{{ question.expediteur }}</p>
    <p
      v-html="question.message"
      class='messagerie-message'
    ></p>
    <p class="messagerie-objet-reponse">{{ question.objet_reponse }}</p>
    <textarea
      v-model.trim="reponse"
      :placeholder="question.entete_reponse"
      class="messagerie-reponse"></textarea>
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
