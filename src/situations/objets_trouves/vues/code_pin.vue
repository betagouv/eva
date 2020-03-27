<template>
  <question
    :question="question"
  >
    <p class="codepin-explication">{{ question.intitule }}</p>
    <p class="codepin-question">{{ question.question }}</p>

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

    <button
      :disabled="disabled"
      class="question-bouton bouton-arrondi bouton-arrondi--petit"
      @click="envoi"
    >
      {{ $traduction('objets_trouves.verouillage.valider') }}
    </button>
  </question>
</template>

<script>
import 'commun/styles/boutons.scss';
import 'objets_trouves/styles/code_pin.scss';
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

  computed: {
    disabled () {
      return !this.reponse || this.envoyer;
    }
  },

  methods: {
    envoi () {
      this.$emit('reponse', this.reponse);
    }
  }
};
</script>
