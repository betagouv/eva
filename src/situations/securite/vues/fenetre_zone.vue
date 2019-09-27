<template>
  <div
    :style="{ bottom: bottom, left: left, right: right }"
    class="fenetre-zone">
    <identification-danger/>
  </div>
</template>

<script>
import 'securite/styles/fenetre_zone.scss';
import IdentificationDanger from './identification_danger';

export default {
  components: {
    IdentificationDanger
  },

  props: {
    zone: {
      type: Object,
      required: true
    }
  },

  methods: {
    formatePourcentage (pourcentage) {
      return `${pourcentage}%`;
    }
  },

  computed: {
    bottom () {
      return this.formatePourcentage((100 - this.zone.y + Math.sin(Math.PI / 4) * this.zone.r).toFixed(1));
    },
    left () {
      if (this.zone.x >= 80) return undefined;
      return this.formatePourcentage((this.zone.x + Math.cos(Math.PI / 4) * this.zone.r).toFixed(1));
    },
    right () {
      if (this.zone.x < 80) return undefined;
      return this.formatePourcentage((100 - (this.zone.x + Math.cos(3 * Math.PI / 4) * this.zone.r)).toFixed(1));
    }
  }
}
</script>
