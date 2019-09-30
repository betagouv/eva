<template>
  <div>
    <h3>{{ question.titre }}</h3>
    <div
      v-for="option in question.options"
      class="identification-danger-input">
      <label>
        <input v-model="choix" type="radio" name="option" :value="option.valeur" />
        {{ option.libelle }}
      </label>
    </div>
    <button
      :disabled="desactivee"
      @click="question.click"
      class="bouton-arrondi bouton-arrondi--petit">{{ traduction('securite.danger.bouton') }}
    </button>
  </div>
</template>

<script>
import 'securite/styles/identification_danger.scss';

export default {
  props: {
    question: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      choix: ""
    };
  },

  computed: {
    desactivee () {
      return this.choix === "";
    },
  }
}

</script>

