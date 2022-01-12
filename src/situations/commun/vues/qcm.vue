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
        <div
          v-if="question.type === 'numerique'"
          class="question-reponse"
        >
          <div class="input-numerique-conteneur"
               :class="{ 'chiffres-espaces' : question.espacerChiffres }">
            <div class="conteneur-traits-saisie">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <input
              v-model.trim="reponse"
              class="input input-numerique"
              maxlength="4"
              type='text'
              />
          </div>
        </div>
        <div
          v-if="question.type === 'texte'"
          class="question-reponse"
        >
          <input
            v-model.trim="reponse"
            class="input input-texte input-texte--decale"
            placeholder="Réponse"
            type='text'
            @focusout="forceMinuscule"
          />
        </div>
        <div v-else-if="contenuDeTypeJauge">
          <jauge :question="question" @choixjauge="assigneChoixJauge" />
        </div>
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
        {{ $traduction('questions.qcm.valider') }}
      </button>
    </question>
  </div>
</template>

<script>
import 'commun/styles/boutons.scss';
import 'commun/styles/bouton.scss';
import 'commun/styles/formulaire_qcm.scss';
import 'commun/styles/jauge.scss';
import 'commun/styles/inputs.scss';

import ReponseAudioQcm from './reponse_audio_qcm';
import BoutonLecture from 'commun/vues/bouton_lecture';
import Question from './question';
import QuestionEntete from 'commun/vues/question_entete';
import EvenementAffichageQuestionQCM from 'commun/modeles/evenement_affichage_question_qcm';
import Jauge from './jauge';

export default {
  components: { ReponseAudioQcm, BoutonLecture, Question, QuestionEntete, Jauge },

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
    contenuDeTypeJauge () {
      return this.question.type_qcm === 'jauge';
    },

    contenuDeTypeChamp () {
      return this.question.type === 'numerique' || this.question.type === 'texte';
    },

    reponsesPossibles () {
      return this.contenuDeTypeChamp || this.contenuDeTypeJauge ||
        (this.question.choix && this.question.choix.length > 0);
    },

    disabled () {
      return (!this.reponse || this.envoyer) && this.reponsesPossibles;
    },

    donneesReponse () {
      if (this.contenuDeTypeChamp) {
        const succes = this.reponse === this.question.bonneReponse;
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
    assigneChoixJauge (valeur) {
      this.reponse = valeur;
    },
    afficheLectureReponse (nomTechnique) {
      return this.$depotRessources.existeMessageAudio(nomTechnique);
    },
    forceMinuscule () {
      this.reponse = this.reponse.toLowerCase();
    }
  }
};
</script>
