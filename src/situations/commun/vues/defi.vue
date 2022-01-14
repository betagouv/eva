<template>
  <div>
    <component
      :is="question.extensionVue"
      :question="question"
      @action="envoi"
    />

    <question
      :question="question"
      class="question--qcm"
    >
      <slot />
      <question-entete
      :question="question"
      />
      <div class="question-contenu">
        <component
            v-if="composantContenu"
            :is="composantContenu"
            :question="question"
            v-model="reponse"
        />
        <div v-else>
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
              v-model="reponse"
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
      </div>
      <button
        v-if="question.type != 'action'"
        :disabled="disabled"
        class="question-bouton bouton-arrondi bouton-arrondi--petit"
        @click="envoi"
      >
        {{ $traduction('defi.valider') }}
      </button>
    </question>
  </div>
</template>

<script>
import 'commun/styles/boutons.scss';
import 'commun/styles/bouton.scss';
import 'commun/styles/formulaire_qcm.scss';

import ReponseAudioQcm from './reponse_audio_qcm';
import BoutonLecture from 'commun/vues/bouton_lecture';
import ChampSaisie from 'commun/vues/defi/champ_saisie';
import Question from './question';
import QuestionEntete from 'commun/vues/question_entete';
import Jauge from 'commun/vues/defi/jauge';
import EvenementAffichageQuestionQCM from 'commun/modeles/evenement_affichage_question_qcm';

export default {
  components: { ReponseAudioQcm, BoutonLecture, Question, QuestionEntete, Jauge, ChampSaisie },

  props: {
    question: {
      type: Object,
      required: true
    },
    envoyerEvenementAffichage: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  mounted () {
    if (this.envoyerEvenementAffichage) {
      const evenement = new EvenementAffichageQuestionQCM({
        question: this.question.id,
        metacompetence: this.question.metacompetence
      });
      this.$journal.enregistre(evenement);
    }
  },

  data () {
    return {
      envoyer: false,
      reponse: ''
    };
  },

  computed: {
    composantContenu () {
      if (this.question.type === 'action') return undefined;
      if (this.question.type === 'qcm') {
        return this.question.type_qcm === 'jauge' ? 'jauge' : undefined;
      }
      return this.question.type;
    },

    contenuDeTypeChamp () {
      return this.question.type === 'champ-saisie';
    },

    reponsesPossibles () {
      return this.contenuDeTypeChamp || (this.question.choix && this.question.choix.length > 0);
    },

    disabled () {
      return (!this.reponse || this.envoyer) && this.reponsesPossibles;
    },

    donneesReponse () {
      if (this.contenuDeTypeChamp) {
        const succes = this.reponse.toLowerCase() === this.question.bonneReponse;
        return { reponse: this.reponse, succes: succes };
      } else if (this.question.type === 'action') {
        return { succes: true };
      } else {
        if (this.question.choix.length === 0) {
          return { succes: true };
        }
        const choix = this.question.choix.find((choix) => choix.id === this.reponse);
        return { reponse: choix.id, succes: choix.bonneReponse };
      }
    }
  },

  methods: {
    envoi () {
      this.envoyer = true;
      this.$emit('reponse', this.donneesReponse);
    },
    afficheLectureReponse (nomTechnique) {
      return this.$depotRessources.existeMessageAudio(nomTechnique);
    }
  }
};
</script>
