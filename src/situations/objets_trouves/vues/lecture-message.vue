<template>
  <div class="telephone-conteneur">
    <bouton-lecture
       class="bouton-lecture"
       :nomTechnique="question.audioRepondeur"
       :class="classPositionBoutonLecture"
    />
  </div>
</template>

<script>
import BoutonLecture from 'commun/vues/bouton_lecture';
import 'objets_trouves/styles/lecture-message.scss';

export default {
  components: { BoutonLecture },

  props: {
    question: {
      type: Object,
      required: true
    }
  },

  computed: {
    classPositionBoutonLecture () {
      return `bouton-lecture--${this.question.audioRepondeur}`;
    }
  }
};
</script>
