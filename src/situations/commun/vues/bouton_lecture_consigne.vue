<template>
  <BoutonLecture 
    :nomTechnique="nomTechnique"
    :callbackDebut="enregistrerEvenement"
    :avecEtiquette="true"
    :surchargeSonAJouer="sonAJouer"
  />
</template>

<script>
import BoutonLecture from 'commun/vues/bouton_lecture';
import EvenementRejoueConsigne from '../modeles/evenement_rejoue_consigne';

export default {
  components: {
    BoutonLecture,
  },
  props: {
    journal: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      nomTechnique: 'consigneDemarrage',
    };
  },
  methods: {
    enregistrerEvenement() {
      this.journal.enregistre(new EvenementRejoueConsigne());
    },
    sonAJouer () {
      return this.$depotRessources[this.nomTechnique]();
    }
  },
};
</script>
