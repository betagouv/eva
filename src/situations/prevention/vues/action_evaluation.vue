<template>
  <div class="overlay-zone-evaluation">
    <div
      class="overlay-zone-evaluation-action"
      @click="clickSurPanneau"
    >
      <img :src="$depotRessources.ok().src" />
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
      >
        <circle r="28" cx="32" cy="32" class="overlay-zone-action-hover" />
      </svg>
    </div>

    <div
      class="overlay-zone-evaluation-action"
      @click="clickSurPanneau"
    >
      <img :src="$depotRessources.danger().src" />
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
      >
        <path d="m 22.588592,10.637193 c 4.182358,-7.2440976 14.638801,-7.2440976 18.821159,0 l 18.350658,31.783321 c 4.18236,7.244098 -2.228115,16.299141 -9.41036,16.299141 H 13.64982 c -6.9457511,0 -13.59239601,-9.055043 -9.4103629,-16.299141 z" class="overlay-zone-action-hover" />
      </svg>
    </div>

    <div
      class="overlay-zone-evaluation-action"
      @click="clickSurPanneau"
    >
      <img :src="$depotRessources.urgence().src" />
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
      >
        <path d="m 22.588592,10.637193 c 4.182358,-7.2440976 14.638801,-7.2440976 18.821159,0 l 18.350658,31.783321 c 4.18236,7.244098 -2.228115,16.299141 -9.41036,16.299141 H 13.64982 c -6.9457511,0 -13.59239601,-9.055043 -9.4103629,-16.299141 z" class="overlay-zone-action-hover" />
      </svg>
    </div>
  </div>
</template>

<script>
import 'prevention/styles/action_evaluation.scss';

export default {
  methods: {
    clickSurPanneau () {
      this.$emit('click');
    }
  }
};
</script>
