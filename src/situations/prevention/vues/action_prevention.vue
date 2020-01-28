<template>
  <div class="action-prevention">
    <img
      :src="$depotRessources.prevention(zone.images_prevention[0])"
      :class="{ desactivee: survolDroite }"
      @mouseover="survolGauche = true"
      @mouseout="survolGauche = false"
      @click="$emit('selectionPrevention')"
    />
    <img
      :src="$depotRessources.prevention(zone.images_prevention[1])"
      :class="{ desactivee: survolGauche }"
      @mouseover="survolDroite = true"
      @mouseout="survolDroite = false"
      @click="$emit('selectionPrevention')"
    />
  </div>
</template>

<script>
import 'prevention/styles/action_prevention.scss';

export default {
  props: {
    zone: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      survolGauche: false,
      survolDroite: false
    };
  }
};
</script>
