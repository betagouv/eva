<template>
  <div class="overlay opaque">
    <div class="bouton-centre-invisible">
      <a class="bouton-chargement">
        <img :src="chargement">
      </a>
    </div>
    <div class="message">{{ $traduction('situation.chargement') }}</div>
  </div>
</template>

<script>
import 'commun/styles/action_overlay.scss';

import chargement from 'commun/assets/chargement.svg';

export default {
  data () {
    return {
      chargement
    };
  }
};
</script>
