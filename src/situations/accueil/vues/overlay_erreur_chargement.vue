<template>
  <div class="conteneur">
    <div class="overlay opaque">
      <div class="bouton-centre-invisible">
        <a class="bouton-erreur-chargement" @click="reload">
          <img :src="recharge">
        </a>
      </div>
      <div class="message">{{ $traduction('situation.erreur_chargement') }}</div>
    </div>
  </div>
</template>

<script>
import 'commun/styles/action_overlay.scss';

import recharge from 'commun/assets/recharge.svg';

export default {
  data () {
    return {
      recharge
    };
  },

  methods: {
    reload () {
      window.location.reload();
    }
  }
};
</script>
