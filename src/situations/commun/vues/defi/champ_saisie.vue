<template>
  <div class="question-reponse">
    <div class="champ-numerique-conteneur"
         :class="{ 'chiffres-espaces' : question.espacerChiffres }">
      <div
         v-if="estNumerique"
         class="conteneur-traits-saisie"
       >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <input
          v-on:input="emetReponse($event.target.value)"
          class="champ"
          :class="{ 'champ-texte champ-texte--decale' : estTexte,
                    'champ-numerique' : estNumerique }"
          :value="value"
          :maxlength="maxLength"
          :placeholder="question.placeholder"
          type='text'
          />
    </div>
  </div>
</template>

<script>
import 'commun/styles/champ.scss';
import 'commun/styles/defi/champ_saisie.scss';

export default {
  props: {
    question: {
      type: Object,
      required: true
    }
  },

  computed: {
    estTexte () {
      return this.question.sous_type === 'texte';
    },
    estNumerique () {
      return this.question.sous_type === 'numerique';
    },
    maxLength () {
      return this.estNumerique ? 4 : undefined;
    }
  },

  methods: {
    emetReponse (valeur) {
      const reponse = valeur.trim();
      this.$emit('input', { reponse: reponse, succes: reponse.toLowerCase() === this.question.bonneReponse });
    }
  }
};
</script>
