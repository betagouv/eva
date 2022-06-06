<template>
  <div class="puzzle-container">
    <draggable
        class="puzzle-gauche"
        :list="fragmentsClasses"
        group="puzzle"
        draggable=".puzzle-item"
    >
      <div
        v-for="fragment in fragmentsClasses"
        :key="fragment.id"
        class="puzzle-item"
      >
        <div class="puzzle-icone">
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="2" cy="2" r="2" fill="#D6DAEC"/>
          <circle cx="2" cy="10" r="2" fill="#D6DAEC"/>
          <circle cx="2" cy="18" r="2" fill="#D6DAEC"/>
          <circle cx="10" cy="18" r="2" fill="#D6DAEC"/>
          <circle cx="10" cy="10" r="2" fill="#D6DAEC"/>
          <circle cx="10" cy="2" r="2" fill="#D6DAEC"/>
          </svg>
        </div>
        <span>{{fragment.contenu}}</span>
      </div>
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
      :list="fragmentsNonClasses"
      group="puzzle"
      @end="envoiReponse"
      :sort="false"
    >
      <div
        v-for="fragment in fragmentsNonClasses"
        :key="fragment.id"
        class="puzzle-item"
      >
        <div class="puzzle-icone">
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="2" cy="2" r="2" fill="#D6DAEC"/>
          <circle cx="2" cy="10" r="2" fill="#D6DAEC"/>
          <circle cx="2" cy="18" r="2" fill="#D6DAEC"/>
          <circle cx="10" cy="18" r="2" fill="#D6DAEC"/>
          <circle cx="10" cy="10" r="2" fill="#D6DAEC"/>
          <circle cx="10" cy="2" r="2" fill="#D6DAEC"/>
          </svg>
        </div>
        <span>{{fragment.contenu}}</span>
      </div>
    </draggable>
  </div>
</template>

<script>
import 'cafe_de_la_place/styles/puzzle.scss';
import draggable from 'vuedraggable';

export default {
  components: { draggable },

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
      bonOrdre: this.question.reponse.bonOrdre,
      affichePuzzleDroite: true
    };
  },

  methods: {
    envoiReponse() {
      const reponse = this.fragmentsClasses.map((fragment) => fragment.id);
      const score = this.calculeScore(reponse);
      const succes = this.succes(reponse);
      this.affichePuzzleDroite = reponse.length < this.bonOrdre.length;
      this.$emit('reponse', { score, succes, reponse });
    },

    calculeScore(reponse) {
      const nombre_biens_places = this.bonOrdre
        .map((bonId, i) => bonId == reponse[i] ? 1 : 0)
        .reduce((a, b) => a + b);

      let score = nombre_biens_places;
      if(nombre_biens_places >= 5) score++;
      return score;
    },

    succes(reponse) {
      return this.bonOrdre.every((bonId, index) => bonId === reponse[index]);
    }
  }
};
</script>
