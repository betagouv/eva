<template>
  <div :class="{'icone--desactivee':desactivee}">
    <div
      class="icone"
      :class="icone(app)"
      :style="{ 'background-image': `url(${appAttributes(app).icone})` }"
    ></div>
    <span class="label">{{ $traduction(`objets_trouves.accueil.${app}`) }}</span>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: {
    app: {
      type: String,
      required: true
    },
    desactivee: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    ...mapState(['apps'])
  },

  methods: {
    appAttributes (app) {
      return Object.assign({}, this.apps)[app][0];
    },
    icone (app) {
      return `icone--${app}`;
    }
  }
};
</script>
