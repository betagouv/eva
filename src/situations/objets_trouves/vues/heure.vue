<template>
  <span class="heure">{{ heure }}:{{ minute }}</span>
</template>

<script>
export default {
  data () {
    return {
      heure: '00',
      minute: '00'
    };
  },

  mounted () {
    this.metsAJour();
    this.interval = setInterval(this.metsAJour, 60 * 1000);
  },

  beforeDestroy () {
    clearInterval(this.interval);
  },

  methods: {
    metsAJour () {
      const date = new Date();
      this.heure = date.getHours().toString().padStart(2, 0);
      this.minute = date.getMinutes().toString().padStart(2, 0);
    }
  }
};
</script>
