<template>
  <BoutonLecture
    ref="boutonLecture"
    :audioSource="audioSource"
    :avecTexte="avecTexte"
    :nomTechnique="nomTechnique"
  />
</template>

<script>
import BoutonLecture from './bouton_lecture.vue';

export default {
  components: {
    BoutonLecture
  },
  
  props: {
    nomTechnique: {
      type: String,
      required: true
    },
    avecTexte: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      joueSon: false
    };
  },

  methods: {
    demarreSon(callbackFin) {
      this.$refs.boutonLecture.demarreSon(callbackFin);
    },
    audioSource() {
      return this.$depotRessources.messageAudio(this.nomTechnique);
    },
  },
};
</script>
