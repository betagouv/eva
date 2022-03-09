<template>
  <video v-if="afficheVideo" loop autoplay="true" class="question-video">
    <source :src="source" type="video/mp4">
  </video>
</template>

<script>

export default {
  props: {
    nomTechnique: {
      type: String,
      required: false
    }
  },

  computed: {
    afficheVideo () {
      return this.$depotRessources.existeMessageVideo(this.nomTechnique);
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
