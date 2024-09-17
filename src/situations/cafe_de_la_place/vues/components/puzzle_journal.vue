<template>
  <glisser-deposer
    :question="question"
    class="puzzle-container puzzle-journal"
    @deplace-item="envoiReponse"
    >
    <template #item="{ item }">
      <poignee-puzzle/>
      <span>{{ item.contenu }}</span>
    </template>
  </glisser-deposer>
</template>

<script>
import GlisserDeposer from 'commun/vues/components/glisser_deposer';
import PoigneePuzzle from './poignee_puzzle';
import 'cafe_de_la_place/styles/puzzle_journal.scss';

export default {
  components: { PoigneePuzzle, GlisserDeposer },

  props: {
    question: {
      type: Object,
      required: true
    },
  },

  methods: {
    envoiReponse(reponse) {
      if(reponse) {
        reponse.score = this.calculeScore(reponse.reponse);
      }
      this.$emit('reponse', reponse );
    },

    calculeScore(reponse) {
      const nombre_biens_places = reponse
        .map((position, i) => (position === (i + 1)) ? 1 : 0)
        .reduce((somme, element) => somme + element, 0);

      let score = nombre_biens_places;
      if(nombre_biens_places >= 5) score++;
      return score;
    },
  },
};
</script>
