<template>
  <div>
    <button @click="basculeJoueSon">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          v-if="joueSon"
          class="bouton-pause"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM9 16.5V8H11V16.5H9ZM13 16.5V8H15V16.5H13Z"
          fill="#6E84FE"
        />
        <path
          v-else
          class="bouton-lecture"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM16 11.9091L10 7V17L16 11.9091Z"
          fill="#6E84FE"
        />
      </svg>
    </button>
    <audio ref="audio" :src="sonMessage" />
  </div>
</template>

<script>

export default {
  props: {
    sonMessage: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      joueSon: false
    };
  },

  methods: {
    basculeJoueSon () {
      this.joueSon = !this.joueSon;
    }
  },

  watch: {
    joueSon (val) {
      if (val) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    }
  }
};
</script>
