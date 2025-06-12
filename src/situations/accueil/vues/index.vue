<template>
  <div id="accueil">
    <div
      v-if="estSmartphone && afficheErreurSmartphone && !estConnecte && !evaluationTerminee"
      class="conteneur"
      style="position: absolute;"
    >
      <overlay-erreur
        :titre="$traduction('situation.erreur_utilisation_smartphone.titre')"
        :description="$traduction('situation.erreur_utilisation_smartphone.description')"
        :action="$traduction('situation.erreur_utilisation_smartphone.action')"
        :boutonIgnorer="true"
        @ignoreErreur="afficheErreurSmartphone = false"/>
    </div>
    <div
      v-if="chargement || erreurChargement || erreurLectureSon"
      class="conteneur"
    >
      <overlay-erreur
        v-if="erreurLectureSon"
        :titre="$traduction('situation.erreur_lecture_son.titre')"
        :description="$traduction('situation.erreur_lecture_son.description')"
        :action="$traduction('situation.erreur_lecture_son.action')" />
      <overlay-erreur-chargement v-else-if="erreurChargement" />
      <overlay-attente v-else raison='chargement' />
    </div>
    <accueil :force-campagne="forceCampagne" :force-nom="forceNom" :force-code-personnel="forceCodePersonnel" v-else style="z-index: 0;"/>
  </div>
</template>

<script>
import queryString from 'query-string';
import OverlayAttente from 'commun/vues/overlay_attente';
import OverlayErreurChargement from 'commun/vues/overlay_erreur_chargement';
import OverlayErreur from 'accueil/vues/overlay_erreur';
import Accueil from './accueil';
import { estSmartphone } from 'commun/helpers/mobile';
import { mapState } from 'vuex';

export default {
  components: { Accueil, OverlayAttente, OverlayErreurChargement, OverlayErreur },

  props: {
    estSmartphone: {
      type: Boolean,
      required: false,
      default: estSmartphone
    }
  },

  data () {
    const parametresUrl = queryString.parse(location.search);

    return {
      chargement: true,
      erreurChargement: false,
      erreurLectureSon: false,
      forceCampagne: parametresUrl.code || '',
      forceNom: parametresUrl.nom || '',
      forceCodePersonnel: parametresUrl.codePersonnel || '',
      afficheErreurSmartphone: false
    };
  },

  computed: {
    ...mapState(['estConnecte', 'evaluationTerminee'])
  },

  mounted () {
    if(this.estSmartphone) {
      this.afficheErreurSmartphone = true;
    }
    this.$depotRessources.chargement().then(() => {
      this.chargement = false;
    }).catch((erreur) => {
      if(erreur.message &&
        (erreur.message.includes('Unable to decode audio data') ||
         erreur.message.includes('decodeAudioData'))) {
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
