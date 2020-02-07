<template>
  <div class="question question--redaction-note">
    <img
      :src="question.illustration"
      class="question-illustration"
    />
    <div class="messagerie question-barre">
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
    </div>
  </div>
</template>

<script>
import 'commun/styles/boutons.scss';
import 'questions/styles/situation.scss';
import 'questions/styles/redaction_note.scss';
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
      reponse: ''
    };
  },

  methods: {
    envoi () {
      this.$emit(EVENEMENT_REPONSE, this.reponse);
    }
  }
};
</script>
