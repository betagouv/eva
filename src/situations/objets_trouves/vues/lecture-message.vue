<template>
  <div class="telephone-conteneur">
    <bouton-lecture
       class="bouton-lecture"
       :idQuestion="question.id"
       :class="classPositionBoutonLecture"
    />
  </div>
</template>

<script>
import BoutonLecture from 'objets_trouves/vues/bouton-lecture';
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
      return `bouton-lecture--${this.question.id}`;
    }
  }
};
</script>
