<template>
  <div class="defi-champ-saisie"
       :class="{'defi-champ-saisie--decale': afficheLectureQuestion }">
    <div class="champ-saisie-conteneur"
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
          spellcheck="false"
          autocomplete="off"
          autocapitalize="off"
          autocorrect="off"
          :class="{ 'champ-texte' : estTexte,
                    'champ-numerique' : estNumerique }"
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
      return this.estNumerique ? 4 : 12;
    },

    afficheLectureQuestion () {
      return this.$depotRessources.existeMessageAudio(this.question.nom_technique);
    }
  },

  methods: {
    emetReponse (valeur) {
      const reponse = valeur.trim();
      const indexReponse = this.question.reponse.textes.indexOf(reponse.toLowerCase());
      const succes = indexReponse != -1;
      const score = this.question.reponse.scores && this.question.reponse.scores[indexReponse];
      this.$emit('input', { reponse, succes, score });
    }
  }
};
</script>
