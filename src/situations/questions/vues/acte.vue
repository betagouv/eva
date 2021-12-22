<template>
  <div :key="etat">
    <transition-fade mode="out-in">
      <component
        v-if="questionCourante"
        :key="questionCourante.id"
        :is="composantQuestion"
        :question="questionCourante"
        @reponse="repondQuestion"
        :envoyerEvenementAffichage="acteEnCours"
      >
        <pagination
          :indexQuestion="indexQuestion"
          :nombreQuestions="nombreQuestions"
        />
      </component>
    </transition-fade>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import EvenementReponse from '../modeles/evenement_reponse';
import TransitionFade from 'commun/vues/transition_fade';
import QuestionQcm from 'commun/vues/qcm';
import QuestionRedactionNote from './redaction_note';
import { DEMARRE } from 'commun/modeles/situation';
import Pagination from 'commun/vues/components/pagination';

export default {
  components: { TransitionFade, Pagination },
  computed: {
    ...mapState(['indexQuestion', 'etat', 'fini']),
    ...mapGetters(['questionCourante', 'nombreQuestions']),

    composantQuestion () {
      if (!this.questionCourante) return;

      const classesQuestions = {
        redaction_note: QuestionRedactionNote,
        qcm: QuestionQcm
      };
      return classesQuestions[this.questionCourante.type];
    },
    acteEnCours () {
      return this.etat === DEMARRE;
    }
  },

  methods: {
    repondQuestion (reponse) {
      this.$journal.enregistre(new EvenementReponse({ question: this.questionCourante.id, ...reponse }));
      this.$store.commit('repondQuestionCourante');
    }
  },

  watch: {
    fini (fini) {
      if (fini) this.$emit('terminer');
    }
  }
};
</script>
