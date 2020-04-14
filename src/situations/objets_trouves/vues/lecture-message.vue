<template>
  <div class="telephone-conteneur">
    <bouton-lecture
      :son-message="$depotRessources.messageAudio(question.id)"
    />
  </div>
</template>

<script>
import BoutonLecture from 'objets_trouves/vues/bouton-lecture';

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
