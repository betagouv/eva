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
        :nombreQuestions="this.chapitreEnCours.questions.length"
      />
    </defi>
  </transition-fade>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Vue from 'vue';
import EvenementReponse from 'questions/modeles/evenement_reponse';

import Defi from 'commun/vues/defi';
import TransitionFade from 'commun/vues/transition_fade';
import Pagination from 'commun/vues/components/pagination';

import ClicSurMots from 'cafe_de_la_place/vues/components/clic_sur_mots.vue';

export default {
  components: { Defi, TransitionFade, Pagination },

  data () {
    return {
      indexCarte: 0,
      affichePagination: false,
      carteActive: {}
    };
  },

  mounted () {
  // enregistre globalement, les composants spécifiques utilisés par certaines questions
    Vue.component('clic_sur_mots', ClicSurMots);
  },

  computed: {
    ...mapState(['chapitreALrd', 'chapitreACrdClic', 'chapitreACrdChoix', 'chapitreAPlc', 'chapitreEnCours'])
  },

  watch: {
    chapitreALrd (chapitre) {
      this.changeChapitre(chapitre);
    }
  },

  methods: {
    ...mapMutations([ 'configureChapitre' ]),

    reponse (reponse) {
      this.indexCarte++;
      if(this.carteActive.type === 'sous-consigne') {
        if (this.indexCarte < this.chapitreEnCours.sousConsignes.length) {
          this.carteActive = this.chapitreEnCours.sousConsignes[this.indexCarte];
        } else {
          this.demarreQuestions();
        }
      }
      else {
        const donneesReponses = { question: this.carteActive.id, ...reponse };
        this.$journal.enregistre(new EvenementReponse(donneesReponses));

        if (this.indexCarte < this.chapitreEnCours.questions.length) {
          this.carteActive = this.chapitreEnCours.questions[this.indexCarte];
        } else if (this.chapitreEnCours === this.chapitreALrd) {
          this.changeChapitre(this.chapitreACrdClic);
        } else if (this.chapitreEnCours === this.chapitreACrdClic) {
          this.changeChapitre(this.chapitreACrdChoix);
        } else if (this.chapitreEnCours === this.chapitreACrdChoix) {
          this.changeChapitre(this.chapitreAPlc);
        } else {
          this.$emit('terminer');
        }
      }
    },

    changeChapitre (nouveauChapitre) {
      this.configureChapitre(nouveauChapitre);
      this.carteActive = nouveauChapitre.sousConsignes[0];
      this.indexCarte = 0;
      this.affichePagination = false;
    },

    demarreQuestions() {
      this.indexCarte = 0;
      this.affichePagination = true;
      this.carteActive = this.chapitreEnCours.questions[0];
    }
  }
};
</script>
