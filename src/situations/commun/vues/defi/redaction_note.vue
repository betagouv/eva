<template>
  <div class="question-contenu">
    <textarea
        v-on:input="emetReponse($event.target.value)"
        :placeholder="question.reponse_placeholder"
        class="reponse-redaction"></textarea>
  </div>
</template>

<script>
import 'commun/styles/defi/redaction_note.scss';

export default {
  props: {
    question: {
      type: Object,
      required: true
    }
  },

  methods: {
    emetReponse (valeur) {
      this.$emit('input', { reponse: valeur.trim() });
    }
  }
};
</script>
