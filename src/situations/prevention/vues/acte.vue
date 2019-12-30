<template>
  <div
    :style="{ 'background-image': `url(${fondSituation})` }"
    class="fond-situation"
  >
  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'securite/styles/acte.scss';

export default {
  computed: {
    ...mapState(['fondSituation'])
  }
};
</script>
