<template>
  <div id="accueil">
    <div
      v-if="chargement || erreurChargement || erreurLectureSon"
      class="conteneur"
    >
      <overlay-erreur-lecture-son v-if="erreurLectureSon" />
      <overlay-erreur-chargement v-else-if="erreurChargement" />
      <overlay-attente v-else raison='chargement' />
    </div>
    <accueil :force-campagne="forceCampagne" :force-nom="forceNom" v-else />
  </div>
</template>

<script>
import queryString from 'query-string';
import OverlayAttente from 'commun/vues/overlay_attente';
import OverlayErreurChargement from 'commun/vues/overlay_erreur_chargement';
import OverlayErreurLectureSon from 'accueil/vues/overlay_erreur_lecture_son';
import Accueil from './accueil';

export default {
  components: { Accueil, OverlayAttente, OverlayErreurChargement, OverlayErreurLectureSon },

  data () {
    const parametresUrl = queryString.parse(location.search);

    return {
      chargement: true,
      erreurChargement: false,
      erreurLectureSon: false,
      forceCampagne: parametresUrl.code || '',
      forceNom: parametresUrl.nom || ''
    };
  },

  mounted () {
    this.$depotRessources.chargement().then(() => {
      this.chargement = false;
    }).catch((erreur) => {
      if(erreur.message.includes('Unable to decode audio data') ||
         erreur.message.includes('decodeAudioData')) {
        this.erreurLectureSon = true;
      }
      else {
        this.erreurChargement = true;
        console.error(erreur);
      }
    });
  }
};
</script>
