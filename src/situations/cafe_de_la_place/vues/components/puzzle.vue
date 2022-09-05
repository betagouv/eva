<template>
  <div class="puzzle-container">
    <draggable
        class="puzzle-gauche"
        v-model="fragmentsClasses"
        item-key="id"
        group="puzzle"
        draggable=".puzzle-item"
        @end="envoiReponse"
    >
      <template #item="{fragment}" >
        <div class="puzzle-item">
          <poignee-puzzle/>
          <span>{{fragment.contenu}}</span>
        </div>
      </template>
      <div v-if="fragmentsClasses.length == 0"
        class="puzzle-item invisible">
        <!-- cette div permet d'éviter que le premier ghost n'apparaisse en dessous du footer -->
      </div>
      <div v-if="affichePuzzleDroite"
        class="zone-de-depot">
        {{ $traduction('cafe_de_la_place.puzzle.texte_zone_depot') }}
      </div>
    </draggable>
    <draggable
        v-if="affichePuzzleDroite"
        class="puzzle-droite"
        v-model="fragmentsNonClasses"
        item-key="id"
        group="puzzle"
        @end="envoiReponse"
        :sort="false"
    >
      <template #item="{fragment}" >
        <div class="puzzle-item">
          <poignee-puzzle/>
          <span>{{fragment.contenu}}</span>
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
      const reponse = this.fragmentsClasses.map((fragment) => fragment.id);
      const score = this.calculeScore(reponse);
      const succes = this.succes(reponse);
      this.affichePuzzleDroite = reponse.length < this.nombreFragment;
      this.$emit('reponse', { score, succes, reponse });
    },

    calculeScore(reponse) {
      const nombre_biens_places = reponse
        .map((id, i) => id === i ? 1 : 0)
        .reduce((somme, element) => somme + element, 0);

      let score = nombre_biens_places;
      if(nombre_biens_places >= 5) score++;
      return score;
    },

    succes(reponse) {
      return reponse.every((id, index) => id === index);
    }
  }
};
</script>
