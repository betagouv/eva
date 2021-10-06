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
        <div class="question-progression">
          {{ indexQuestions + 1 }}/{{ nombreQuestions }}
        </div>
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
import 'questions/styles/progression.scss';
import { DEMARRE } from 'commun/modeles/situation';

export default {
  components: { TransitionFade },
  computed: {
    ...mapState(['indexQuestions', 'etat', 'fini']),
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
    },
    afficheLectureQuestion () {
      return this.$depotRessources.existeMessageAudio(this.questionCourante.nom_technique);
    }
  },

  watch: {
    fini (fini) {
      if (fini) this.$emit('terminer');
    }
  }
};
</script>
