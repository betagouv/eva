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
    ...mapState(['questionActive', 'termine', 'aide']),
    ...mapGetters(['questionServeur', 'acteEnCours']),
  },

  watch: {
    termine () {
      this.$emit('terminer');
    },
    questionActive() {
      this.question = this.questionServeur(this.questionActive) ?? this.questionActive;
      this.enregistreConsigneEnCours();
      this.$depotRessources.texteAide = this.question.aide;
      this.afficheAide();
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
        this.penaliseActivationAide(reponse);
        this.$store.commit('enregistreReponse', reponse);
        this.$journal.enregistre(new EvenementReponse(reponse));
        this.$store.commit('recalculePourcentageReussiteGlobal');
      }
      this.$store.commit('carteSuivante');
    },

    enregistreConsigneEnCours() {
      this.$depotRessources.consigneEnCours = `${this.question.nom_technique}_consigne`;
    },

    afficheAide() {
      const bouton = document.querySelector('.actions-aide');
      if(bouton)
        bouton.style = this.question.aide ? '' : 'display: none';
    },

    penaliseActivationAide(reponse) {
      if(this.aide && reponse.score >= 0.5)
        reponse.score = reponse.score - 0.5;
    }
  }
};
</script>
