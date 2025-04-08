<template>
  <div class="telephone-conteneur">
    <bouton-lecture-avec-depot-ressources
       class="bouton-lecture"
       :nomTechnique="question.audioRepondeur"
       :class="classPositionBoutonLecture"
    />
  </div>
</template>

<script>
import BoutonLectureAvecDepotRessources from 'commun/vues/bouton_lecture_avec_depot_ressources';
import 'objets_trouves/styles/lecture-message.scss';

export default {
  components: { BoutonLectureAvecDepotRessources },

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
