<template>
  <transition-fade>
    <defi
      v-if="carteActive.id"
      :key="carteActive.id"
      :question="carteActive"
      @reponse="reponse"
    >
      <pagination
        v-if="affichePagination"
        :indexQuestion="indexCarte"
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
      indexCarte: 0,
      affichePagination: false,
      carteActive: {}
    };
  },

  computed: {
    ...mapState(['chapitreALrd'])
  },

  watch: {
    chapitreALrd (chapitre) {
      this.carteActive = chapitre.sousConsignes[0];
    }
  },

  methods: {
    reponse (reponse) {
      this.indexCarte++;
      if(this.carteActive.type === 'sous-consigne') {
        if (this.indexCarte < this.chapitreALrd.sousConsignes.length) {
          this.carteActive = this.chapitreALrd.sousConsignes[this.indexCarte];
        } else {
          this.indexCarte = 0;
          this.affichePagination = true;
          this.carteActive = this.chapitreALrd.questions[0];
        }
      }
      else {
        const donneesReponses = { question: this.carteActive.id, ...reponse };
        this.$journal.enregistre(new EvenementReponse(donneesReponses));
        if (this.indexCarte < this.chapitreALrd.questions.length) {
           this.carteActive = this.chapitreALrd.questions[this.indexCarte];
        } else {
          this.$emit('terminer');
        }
      }
    }
  }
};
</script>
