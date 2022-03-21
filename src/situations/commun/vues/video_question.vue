<template>
  <video v-if="afficheVideo" loop autoplay="true" class="question-video">
    <source :src="source" type="video/mp4">
  </video>
</template>

<script>
import { estMobile } from 'commun/helpers/mobile';

export default {
  props: {
    nomTechnique: {
      type: String,
      required: false
    }
  },

  data() {
    return { estMobile };
  },

  computed: {
    afficheVideo () {
      return !this.estMobile && this.$depotRessources.existeMessageVideo(this.nomTechnique);
    },

    source () {
      return window.URL.createObjectURL(this.$depotRessources.messageVideo(this.nomTechnique));
    }
  },

  destroyed () {
    if(this.afficheVideo) {
      window.URL.revokeObjectURL(this.source);
    }
  }
};
</script>
