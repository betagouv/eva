<template>
  <span>
    <svg
      :class="{ enTrainDeJouer: enTrainDeJouer, 'selectionne' : joueSon }"
      width="34"
      height="32"
      viewBox="0 0 34 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="16" fill="#6E84FE"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.15526 20.8669H5C4.44772 20.8669 4 20.4192 4 19.8669V12.8669C4 12.3146 4.44772 11.8669 5 11.8669H9.11647C9.17663 11.7534 9.25878 11.6512 9.35982 11.567L13.3598 8.23369C14.0111 7.69092 15 8.15407 15 9.00191V22.9984C15 23.797 14.1099 24.2734 13.4453 23.8304L9.4453 21.1637C9.32715 21.085 9.22904 20.9833 9.15526 20.8669Z" fill="white"/>
      <path class="son1" fill-rule="evenodd" clip-rule="evenodd" d="M18.5174 10.5178C19.1032 9.93198 20.0529 9.93198 20.6387 10.5178C21.3586 11.2377 21.9297 12.0924 22.3194 13.033L21.0185 13.5719L22.3194 13.033C22.709 13.9737 22.9095 14.9819 22.9095 16C22.9095 17.0181 22.709 18.0263 22.3194 18.967C21.9297 19.9076 21.3586 20.7623 20.6387 21.4822C20.0529 22.068 19.1032 22.068 18.5174 21.4822C17.9316 20.8964 17.9316 19.9467 18.5174 19.3609C18.9587 18.9195 19.3089 18.3956 19.5477 17.8189C19.7866 17.2422 19.9095 16.6242 19.9095 16C19.9095 15.3758 19.7866 14.7578 19.5477 14.1811L20.9335 13.6071L19.5477 14.1811C19.3089 13.6044 18.9587 13.0804 18.5174 12.6391C17.9316 12.0533 17.9316 11.1036 18.5174 10.5178Z" fill="white"/>
      <path class="son2" fill-rule="evenodd" clip-rule="evenodd" d="M22.0174 7.01777C22.6032 6.43198 23.5529 6.43198 24.1387 7.01777C25.3183 8.19733 26.254 9.59768 26.8923 11.1388C27.5307 12.68 27.8593 14.3318 27.8593 16C27.8593 17.6682 27.5307 19.32 26.8923 20.8611C26.254 22.4023 25.3183 23.8027 24.1387 24.9822C23.5529 25.568 22.6032 25.568 22.0174 24.9822C21.4316 24.3964 21.4316 23.4467 22.0174 22.8609C22.9184 21.9599 23.6331 20.8903 24.1207 19.7131C24.6083 18.5359 24.8593 17.2742 24.8593 16C24.8593 14.7258 24.6083 13.4641 24.1207 12.2869C23.6331 11.1097 22.9184 10.0401 22.0174 9.13909C21.4316 8.5533 21.4316 7.60355 22.0174 7.01777Z" fill="white"/>
    </svg>
  </span>
</template>

<script>
import 'commun/styles/reponse_audio_qcm.scss';
import JoueurAudioBuffer from 'commun/composants/joueur_audio_buffer';

export default {
  props: {
    questionnaire: {
      type: String,
      required: true
    },
    idReponse: {
      type: Number,
      required: false
    },
    joueSon: {
      type: Boolean,
      required: true
    }
  },

  data () {
    return {
      enTrainDeJouer: false,
      joueurSon: new JoueurAudioBuffer()
    };
  },

  watch: {
    joueSon (joue) {
      this.enTrainDeJouer = joue;
      if (joue) {
        this.joueurSon.start(this.audioBuffer(this.questionnaire, this.idReponse),
          () => { this.enTrainDeJouer = false; });
      } else {
        this.joueurSon.stop();
      }
    }
  },

  methods: {
    audioBuffer (nomQuestionnaire, idReponse) {
      return this.$depotRessources.reponseAudio(nomQuestionnaire, idReponse);
    }
  }

};
</script>
