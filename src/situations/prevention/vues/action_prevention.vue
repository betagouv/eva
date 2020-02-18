<template>
  <div class="action-prevention">
    <img
      :src="$depotRessources.prevention(zone.action_prevention[0].image)"
      :class="{ desactivee: survolDroite }"
      @mouseover="survolGauche = true"
      @mouseout="survolGauche = false"
      @click="$emit('selectionPrevention', zone.action_prevention[0].type)"
    />
    <img
      :src="$depotRessources.prevention(zone.action_prevention[1].image)"
      :class="{ desactivee: survolGauche }"
      @mouseover="survolDroite = true"
      @mouseout="survolDroite = false"
      @click="$emit('selectionPrevention', zone.action_prevention[1].type)"
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
