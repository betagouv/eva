<template>
  <div class="champ-saisie"
       :class="{'champ-saisie--decale': afficheLectureQuestion }">
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
          ref="reponseChampSaisie"
          class="champ"
          :spellcheck="false"
          autocomplete="off"
          autocapitalize="off"
          autocorrect="off"
          autofocus
          :class="{ 'champ-texte' : estTexte,
                    'champ-numerique' : estNumerique }"
          :maxlength="maxLength"
          :placeholder="placeholder"
          type='text'
          />
      <span v-if="question.suffix_reponse" class="suffix">
        {{ question.suffix_reponse }}
      </span>
    </div>
  </div>
</template>

<script>
import { isFirefox } from 'mobile-device-detect';
import 'commun/styles/champ.scss';
import 'commun/styles/defi/champ_saisie.scss';

export default {
  props: {
    question: {
      type: Object,
      required: true
    },
    estFirefox: {
      type: Boolean,
      default: isFirefox
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
      return this.estNumerique ? 4 : 15;
    },
    afficheLectureQuestion () {
      return this.$depotRessources.existeMessageAudio(this.question.nom_technique);
    },
    placeholder () {
      if (this.question.placeholder) {
        return this.question.placeholder;
      }
      if (this.estTexte) {
        return 'Réponse';
      }

      return null;
    }
  },

  methods: {
    emetReponse (valeur) {
      const reponse = valeur.trim();
      let succes;
      let score;
      if(this.question.reponse) {
        const indexReponse = this.question.reponse.textes.indexOf(reponse.toLowerCase());
        succes = indexReponse != -1;
        score = this.question.reponse.scores && this.question.reponse.scores[indexReponse];
      }
      this.$emit('reponse', { reponse, succes, score });
    },
  },

  mounted: function () {
    if (this.estFirefox) {
      this.$refs.reponseChampSaisie.focus({ preventScroll: true });
    }
  }
};
</script>
