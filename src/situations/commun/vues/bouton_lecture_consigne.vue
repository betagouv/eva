<template>
  <BoutonLecture 
    :nomTechnique="nomTechnique"
    @click="definiNomTechnique()"
    :callbackDebut="enregistrerEvenement"
    :avecEtiquette="true"
    :SurchargeSonAJouer="sonAJouer"
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
    definiNomTechnique () {
      this.nomTechnique = this.$depotRessources.consigneEnCours || 'consigneDemarrage';
    },
    enregistrerEvenement() {
      this.journal.enregistre(new EvenementRejoueConsigne());
    },
    sonAJouer () {
      return this.$depotRessources.consigneDemarrage();
    }
  },
};
</script>
