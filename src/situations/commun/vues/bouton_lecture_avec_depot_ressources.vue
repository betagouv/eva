<template>
  <BoutonLecture
    ref="boutonLecture"
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
  },
};
</script>
