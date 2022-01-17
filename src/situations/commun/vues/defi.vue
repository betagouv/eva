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

import Question from './question';
import QuestionEntete from 'commun/vues/question_entete';
import Jauge from 'commun/vues/defi/jauge';
import ChampSaisie from 'commun/vues/defi/champ_saisie';
import Qcm from 'commun/vues/defi/qcm';
import RedactionNote from 'commun/vues/defi/redaction_note';
import EvenementAffichageQuestionQCM from 'commun/modeles/evenement_affichage_question_qcm';

export default {
  components: { Question, QuestionEntete, Jauge, ChampSaisie, Qcm, RedactionNote },

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
      if (this.question.type === 'redaction_note') return RedactionNote;
      if (this.question.type === 'action') return undefined;
      if (this.question.type === 'qcm') {
        return this.question.type_qcm === 'jauge' ? Jauge : Qcm;
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
      } else if (this.question.type === 'redaction_note') {
        return { reponse: this.reponse };
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
    }
  }
};
</script>
