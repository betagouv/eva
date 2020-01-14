<template>
  <div class="action-prevention">
    <img
      :src="$depotRessources.risque21().src"
      :class="{ desactivee: survolDroite }"
      @mouseover="survolGauche = true"
      @mouseout="survolGauche = false"
    />
    <img
      :src="$depotRessources.risque22().src"
      :class="{ desactivee: survolGauche }"
      @mouseover="survolDroite = true"
      @mouseout="survolDroite = false"
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
