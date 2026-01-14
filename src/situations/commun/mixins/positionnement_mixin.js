import { TOUTES_QUESTIONS } from 'commun/modeles/store';

export default {
  watch: {
    termine() {
      this.$emit('terminer');
    },

    acteEnCours(acteEnCours) {
      if (acteEnCours && location.hash) {
        const hash = location.hash.substring(1);
        if (hash == 'toutes') {
          this.$store.commit('demarreParcours', TOUTES_QUESTIONS);
        } else {
          this.$store.dispatch('sauteALaCarte', hash);
        }
      }
    },

    questionActive() {
      this.question = this.questionServeur(this.questionActive) ?? this.questionActive;
      this.onQuestionActiveChange?.();
    }
  }
};
