<template>
  <div :key="etat">
    <transition-fade mode="out-in">
      <component
        v-if="questionCourante"
        :key="questionCourante.id"
        :is="composantQuestion"
        :question="questionCourante"
        @reponse="repondQuestion"
      ></component>
    </transition-fade>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import EvenementReponse from '../modeles/evenement_reponse';
import TransitionFade from 'commun/vues/transition_fade';
import QuestionQcm from './qcm';
import QuestionRedactionNote from './redaction_note';

export default {
  components: { TransitionFade },

  computed: {
    ...mapState(['indexQuestions', 'etat']),
    ...mapGetters(['questionCourante', 'nombreQuestions']),

    composantQuestion () {
      if (!this.questionCourante) return;

      const classesQuestions = {
        redaction_note: QuestionRedactionNote,
        qcm: QuestionQcm
      };
      return classesQuestions[this.questionCourante.type];
    }
  },

  methods: {
    repondQuestion (reponse) {
      this.$journal.enregistre(new EvenementReponse({ question: this.questionCourante.id, reponse }));
      this.$store.commit('repondQuestionCourante');
    }
  },

  watch: {
    indexQuestions (indexQuestions) {
      if (indexQuestions === this.nombreQuestions) {
        this.$emit('terminer');
      }
    }
  }
};
</script>
