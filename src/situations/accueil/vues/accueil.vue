<template>
  <div id="accueil">
    <div class="titre">
      <h1>Compétences pro</h1>
      <boite-utilisateur />
    </div>
    <div
      :style="{ 'background-image': fondAccueil, 'background-position-x': position }"
      class="acces-situations">

      <div
        :style="{ 'background-image': personnages }"
        class="personnages"
        :class="[deplacePersonnage]"
      ></div>

      <acces-situation
        v-for="situation in situations"
        :key="situation.identifiant"
        :situation="situation"
      />

      <formulaire-identification :force-campagne="forceCampagne" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'accueil/styles/accueil.scss';
import FormulaireIdentification from './formulaire_identification';
import AccesSituation from 'accueil/vues/acces_situation';
import Progression from 'accueil/vues/progression';
import BoiteUtilisateur from 'commun/vues/boite_utilisateur';

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
    ...mapState(['situations', 'estConnecte'])
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
      if(this.estConnecte) this.$store.dispatch('synchroniseSituations');
    },

    deplacePersonnage () {
      if(this.$store.getters.niveauActuel > 1) return 'centre-personnage'
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
