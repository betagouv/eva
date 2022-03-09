<template>
    <button
      class="bouton-lecture"
      @click="basculeJoueSon"
      :class="{
               'bouton-arrondi bouton-lecture--avec-texte': this.avecTexte,
               'bouton-lecture--sans-texte': !this.avecTexte,
               'bouton-lecture--pause': this.joueSon
      }"
    >
      <svg
        v-if="joueSon"
        class="icone-pause"
        width="10"
        height="10"
        viewBox="0 0 6 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 1C2 0.447715 1.55228 0 1 0C0.447715 0 0 0.447715 0 1V8.97872C0 9.53101 0.447715 9.97872 1 9.97872C1.55228 9.97872 2 9.53101 2 8.97872V1Z" fill="white"/>
        <path d="M6 1.01978C6 0.467491 5.55228 0.0197754 5 0.0197754C4.44772 0.0197754 4 0.467491 4 1.01978V8.9985C4 9.55078 4.44772 9.9985 5 9.9985C5.55228 9.9985 6 9.55078 6 8.9985V1.01978Z" fill="white"/>
      </svg>
      <svg
        v-else
        class="icone-lecture"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9 3.70096C10 4.27831 10 5.72169 9 6.29904L3.1875 9.65489C2.1875 10.2322 0.9375 9.51055 0.937501 8.35585L0.937501 1.64415C0.937501 0.489454 2.1875 -0.232237 3.1875 0.345113L9 3.70096Z" fill="white"/>
      </svg>
      <span v-if="avecTexte" class="bouton-lecture-texte">{{$traduction(texteBouton)}}</span>
    </button>
</template>

<script>
import JoueurAudioBuffer from 'commun/composants/joueur_audio_buffer';

export default {
  props: {
    nomTechnique: {
      type: String,
      required: true
    },
    avecTexte: {
      type: Boolean,
      default: false,
      required: false
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

    demarreSon () {
      this.joueSon = true;
    },

    coupeSon () {
      this.joueSon = false;
    },

    audioBuffer (nomTechnique) {
      return this.$depotRessources.messageAudio(nomTechnique);
    }
  },

  watch: {
    joueSon (joue) {
      if (joue) {
        this.joueurSon.start(this.audioBuffer(this.nomTechnique), () => { this.coupeSon(); });
      } else {
        this.joueurSon.stop();
      }
    },
  },

  computed: {
    texteBouton () {
      return this.joueSon === true ? 'bouton_lecture.pause' : 'bouton_lecture.lecture';
    }
  },

  beforeDestroy: function () {
    this.joueurSon.stop();
  }
};
</script>
