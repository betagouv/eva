<template>
  <div>
    <div
      v-for="(choix, index) in question.choix"
      :key="choix.id"
      class="question-reponse question-reponse-multiple"
    >
      <bouton-lecture
        v-if="afficheLectureReponse(choix.nom_technique)"
        class="bouton-lecture"
        :nomTechnique="choix.nom_technique"
      />
      <input
        v-on:change="selectReponse($event.target.value)"
        :value="choix.id"
        :id="choix.id"
        name="question"
        type="radio"
        class="question-input"
      />
      <label
        :for="choix.id"
        class="question-reponse-intitule"
      >
        <reponse-audio-qcm
          v-if="choix.audio"
          :joue-son="reponse === choix.id"
          :questionnaire="choix.audio"
          :idReponse="index"
        />
        <img
          v-if="choix.image"
          :src="choix.image"
        />
        {{ choix.intitule }}
      </label>
    </div>
  </div>
</template>

<script>
import ReponseAudioQcm from 'commun/vues/reponse_audio_qcm';
import BoutonLecture from 'commun/vues/bouton_lecture';

export default {
  components: { ReponseAudioQcm, BoutonLecture },

  props: {
    question: {
      type: Object,
      required: true
    }
  },

  data: function () {
    return {
      reponse: ''
    };
  },

  methods: {
    afficheLectureReponse (nomTechnique) {
      return this.$depotRessources.existeMessageAudio(nomTechnique);
    },
    selectReponse (valeur) {
      this.reponse = valeur;
      const choix = this.question.choix.find((choix) => choix.id === this.reponse);
      this.$emit('input', { reponse: choix.id, succes: choix.bonneReponse });
    }
  }
};
</script>
