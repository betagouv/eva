<template>
  <div
    v-if="ecran == 'intro'"
    class="overlay modale"
    tabindex="0"
    @keydown.s="fini"
  >
    <div
      class="modale-interieur"
    >
      <h2>{{ titre }}</h2>
      <p class="icone-description">
        <img
          :src="casque"
          class="icone-description-icone"
        >
        <span>{{ $traduction('accueil.intro_consigne.message') }}</span>
      </p>
      <button
        class="bouton-arrondi"
        @click="afficheContexte"
      >{{ $traduction('accueil.intro_consigne.bouton') }}</button>
    </div>
  </div>
  <consigne
    v-else
    :identifiantSituation="identifiantSituation"
    :message="message"
    ressourceConsigne="consigneDemarrage"
    @consigne-fini="fini"
  >
  </consigne>
</template>

<script>
import 'commun/styles/modale.scss';
import Consigne, { CONSIGNE_FINI } from 'commun/vues/consigne';
import { traduction } from 'commun/infra/internationalisation';

export default {
  components: { Consigne },
  props: {
    titre: {
      type: String,
      default: () => {
        return traduction('situation.ecouter-consigne');
      }
    },
    identifiantSituation: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      ecran: 'intro',
      casque: this.$depotRessources.casque().src,
      message: traduction(`${this.identifiantSituation}.intro_contexte.message`)
    };
  },

  methods: {
    afficheContexte () {
      this.ecran = 'consigne';
    },

    fini () {
      this.$emit(CONSIGNE_FINI);
    }
  }
};
</script>
