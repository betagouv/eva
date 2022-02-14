<template>
  <transition-fade>
    <defi
      v-if="chapitreALrd.questions.length"
      :key="carteActive.id"
      :question="carteActive"
      @reponse="reponse"
    >
      <pagination
        v-if="carteActive.type != 'sous-consigne'"
        :indexQuestion="indexCarte - this.chapitreALrd.sousConsignes.length"
        :nombreQuestions="this.chapitreALrd.questions.length"
      />
    </defi>
  </transition-fade>
</template>

<script>
import { mapState } from 'vuex';
import EvenementReponse from 'questions/modeles/evenement_reponse';

import Defi from 'commun/vues/defi';
import TransitionFade from 'commun/vues/transition_fade';
import Pagination from 'commun/vues/components/pagination';

export default {
  components: { Defi, TransitionFade, Pagination },

  data () {
    return {
      indexCarte: 0
    };
  },

  computed: {
    ...mapState({
      chapitreALrd: state => state.chapitreALrd
    }),

    carteActive: function  () {
      return this.elementsChapitreALrd()[this.indexCarte];
    }
  },

  methods: {
    reponse (reponse) {
      const donneesReponses = { question: this.carteActive.id, ...reponse };
      this.$journal.enregistre(new EvenementReponse(donneesReponses));

      if (this.indexCarte + 1 === this.elementsChapitreALrd().length) {
        this.$emit('terminer');
      } else {
        this.indexCarte++;
      }
    },

    elementsChapitreALrd() {
      return this.chapitreALrd.sousConsignes.concat(this.chapitreALrd.questions);
    }
  }
};
</script>
