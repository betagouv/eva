<template>
  <transition-fade>
    <defi
      v-if="question.id"
      :key="question.id"
      :question="question"
      @reponse="reponse"
    >
      <pagination
        :indexQuestion="indexCarte"
        :nombreQuestions="nombreCartes"
      />
    </defi>
  </transition-fade>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import EvenementReponse from 'questions/modeles/evenement_reponse';
import RegistreCampagne from 'commun/infra/registre_campagne';

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
    const questions = new RegistreCampagne().questions('place_du_marche');
    this.$store.commit('recupereQuestionsServeur', questions);
  },

  computed: {
    ...mapState(['indexCarte', 'questionActive', 'termine']),
    ...mapGetters(['nombreCartes', 'questionServeur']),
  },

  watch: {
    termine () {
      this.$emit('terminer');
    },
    questionActive() {
      this.question = this.questionServeur ?? this.questionActive;
    }
  },

  methods: {
    reponse (reponse) {
      this.$store.commit('enregistreReponse', reponse);
      this.$journal.enregistre(new EvenementReponse(reponse));
      this.$store.commit('recalculePourcentageReussiteGlobal');
      this.$store.commit('carteSuivante');
    }
  }
};
</script>
