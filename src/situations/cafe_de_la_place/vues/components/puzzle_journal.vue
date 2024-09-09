<template>
  <glisser-deposer
    :question="question"
    class="puzzle-container puzzle-journal"
    @reponse="envoiReponse"
    >
    <template #item="{ item }">
      <poignee-puzzle/>
      <span>{{ item.contenu }}</span>
    </template>
    <template #footer>
      <div v-if="afficheAideDepot"
            class="aide-depot">
            {{ $traduction('cafe_de_la_place.puzzle.texte_zone_depot') }}
        </div>
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

  data() {
    return {
      afficheAideDepot: true
    };
  },

  methods: {
    envoiReponse(reponse) {
      if(reponse) {
        this.afficheAideDepot = reponse.reponse.length < this.question.fragmentsNonClasses.length;
      }
      this.$emit('reponse', reponse );
    }
  },
};
</script>
