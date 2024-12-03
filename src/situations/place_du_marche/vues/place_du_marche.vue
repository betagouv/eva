<template>
  <transition-fade>
    <defi
      v-if="question.id"
      :key="question.id"
      :question="question"
      @reponse="reponse"
    />
  </transition-fade>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import EvenementReponse from 'questions/modeles/evenement_reponse';

import Defi from 'commun/vues/defi';
import TransitionFade from 'commun/vues/transition_fade';

export default {
  components: { Defi, TransitionFade },

  data () {
    return {
      question: {}
    };
  },

  mounted () {
    this.$store.commit('recupereQuestionsServeur', this.$depotRessources.questions());
  },

  computed: {
    ...mapState(['questionActive', 'termine']),
    ...mapGetters(['questionServeur', 'acteEnCours']),
  },

  watch: {
    termine () {
      this.$emit('terminer');
    },
    questionActive() {
      this.question = this.questionServeur(this.questionActive) ?? this.questionActive;
      this.enregistreConsigneEnCours();
      this.recupereTexteAide();
    },
    acteEnCours (acteEnCours) {
      if(acteEnCours && location.hash){
        this.$store.dispatch('sauteALaCarte', location.hash.substring(1));
      }
    },
  },

  methods: {
    reponse (reponse) {
      if(this.question.type !== 'sous-consigne') {
        reponse.score = reponse.score ?? 0;
        this.$store.commit('enregistreReponse', reponse);
        this.$journal.enregistre(new EvenementReponse(reponse));
        this.$store.commit('recalculePourcentageReussiteGlobal');
      }
      this.$store.commit('carteSuivante');
    },

    enregistreConsigneEnCours() {
      this.$depotRessources.consigneEnCours = `${this.question.nom_technique}_consigne`;
    },

    recupereTexteAide() {
      this.$depotRessources.texteAide = this.question.aide;
    }
  }
};
</script>
