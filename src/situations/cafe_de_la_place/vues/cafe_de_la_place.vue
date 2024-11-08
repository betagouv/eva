<template>
  <transition-fade>
    <defi
      v-if="question.id"
      :key="question.id"
      :question="question"
      @reponse="reponse"
    >
      <pagination
        v-if="affichePagination"
        :indexQuestion="indexCarte"
        :nombreQuestions="nombreCartes"
      />
    </defi>
  </transition-fade>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import EvenementReponse from 'questions/modeles/evenement_reponse';

import Defi from 'commun/vues/defi';
import TransitionFade from 'commun/vues/transition_fade';
import Pagination from 'commun/vues/components/pagination';

export default {
  components: { Defi, TransitionFade, Pagination },

  data () {
    return {
      question: {}
    };
  },

  mounted () {
    this.$store.commit('recupereQuestionsServeur', this.$depotRessources.questions());
  },

  computed: {
    ...mapState(['indexCarte', 'carteActive', 'termine']),
    ...mapGetters(['questionServeur', 'nombreCartes', 'acteEnCours']),

    affichePagination () {
      return this.carteActive.type !== 'sous-consigne';
    }
  },

  watch: {
    acteEnCours (actEnCours) {
      if(actEnCours && location.hash){
        this.$store.dispatch('sauteALaCarte', location.hash.substring(1));
      }
    },

    termine () {
      this.$emit('terminer');
    },

    carteActive() {
      this.question = this.questionServeur(this.carteActive) ?? this.carteActive;
    },
  },

  methods: {
    reponse (reponse) {
      if(this.carteActive.type !== 'sous-consigne') {
        this.$store.commit('enregistreReponse', reponse);
        this.$journal.enregistre(new EvenementReponse(reponse));
      }
      this.$store.commit('carteSuivante');
    }
  }
};
</script>
