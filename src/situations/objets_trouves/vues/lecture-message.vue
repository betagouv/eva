<template>
  <div class="telephone-conteneur">
    <bouton-lecture
      :son-message="$depotRessources.messageAudio(question.id)"
       class="bouton-lecture bouton-lecture--question-1"
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
  }
};
</script>
