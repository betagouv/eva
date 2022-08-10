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
          id="reponsecafedelaplace"
          class="champ"
          spellcheck="false"
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
    focusInput() {
      var reponsecafedelaplace = document.getElementById('reponsecafedelaplace');
      reponsecafedelaplace.focus({ preventScroll: true });
    },

    emetReponse (valeur) {
      const reponse = valeur.trim();
      const indexReponse = this.question.reponse.textes.indexOf(reponse.toLowerCase());
      const succes = indexReponse != -1;
      const score = this.question.reponse.scores && this.question.reponse.scores[indexReponse];
      this.$emit('input', { reponse, succes, score });
    },
  },

  mounted: function () {
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      this.focusInput();
    }
  }
};
</script>
