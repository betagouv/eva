<template>
  <div>
    <label
        :for="id">
      {{ $traduction(`accueil.${nom}`) }}
    </label>
    <div class="element-formulaire">
      <select
        v-if="typeInput == 'select'"
        :id="id"
        v-on:change="emetReponse($event.target.value)"
        :value="value"
        class="champ champ-texte champ-texte-accueil champ-selection"
        :class="[
                 vide ? 'champ-selection--vide': '',
                 erreurs[nom] ? 'erreur-champ': '',
                 classSpecifique
                ]">
        <option v-if="vide" value="" disabled selected hidden>Sélection</option>
        <option
          v-for="option in options"
          :key="option"
          :value="option">{{ option }}</option>
      </select>
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

export default {
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

  data () {
    return {
      vide: true
    };
  },

  computed: {
    id () {
      return `formulaire-${this.nom}`;
    },
  },

  methods: {
    emetReponse (valeur) {
      this.vide = false;
      this.$emit('input', valeur);
    },
  },
};
</script>
