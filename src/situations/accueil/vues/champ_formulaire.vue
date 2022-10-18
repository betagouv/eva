<template>
  <div>
    <label
        :for="id">
      {{ $traduction(`accueil.${nom}`) }}
    </label>
    <div class="element-formulaire">
      <v-select
        v-if="typeInput == 'select'"
        :id="id"
        :options="options"
        @input="emetReponse"
        :value="value"
        placeholder="Selectionner"
        class="champ champ-texte champ-texte-accueil champ-selection"
        :class="[
                 erreurs[nom] ? 'erreur-champ': '',
                 classSpecifique
                ]">
      </v-select>
      <input
          v-else
          :id="id"
          v-on:input="emetReponse($event.target.value)"
          :value="value"
          :type="typeInput"
          class="champ champ-texte champ-texte-accueil"
          :class="classSpecifique"
          :min="min">
      <span v-if="postLabel">{{ postLabel }}</span>
      <span
          v-if="erreurs[nom]"
          class="erreur-message">{{ erreurs[nom][0] }}</span>
    </div>
  </div>
</template>


<script>
import 'commun/styles/champ.scss';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  components: { vSelect },

  props: {
    nom: {
      type: String,
      required: true
    },
    postLabel: {
      type: String,
    },
    value: {
      required: true
    },
    options: {
      type: Array
    },
    erreurs: {
      type: Object,
      required: true
    },
    typeInput: {
      type: String,
      default: 'text'
    },
    classSpecifique: {
      type: String,
      default: ''
    },
    min: {
      type: Boolean
    }
  },

  computed: {
    id () {
      return `formulaire-${this.nom}`;
    },
  },

  methods: {
    emetReponse (valeur) {
      this.$emit('input', valeur);
    },
  },
};
</script>
