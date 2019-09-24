<template>
  <div
    :style="{ 'background-image': fondSituation }"
    class="fond-situation"
    ></div>
</template>

<script>
import 'securite/styles/situation.scss';

export default {
  data () {
    return {
      fondSituation: `url(${this.depotRessources.fondSituation().src})`
    };
  }
}
</script>
