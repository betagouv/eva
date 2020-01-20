<template>
  <div class="action-prevention">
    <img
      :src="$depotRessources.risque21().src"
      :class="{ desactivee: survolDroite }"
      @mouseover="survolGauche = true"
      @mouseout="survolGauche = false"
      @click="$emit('click')"
    />
    <img
      :src="$depotRessources.risque22().src"
      :class="{ desactivee: survolGauche }"
      @mouseover="survolDroite = true"
      @mouseout="survolDroite = false"
      @click="$emit('click')"
    />
  </div>
</template>

<script>
import 'prevention/styles/action_prevention.scss';

export default {
  data () {
    return {
      survolGauche: false,
      survolDroite: false
    };
  }
};
</script>
