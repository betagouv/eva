<template>
  <div class="defi-ecoute">
    <bouton-lecture
      :nomTechnique="question.reponse"
      :avecTexte="true"
    />
  </div>
</template>

<script>
import 'commun/styles/defi/ecoute.scss';
import BoutonLecture from 'commun/vues/bouton_lecture';

export default {
  components: { BoutonLecture },

  props: {
    question: {
      type: Object,
      required: true
    }
  },
};
</script>
