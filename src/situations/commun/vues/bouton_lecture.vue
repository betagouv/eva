<template>
  <div>
    <button @click="basculeJoueSon">
      <svg
        v-if="joueSon"
        class="icone-pause"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM9 16.5V8H11V16.5H9ZM13 16.5V8H15V16.5H13Z"
          fill="#6E84FE"
        />
      </svg>
      <svg
        v-else
        class="icone-lecture"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10" cy="10" fill="#6e84fe" r="10"/>
        <path d="M14 8.701c1 .577 1 2.02 0 2.598l-5.813 3.356a1.5 1.5 0 0 1-2.25-1.3v-6.71a1.5 1.5 0 0 1 2.25-1.3z" fill="#fff"/>
      </svg>
    </button>
  </div>
</template>

<script>
import JoueurAudioBuffer from 'commun/composants/joueur_audio_buffer';

export default {
  props: {
    nomTechnique: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      joueSon: false,
      joueurSon: new JoueurAudioBuffer()
    };
  },

  methods: {
    basculeJoueSon () {
      this.joueSon = !this.joueSon;
    },

    audioBuffer (nomTechnique) {
      return this.$depotRessources.messageAudio(nomTechnique);
    }
  },

  watch: {
    joueSon (joue) {
      if (joue) {
        this.joueurSon.start(this.audioBuffer(this.nomTechnique), () => { this.joueSon = false; });
      } else {
        this.joueurSon.stop();
      }
    }
  },

  beforeDestroy: function () {
    this.joueurSon.stop();
  }
};
</script>
