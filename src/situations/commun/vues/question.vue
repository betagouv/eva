<template>
  <div class="question">
    <img
      :src="urlIllustration(question)"
      class="question-illustration"
    />

    <div class="question-barre">
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    question: {
      type: Object,
      required: true
    }
  },


  methods: {
    urlIllustration (question) {
      console.log(question)
      console.log(question.nom_technique_illustration)
      if (question.nom_technique_illustration == undefined) { return undefined };
      return `./assets/illustration_questions/${question.nom_technique_illustration}`;
    },
  }
};
</script>
