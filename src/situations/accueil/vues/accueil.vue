<template>
  <div id="accueil" class="conteneur">
    <div class="titre">
      <h1>Compétences pro</h1>
      <boite-utilisateur />
    </div>
    <div
      :style="{ 'background-image': fondAccueil }"
      class="acces-situations">

      <progression />

      <div
        :style="{ 'background-image': personnages }"
        class="personnages"></div>

      <acces-situation
        v-for="situation in situations"
        :key="situation.identifiant"
        :situation="situation"
      />

      <formulaire-identification />
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
    return {
      fondAccueil: `url(${this.depotRessources.fondAccueil().src})`,
      personnages: `url(${this.depotRessources.personnages().src})`
    };
  },

  mounted: function() {
    if(this.estConnecte) this.$store.dispatch('synchroniseSituations');
  },

  computed: {
    ...mapState(['situations', 'estConnecte'])
  }
}
</script>
