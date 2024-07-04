<template>
  <div class="puzzle-container">
    <draggable
      class="puzzle-gauche"
      :list="fragmentsClasses"
      item-key="id"
      group="puzzle"
      draggable=".puzzle-item"
      @end="envoiReponse"
      :sort="true"
    >
      <template #item="{ element }">
        <div
          :key="element.id"
          class="puzzle-item"
        >
          <poignee-puzzle/>
          <span>{{element.contenu}}</span>
        </div>
      </template>
      <template #footer>
        <div v-if="affichePuzzleDroite"
            class="zone-de-depot">
            {{ $traduction('cafe_de_la_place.puzzle.texte_zone_depot') }}
        </div>
      </template>
    </draggable>
    <draggable
      v-if="affichePuzzleDroite"
      class="puzzle-droite"
      :list="fragmentsNonClasses"
      item-key="id"
      group="puzzle"
      @end="envoiReponse"
      :sort="false"
    >
      <template #item="{ element }">
        <div
          :key="element.id"
          class="puzzle-item"
        >
          <poignee-puzzle/>
          <span>{{element.contenu}}</span>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import 'cafe_de_la_place/styles/puzzle.scss';
import Draggable from 'vuedraggable';
import PoigneePuzzle from './poignee_puzzle';

export default {
  components: { Draggable, PoigneePuzzle },

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
