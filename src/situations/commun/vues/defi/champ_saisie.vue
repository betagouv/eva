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
        v-on:input="saisieReponse($event)"
        @blur="formateReponse($event)"
        ref="reponseChampSaisie"
        class="champ"
        :spellcheck="false"
        autocomplete="off"
        autocapitalize="off"
        autofocus
        type="text"
        autocorrect="off"
        :class="inputClass"
        :maxlength="maxLength"
        :placeholder="placeholder"
        :inputmode="inputMode"
      />
      <span v-if="question.suffix_reponse" class="suffix">{{ question.suffix_reponse }}</span>
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
    estTexte() { return this.question.sous_type === 'texte'; },
    estNumerique() { return this.question.sous_type === 'numerique'; },
    estNombreAvecVirgule() { return this.question.sous_type === 'nombre_avec_virgule'; },
    maxLength() {
      return this.question.max_length ?? (this.estNumerique ? null : 15);
    },
    afficheLectureQuestion () {
      return this.$depotRessources.existeMessageAudio(this.question.nom_technique);
    },
    placeholder() {
      return this.question.placeholder || (this.estTexte ? 'Réponse' : null);
    },

    inputMode() { return this.estNombreAvecVirgule ? 'decimal' : null; },

    inputClass() {
      return {
        'champ-texte': this.estTexte,
        'champ-numerique': this.estNumerique || this.estNombreAvecVirgule,
        'champ-nombre-avec-virgule': this.estNombreAvecVirgule
      };
    }
  },

  methods: {
    saisieReponse(event) {
      let valeur = event.target.value.trim();
      if (this.estNumerique || this.estNombreAvecVirgule) {
        valeur = valeur.replace(/[^0-9.,]/g, '');
        event.target.value = valeur;
      }
      if(valeur)
        this.emetReponse(valeur);
    },

    emetReponse(reponseSaisie) {
      let succes;
      let score;
      let scoreMax;

      if (this.question.reponses) {
        const reponse = this.question.reponses.find(r => r.intitule === reponseSaisie.toLowerCase());
        succes = !!reponse;
        score = reponse ? this.recupereScore(reponse.type_choix) : 0;
        scoreMax = this.question.score_bonus ?? this.question.score;
      }

      this.$emit('reponse', { reponse: reponseSaisie, succes, score, scoreMax});
    },

    formateReponse(event) {
      if (!this.estNombreAvecVirgule) {
        return;
      }
      if (event.target.value.trim() === '') {
        return;
      }
      let [entiers, decimaux = '00'] = event.target.value.trim().replace('.', ',').split(',');
      entiers = entiers.replace(/^0+/, '') || '0';
      decimaux = decimaux.padEnd(2, '0').slice(0, 2);
      event.target.value = `${entiers},${decimaux}`;


      this.emetReponse(`${entiers},${decimaux}`);
    },

    recupereScore(type) {
      const scores = {
        bon: this.question.score,
        acceptable: this.question.score_acceptable,
        bonus: this.question.score_bonus
      };
      return scores[type] || 0;
    }
  },

  mounted: function () {
    if (this.estFirefox) {
      this.$refs.reponseChampSaisie.focus({ preventScroll: true });
    }
  }
};
</script>
