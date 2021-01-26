<template>
  <div class="overlay opaque overlay-action">
    <div class="bouton-centre-invisible">
      <a class="bouton-chargement">
        <img :src="chargement">
      </a>
    </div>
    <div class="overlay-action-message">{{ $traduction(`situation.${raison}`) }}</div>
  </div>
</template>

<script>
import 'commun/styles/overlay.scss';
import 'commun/styles/action_overlay.scss';
import 'commun/styles/chargement.scss';

import chargement from 'commun/assets/chargement.svg';

export default {
  props: {
    raison: {
      type: String,
      require: true
    }
  },

  data () {
    return {
      chargement
    };
  }
};
</script>
