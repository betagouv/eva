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
  </div>
</template>

<script>
import JoueurAudioBuffer from 'commun/composants/joueur_audio_buffer';

export default {
  props: {
    question: {
      type: Object,
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

    audioBuffer (nomTechniqueQuestion) {
      return this.$depotRessources.messageAudio(nomTechniqueQuestion);
    }
  },

  watch: {
    joueSon (joue) {
      if (joue) {
        this.joueurSon.start(this.audioBuffer(this.question.nom_technique), () => { this.joueSon = false; });
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
