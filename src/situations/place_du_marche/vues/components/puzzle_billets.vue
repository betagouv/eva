<template>
  <glisser-deposer :question="question"/>
</template>

<script>
import GlisserDeposer from 'commun/vues/components/glisser_deposer';

export default {
  components: { GlisserDeposer },

  props: {
    question: {
      type: Object,
      required: true
    },
  },

  data() {
    return {
      fragmentsClasses: [],
      fragmentsNonClasses: [...this.question.fragmentsNonClasses],
      nombreFragment: this.question.fragmentsNonClasses.length,
      affichePuzzleDroite: true
    };
  },

  methods: {
    envoiReponse() {
      const reponse = this.fragmentsClasses.map((fragment) => fragment.position);
      const succes = this.succes(reponse);
      const score = succes ? this.calculeScore(reponse) : 0;
      const scoreMax = this.nombreFragment + 1;
      this.affichePuzzleDroite = reponse.length < this.nombreFragment;
      this.$emit('reponse', { reponse, succes, score, scoreMax });
    },

    calculeScore(reponse) {
      const nombre_biens_places = reponse
        .map((position, i) => position === i ? 1 : 0)
        .reduce((somme, element) => somme + element, 0);

      let score = nombre_biens_places;
      if(nombre_biens_places >= 5) score++;
      return score;
    },

    succes(reponse) {
      return reponse.every((position, index) => position === index);
    }
  }
};
</script>
