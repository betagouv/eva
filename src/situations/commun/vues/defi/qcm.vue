<template>
  <div>
    <div
      v-for="(element, index) in question.choix"
      :key="element.id"
      class="question-reponse question-reponse-multiple"
    >
      <bouton-lecture
        v-if="afficheLectureReponse(element.nom_technique)"
        class="bouton-lecture"
        :nomTechnique="element.nom_technique"
      />
      <input
        v-on:change="selectReponse($event.target.value)"
        :value="element.id"
        :id="element.id"
        name="question"
        type="radio"
        class="question-input"
      />
      <label
        :for="element.id"
        class="question-reponse-intitule"
      >
        <reponse-audio-qcm
          v-if="element.audio"
          :joue-son="reponse === element.id"
          :questionnaire="element.audio"
          :idReponse="index"
        />
        <img
          v-if="element.image"
          :src="element.image"
        />
        {{ element.intitule }}
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
