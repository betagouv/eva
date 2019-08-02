<template>
  <div
    :style="{ 'background-image': backgroundImage }"
    class="progression"
  ></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['niveauActuel']),

    backgroundImage() {
      return `url('${this.depotRessources.progression(this.niveauActuel).src}')`;
    }
  }
}
</script>
