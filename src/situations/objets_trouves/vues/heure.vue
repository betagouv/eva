<template>
  <span class="heure">{{ heure }}:{{ minute }}</span>
</template>

<script>
export default {
  data () {
    return {
      heure: '13',
      minute: '00'
    };
  }
};
</script>
