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
import PositionnementMixin from 'commun/mixins/positionnement_mixin';

export default {
  components: { Defi, TransitionFade, Pagination },
  mixins: [PositionnementMixin],

  data () {
    return {
      question: {}
    };
  },

  mounted () {
    this.$store.commit('recupereQuestionsServeur', this.$depotRessources.questions());
  },

  computed: {
    ...mapState(['indexCarte', 'questionActive', 'termine']),
    ...mapGetters(['questionServeur', 'nombreCartes', 'acteEnCours']),

    affichePagination () {
      return this.questionActive.type !== 'sous-consigne';
    }
  },

  methods: {
    onQuestionActiveChange() {
      if (this.question.extensionVue === 'glisser-deposer') {
        this.question.extensionVue = 'puzzle-journal';
      }
    },

    reponse (reponse) {
      if(this.questionActive.type !== 'sous-consigne') {
        this.$store.commit('enregistreReponse', reponse);
        this.$journal.enregistre(new EvenementReponse(reponse));
      }
      this.$store.commit('carteSuivante');
    }
  }
};
</script>
