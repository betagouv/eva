<template>
  <div class="resultat-identification">
    <div class="resultat-identification-reponse">
      <p class="resultat-identification-message">{{ messageResultatIdentification }}</p>
      <img :src="pictoResultatIdentification"/>
    </div>
    <button
      class="bouton-arrondi bouton-arrondi--petit"
      @click="termine()"
      >{{ texteBouton }}</button>
  </div>
</template>

<script>
import 'securite/styles/resultat_identification.scss';
import { traduction } from 'commun/infra/internationalisation';

export default {
  props: {
    succesIdentification: {
      type: Boolean,
      required: true
    },
    danger: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    clefDanger () {
      return this.danger ? 'danger' : 'non-danger';
    },
    messageResultatIdentification () {
      const cleSucces = this.succesIdentification ? 'succes' : 'echec';
      return traduction(`securite.danger.identification.${this.clefDanger}.${cleSucces}`);
    },
    texteBouton () {
      return traduction(`securite.danger.identification.${this.clefDanger}.bouton`);
    },
    pictoResultatIdentification () {
      if (this.succesIdentification) {
        return this.depotRessources.pictoDangerBienIdentifie().src;
      } else {
        return this.depotRessources.pictoDangerMalIdentifie().src;
      }
    }
  },

  methods: {
    termine () {
      this.$emit('termine');
    }
  }
};
</script>
