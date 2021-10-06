<template>
  <div id="accueil">
    <div
      v-if="chargement || erreurChargement"
      class="conteneur"
    >
      <overlay-erreur-chargement v-if="erreurChargement" />
      <overlay-attente v-else-if="chargement" raison='chargement' />
    </div>
    <accueil :force-campagne="forceCampagne" :force-nom="forceNom" v-else />
  </div>
</template>

<script>
import queryString from 'query-string';
import OverlayAttente from 'commun/vues/overlay_attente';
import OverlayErreurChargement from 'commun/vues/overlay_erreur_chargement';
import Accueil from './accueil';

export default {
  components: { Accueil, OverlayAttente, OverlayErreurChargement },

  data () {
    const parametresUrl = queryString.parse(location.search);

    return {
      chargement: true,
      erreurChargement: false,
      forceCampagne: parametresUrl.code || '',
      forceNom: parametresUrl.nom || ''
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
