<template>
  <form @submit.prevent="submit">
    <h3>{{ question.titre }}</h3>
    <div
      v-for="option in question.options"
      :key="option.valeur"
      class="formulaire-radio-input">
      <label>
        <input v-model="choix" type="radio" name="option" :value="option.valeur" />
        {{ option.libelle }}
      </label>
    </div>
    <button
      :disabled="desactivee"
      class="bouton-arrondi bouton-arrondi--petit">{{ question.bouton }}</button>
  </form>
</template>

<script>
import 'securite/styles/formulaire_radio.scss';

export default {
  props: {
    question: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      choix: this.question.choix
    };
  },

  computed: {
    desactivee () {
      return this.choix === '';
    }
  },

  methods: {
    submit () {
      this.question.submit(this.choix);
    }
  }
};
</script>
