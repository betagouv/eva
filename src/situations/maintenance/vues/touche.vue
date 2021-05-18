<template>
  <div
    :class="couleur"
    class="touche"
    >
    <span v-if="labelGauche" class="label-gauche" >{{ labelGauche }}</span>
    <svg
      width="32"
      height="32"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect
      :transform="transformation"
      width="24" height="24"
      x="2" y="2"
      rx="6.5"
      stroke="#1E416A" stroke-width="3"/>
      <path
      :transform="transformation"
      d="M20.8736 13.9349H7.82715M7.82715 13.9349L13.4185 8.95117M7.82715 13.9349L13.4185 18.9187"
      stroke="#1E416A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span v-if="label" class="label-droite" >{{ label }}</span>
  </div>
</template>

<script>
import 'maintenance/styles/touche.scss';

export default {
  props: {
    labelGauche: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    rotation: {
      type: Number,
      required: false
    },
    couleur: {
      type: String,
      required: false
    }
  },

  computed: {
    transformation () {
      return `rotate(${this.rotation},14,14)`;
    }
  }
};
</script>
