<template>
  <div id="accueil">
    <div class="titre">
      <h1>{{ $traduction('nom_produit') }}</h1>
      <boite-utilisateur v-if="!chargement" />
    </div>
    <overlay-erreur-chargement v-if="erreurChargement" />
    <overlay-chargement v-else-if="chargement" />
    <accueil v-else />
  </div>
</template>

<script>
import BoiteUtilisateur from 'commun/vues/boite_utilisateur';
import OverlayChargement from './overlay_chargement';
import OverlayErreurChargement from './overlay_erreur_chargement';
import Accueil from './accueil';

export default {
  components: { Accueil, BoiteUtilisateur, OverlayChargement, OverlayErreurChargement },

  data () {
    return {
      chargement: true,
      erreurChargement: false
    };
  },

  mounted () {
    this.$depotRessources.chargement().then(() => {
      this.chargement = false;
    }).catch(() => {
      this.erreurChargement = true;
    });
  }
};
</script>
