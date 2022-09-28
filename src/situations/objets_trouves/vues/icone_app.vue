<template>
  <div :class="{'icone--desactivee':desactivee}">
    <button
      class="icone"
      :class="classIcone"
      :style="{ 'background-image': `url(${urlIcone(app)})` }"
      @click="$emit('ouvrirApp')"
    ></button>
    <span class="label">{{ $traduction(`objets_trouves.accueil.${app}`) }}</span>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  emits: ["ouvrirApp"],

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
