<template>
  <div id="accueil">
    <div class="titre">
      <h1>Compétences pro</h1>
      <boite-utilisateur />
    </div>
    <div
      :style="{ 'background-image': fondAccueil, 'background-position-x': position }"
      class="accueil-scene">

      <div
        :style="{ 'background-image': personnages }"
        class="personnages"
        :class="[deplacePersonnage]"
      ></div>

      <div
        :style="{ transform: `translateX(${-decalageGaucheVue(niveauActuel)}px)`}"
        class="acces-situations">
        <acces-situation
          v-for="(situation, index) in situations"
          :key="situation.identifiant"
          :situation="situation"
          :style="{ left: `${decalageGaucheBatiment(index)}px`}"
         />
      </div>

      <formulaire-identification :force-campagne="forceCampagne" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import 'accueil/styles/accueil.scss';
import FormulaireIdentification from './formulaire_identification';
import AccesSituation from 'accueil/vues/acces_situation';
import Progression from 'accueil/vues/progression';
import BoiteUtilisateur from 'commun/vues/boite_utilisateur';

const LARGEUR_SCENE = 1008;
const LARGEUR_BATIMENT = 411;
const DECALAGE_INITIAL = LARGEUR_SCENE / 2 - LARGEUR_BATIMENT / 2;
const ESPACEMENT_BATIMENT = (LARGEUR_SCENE - 1.5 * LARGEUR_BATIMENT) / 2;

export default {
  components: { FormulaireIdentification, AccesSituation, Progression, BoiteUtilisateur },

  data() {
    const parsedUrl = new URL(window.location.href);
    return {
      fondAccueil: `url(${this.depotRessources.fondAccueil().src})`,
      personnages: `url(${this.depotRessources.personnages().src})`,
      forceCampagne: parsedUrl.searchParams.get('code') || '',
      deplacePersonnage: this.deplacePersonnage(),
      position: this.deplacefond()
    };
  },


  computed: {
    ...mapState(['situations', 'estConnecte']),
    ...mapGetters(['niveauActuel'])
  },

  mounted () {
    this.synchroniseSituations();
  },

  watch: {
    estConnecte () {
      this.synchroniseSituations();
    }
  },

  methods: {
    synchroniseSituations () {
      if (this.estConnecte) this.$store.dispatch('synchroniseSituations');
    },

    deplacePersonnage () {
      if (this.$store.getters.niveauActuel > 1) return 'centre-personnage'
    },

    decalageGaucheBatiment (index) {
      return DECALAGE_INITIAL + index * (LARGEUR_BATIMENT + ESPACEMENT_BATIMENT);
    },

    decalageGaucheVue (niveau) {
      return (niveau - 1) * (LARGEUR_BATIMENT + ESPACEMENT_BATIMENT);
    },

    deplacefond () {
      switch (this.$store.getters.niveauActuel) {
        case 1:
          return '0px'
        case 2:
          return '-12.5rem'
        case 3:
          return '-25rem'
        case 4:
          return '-37.5rem'
      }
    }
  }
}
</script>
