<template>
  <div class="question-reponse">
    <div class="input-numerique-conteneur"
         :class="{ 'chiffres-espaces' : question.espacerCaracteres }">
      <div class="conteneur-traits-saisie">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <input
          v-on:input="$emit('input', $event.target.value.trim())"
          class="input input-numerique"
          :value="value"
          maxlength="4"
          type='text'
          />
    </div>
  </div>
</template>

<script>
import 'commun/styles/defi/champ_saisie.scss';

export default {
  props: {
    question: {
      type: Object,
      required: true
    },
    value: {
      type: String
    }
  }
};
</script>
