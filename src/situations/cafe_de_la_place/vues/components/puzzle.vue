<template>
  <div class="puzzle-container">
    <draggable class="puzzle-gauche" :list="nouvellesDuJourClassees" group="nouvelles">
      <div
        v-for="nouvelle in nouvellesDuJourClassees"
        :key="nouvelle.id"
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
        <span>{{nouvelle.contenu}}</span>
      </div>
    </draggable>
    <draggable
      v-if="affichePuzzleDroite"
      class="puzzle-droite"
      :list="nouvellesDuJourNonClassees"
      group="nouvelles"
      @end="envoiReponse"
      :sort="false"
    >
      <div
        v-for="nouvelle in nouvellesDuJourNonClassees"
        :key="nouvelle.id"
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
        <span>{{nouvelle.contenu}}</span>
      </div>
    </draggable>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import 'cafe_de_la_place/styles/puzzle.scss';
import draggable from 'vuedraggable';

export default {
  components: { draggable },

  data() {
    return {
      nouvellesDuJourClassees: []
    };
  },

  computed: {
    ...mapGetters(['nouvellesDuJourNonClassees']),

    affichePuzzleDroite () {
      return this.nouvellesDuJourNonClassees.length !== 0;
    }
  },

  methods: {
    envoiReponse() {
      this.$emit('reponse', this.nouvellesDuJourClassees );
    }
  }
};
</script>
