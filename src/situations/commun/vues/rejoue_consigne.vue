<template>
  <div ref="boutonRejoueConsigne">
    <BoutonLecture 
      :nomTechnique="nomTechnique"
      @click="definiNomTechnique()"
      :callbackDebut="enregistrerEvenement"
      :avecEtiquette="true"
      :sonAJouer="sonAJouer"
    />
  </div>
</template>

<script>
import BoutonLecture from 'commun/vues/bouton_lecture';
import { traduction } from 'commun/infra/internationalisation';
import EvenementRejoueConsigne from '../modeles/evenement_rejoue_consigne';
import play from 'commun/assets/play.svg';
import enPause from 'commun/assets/en-pause.svg';
import 'commun/styles/boutons.scss';

export default {
  components: {
    BoutonLecture,
  },
  props: {
    joueurConsigne: {
      type: Object,
      required: true
    },
    journal: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      traduction,
      play,
      enPause,
      $boutonRejoueConsigne: null,
      joueSon: false,
      nomTechnique: 'consigneDemarrage',
    };
  },
  methods: {
    definiNomTechnique () {
      this.nomTechnique = this.$depotRessources.consigneEnCours;
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
