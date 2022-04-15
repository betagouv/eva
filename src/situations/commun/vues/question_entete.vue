<template>
  <div class="question-entete">
    <div
      v-if="afficheLectureQuestion"
      class="entete-audio"
    >
      <div class="question-avec-son">
        <svg
          width="32"
          height="32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="16" r="16" fill="#1E416A"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10 19.903H8a1 1 0 0 1-1-1v-5.04a1 1 0 0 1 1-1h1.764a1 1 0 0 0 .447-.105l3.621-1.81a1 1 0 0 1 1.447.894v9.083a1 1 0 0 1-1.447.894L10 19.903Z" fill="#FBF9FA"/><path d="M23.48 10c.514.817.92 1.853 1.182 3.023.262 1.17.375 2.44.328 3.709-.047 1.268-.252 2.496-.598 3.586-.345 1.09-.823 2.008-1.392 2.682M19.48 12c.514.566.92 1.283 1.182 2.093.262.81.375 1.69.328 2.567a6.86 6.86 0 0 1-.598 2.483c-.345.754-.823 1.39-1.392 1.857" stroke="#FBF9FA" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <bouton-lecture
        class="bouton-lecture"
        :nomTechnique="question.nom_technique"
        ref="boutonLecture"
      />
    </div>
    <div class="entete-questions">
      <p v-if="question.description" v-html="question.description"></p>
      <p v-if="question.intitule" v-html="question.intitule"></p>
      <p v-if="question.modalite_reponse" class="question-modalite-reponse"><span v-html="question.modalite_reponse"></span></p>
    </div>
  </div>
</template>

<script>
import BoutonLecture from 'commun/vues/bouton_lecture';
import { mapGetters } from 'vuex';

export default {
  components: { BoutonLecture },

  props: {
    question: {
      type: Object,
      required: true
    }
  },

  watch: {
    acteEnCours (acteEnCours) {
      if(!acteEnCours) {
        if(this.afficheLectureQuestion) {
          this.$refs.boutonLecture.coupeSon();
        }
      }
    }
  },

  computed: {
    ...mapGetters(['acteEnCours']),

    afficheLectureQuestion () {
      return this.$depotRessources.existeMessageAudio(this.question.nom_technique);
    }
  },

  methods: {
    demarreSon() {
      if (this.afficheLectureQuestion) {
        this.$refs.boutonLecture.demarreSon();
      }
    }
  }
};
</script>
