<template>
  <div :class="{'icone--desactivee':desactivee}">
    <div
      class="icone"
      :class="classIcone"
      :style="{ 'background-image': `url(${urlIcone(app)})` }"
    ></div>
    <span class="label">{{ $traduction(`objets_trouves.accueil.${app}`) }}</span>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

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
    ...mapGetters(['urlIcone']),

    classIcone () {
      return `icone--${this.app}`;
    }
  }
};
</script>
