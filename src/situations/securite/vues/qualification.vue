<template>
  <div
    :style="{ bottom: bottom, left: left, right: right }"
    class="qualification">
    <h3>{{ traduction('securite.danger.titre') }}</h3>
    <div class="qualification-input">
      <label>
        <input type="radio" name="danger" />
        {{ traduction('securite.danger.oui') }}
      </label>
    </div>
    <div class="qualification-input">
      <label>
        <input type="radio" name="danger" />
        {{ traduction('securite.danger.non') }}
      </label>
    </div>
    <button class="bouton-arrondi bouton-arrondi--petit">{{ traduction('securite.danger.bouton') }}</button>
  </div>
</template>

<script>
import 'securite/styles/qualification.scss';

export default {
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
