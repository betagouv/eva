<template>
  <div ref="boutonRejoueConsigne">
    <BoutonLecture 
      :nomTechnique="nomTechnique"
      @click="definiNomTechnique()"
      @son-en-cours="enregistrerEvenement"
      :avecEtiquette="true"
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
      nomTechnique: null,
    };
  },
  methods: {
    affiche(pointInsertion) {
      this.$boutonRejoueConsigne = this.$refs.boutonRejoueConsigne;
      this.pointInsertion = pointInsertion;
      this.$el.append(this.$boutonRejoueConsigne);
      this.$refs.vueBoutonLire.affiche(this.$boutonRejoueConsigne);
    },
    cache() {
      this.$refs.vueBoutonLire.cache();
      this.$refs.vueBoutonArret.cache();
    },
    litConsigne() {
      this.journal.enregistre(new EvenementRejoueConsigne());
      this.joueSon = true;
      this.joueurConsigne.joue(this.lectureTerminee);
    },
    arreteConsigne() {
      this.joueurConsigne.stop();
      this.joueSon = false;
    },
    lectureTerminee() {
      this.joueSon = false;
    },
    definiNomTechnique () {
      this.nomTechnique = this.$depotRessources.consigneEnCours;
    },
    enregistrerEvenement() {
      this.journal.enregistre(new EvenementRejoueConsigne());
    }
  },
};
</script>
