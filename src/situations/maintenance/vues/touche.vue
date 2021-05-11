<template>
  <div class="touche">
    <span v-if="labelGauche">{{ labelGauche }}</span>
    <svg
      width="32"
      height="32"
      viewBox="0 0 28 28"
      fill="none"
      :transform="transformation"
      xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="2.14502" width="24.8325" height="23.58" rx="6.5" stroke="#1E416A" stroke-width="3"/>
      <path d="M20.8736 13.9349H7.82715M7.82715 13.9349L13.4185 8.95117M7.82715 13.9349L13.4185 18.9187" stroke="#1E416A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span v-if="label">{{ label }}</span>
  </div>
</template>

<script>

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
    }
  },

  computed: {
    transformation () {
      return `rotate(${this.rotation})`;
    }
  }
};
</script>
