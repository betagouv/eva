<template>
  <div class="overlay opaque overlay-action">
    <div class="bouton-centre-invisible">
      <a class="bouton-erreur-chargement" @click="reload">
        <img :src="recharge">
      </a>
    </div>
    <div class="overlay-action-message">{{ $traduction('situation.erreur_chargement') }}</div>
  </div>
</template>

<script>
import 'commun/styles/overlay.scss';
import 'commun/styles/action_overlay.scss';
import 'commun/styles/erreur_chargement.scss';

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
