<template>
  <qcm
    :key="question.id"
    :question="question"
    @reponse="reponseApp"
  />
</template>

<script>
import Qcm from 'commun/vues/qcm';

export default {
  components: { Qcm },

  props: {
    questions: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      indexQuestion: 0
    };
  },

  computed: {
    question () {
      return this.questions[this.indexQuestion];
    }
  },

  methods: {
    reponseApp () {
      if (this.indexQuestion + 1 === this.questions.length) {
        this.$emit('finQuestions');
      } else {
        this.indexQuestion++;
      }
    }
  }
};
</script>
