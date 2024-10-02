<template>
    <div v-html="svgDecode" class="zone-cliquable" @click="selectionneReponse" />
</template>

<script>
import 'commun/styles/clic_dans_image.scss';
import { decodeBase64FromDataUrl, parseSvgFromBase64Url } from 'commun/helpers/decoders';

export default {
  props: {
    question: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      bonneReponse: false,
    };
  },

  methods: {
    selectionneReponse(event) {
      if (event.target.tagName !== 'svg') {
        this.deselectionneAncienneReponse();
        this.selectionneNouvelleReponse(event.target);
      }
    },

    deselectionneAncienneReponse() {
      const reponseDejaSelectionnee = document.querySelector('.reponse--selectionnee');
      if (reponseDejaSelectionnee) {
        reponseDejaSelectionnee.classList.remove('reponse--selectionnee');
      }
    },

    selectionneNouvelleReponse(reponse) {
      reponse.classList.add('reponse--selectionnee');
      this.bonneReponse = reponse.classList.contains('bonne-reponse');
      this.envoiReponse(this.bonneReponse);
    },

    envoiReponse(succes) {
      const reponse = reponse;
      const score = succes ? this.question.score : 0;
      const scoreMax = this.question.score;
      this.$emit('reponse', { reponse, succes, score, scoreMax } );
    },

  },
  computed: {
    svgDecode() {
      if (!this.question.zone_cliquable) {
        return '';
      }
      return atob(this.question.zone_cliquable.split(',')[1]);
    }
  }
};
</script>
