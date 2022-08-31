<template>
  <transition-fade>
    <defi
      v-if="questions.length"
      :key="questionActive.id"
      :question="questionActive"
      @reponse="reponseQuestion"
    >
      <pagination
        :indexQuestion="indexQuestion"
        :nombreQuestions="questions.length"
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
      indexQuestion: 0
    };
  },

  computed: {
    ...mapState(['questions']),

    questionActive () {
      return this.questions[this.indexQuestion];
    }
  },

  methods: {
    reponseQuestion (reponse) {
      this.$journal.enregistre(new EvenementReponse(reponse));

      if (this.indexQuestion + 1 === this.questions.length) {
        this.$emit('terminer');
      } else {
        this.indexQuestion++;
      }
    }
  }
};
</script>
