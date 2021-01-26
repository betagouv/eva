<template>
  <div id="accueil">
    <div class="titre">
      <img class="logo" :alt="altLogo" :src="logo"/>
      <boite-utilisateur v-if="!chargement" />
    </div>
    <div
      v-if="chargement || erreurChargement"
      class="conteneur"
    >
      <overlay-erreur-chargement v-if="erreurChargement" />
      <overlay-attente v-else-if="chargement" raison='chargement' />
    </div>
    <accueil v-else />
  </div>
</template>

<script>
import { traduction } from 'commun/infra/internationalisation';
import BoiteUtilisateur from 'commun/vues/boite_utilisateur';
import OverlayAttente from 'commun/vues/overlay_attente';
import OverlayErreurChargement from 'commun/vues/overlay_erreur_chargement';
import Accueil from './accueil';
import logo from '../../../public/logo.svg';

export default {
  components: { Accueil, BoiteUtilisateur, OverlayAttente, OverlayErreurChargement },

  data () {
    return {
      chargement: true,
      erreurChargement: false,
      logo,
      altLogo: traduction('alt-logo')
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
