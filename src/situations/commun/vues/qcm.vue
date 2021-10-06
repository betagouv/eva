<template>
  <div>
    <component
      :is="question.extensionVue"
      :question="question"
    />

    <question
      :question="question"
      class="question--qcm"
    >
      <slot />
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
            :idQuestion="question.nom_technique"
          />
        </div>
        <div class="entete-questions">
          <p v-if="question.description">{{ question.description }}</p>
          <p class="question-intitule">{{ question.intitule }}</p>
          <p v-if="question.consigne">{{ question.consigne }}</p>
        </div>
      </div>
      <div class="question-contenu">
        <div
          v-if="question.numerique"
          class="question-choix"
        >
          <div class="numerique-input-conteneur"
               :class="{ 'chiffres-espaces' : question.espacerChiffres }">
            <div class="conteneur-traits-saisie">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <input
              v-model.trim="reponse"
              class="numerique-input"
              maxlength="4"
              type='text'
              />
          </div>
        </div>
        <div
          v-for="element in question.choix"
          :key="element.id"
          class="question-choix"
        >
          <label class="question-label">
            <input
              v-model="reponse"
              :value="element.id"
              name="question"
              type="radio"
              class="question-input"
            />
            <lecteur-audio
              v-if="element.audio"
              :joue-son="reponse == element.id"
              :questionnaire="element.audio"
              :idReponse="element.id"
              class="question-reponse-intitule"
            />
            <img
              v-if="element.image"
              :src="element.image"
              class="question-reponse-intitule"
            />
            <span
              v-else
              class="question-reponse-intitule"
            >
              {{ element.intitule }}
            </span>
          </label>
        </div>
      </div>
      <button
        :disabled="disabled"
        class="question-bouton bouton-arrondi bouton-arrondi--petit"
        @click="envoi"
      >
        {{ $traduction('questions.qcm.valider') }}
      </button>
    </question>
  </div>
</template>

<script>
import 'commun/styles/boutons.scss';
import 'commun/styles/formulaire_qcm.scss';

import LecteurAudio from './lecteur_audio';
import Question from './question';
import BoutonLecture from 'commun/vues/bouton-lecture';
import EvenementAffichageQuestionQCM from 'commun/modeles/evenement_affichage_question_qcm';

export default {
  components: { LecteurAudio, Question, BoutonLecture },

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
    disabled () {
      return !this.reponse || this.envoyer;
    },

    donneesReponse () {
      let donneesReponse;
      if (this.question.numerique) {
        const succes = this.reponse === this.question.bonneReponse;
        donneesReponse = { reponse: this.reponse, succes: succes };
      } else {
        const choix = this.question.choix.find((choix) => choix.id === this.reponse);
        donneesReponse = { reponse: choix.id, succes: choix.bonneReponse };
      }
      return donneesReponse;
    },
    afficheLectureQuestion () {
      return this.$depotRessources.existeMessageAudio(this.question.nom_technique);
    }
  },

  methods: {
    envoi () {
      this.envoyer = true;
      this.$emit('reponse', this.donneesReponse);
    }
  }
};
</script>
