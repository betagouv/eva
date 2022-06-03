<template>
  <div class="puzzle-container">
    <draggable class="puzzle-gauche" :list="nouvellesDuJourClassees" group="nouvelles" draggable=".puzzle-item">
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
      <div v-if="nouvellesDuJourClassees.length == 0"
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
