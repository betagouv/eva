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
      return this.question.max_length ?? (this.estNumerique ? null : 15);
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
      const reponseSaisie = valeur.trim();
      let succes;
      let score;
      let scoreMax;
      if(this.question.reponses) {
        const reponse = this.question.reponses?.find(r => r.intitule === reponseSaisie.toLowerCase());
        succes = !!reponse;
        score = reponse ? this.recupereScore(reponse.type_choix) : 0;
        scoreMax = this.question.score_bonus ?? this.question.score;
      }
      this.$emit('reponse', { reponse: reponseSaisie, succes, score, scoreMax });
    },

    recupereScore(type) {
      switch(type) {
      case 'bon': return this.question.score;
      case 'acceptable': return this.question.score_acceptable;
      case 'bonus': return this.question.score_bonus;
      default: return 0;
      }
    }
  },

  mounted: function () {
    if (this.estFirefox) {
      this.$refs.reponseChampSaisie.focus({ preventScroll: true });
    }
  }
};
</script>
