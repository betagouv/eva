<template>
  <div>
    <component
      v-if="question.extensionVue"
      :is="question.extensionVue"
      :question="question"
      @reponse="attribueReponse"
      @action="envoi"
    />
    <question
      :question="question"
    >
      <slot />
      <div
        class="question-defi"
        :class="{'question-defi--centre': questionSansTexte }">
        <question-entete
          :question="question"
          ref="questionEntete"
        />
        <div
          class="question-contenu"
        >
          <component
            v-if="composantContenu"
            :is="composantContenu"
            :question="question"
            v-model="reponse"
            ref="composantContenu"
          />
        </div>
      </div>
      <video-question :nomTechnique="question.nom_technique"/>
      <button
        v-if="question.type != 'action'"
        :disabled="disabled"
        class="question-bouton bouton-arrondi bouton-arrondi--petit"
        @click="envoi"
      >
      {{$traduction(texteBouton)}}
      </button>
    </question>
  </div>
</template>

<script>
import 'commun/styles/boutons.scss';
import 'commun/styles/boutons.scss';
import 'commun/styles/defi.scss';

import { mapGetters } from 'vuex';
import Question from './question';
import QuestionEntete from 'commun/vues/question_entete';
import VideoQuestion from 'commun/vues/video_question';
import Jauge from 'commun/vues/defi/jauge';
import ChampSaisie from 'commun/vues/defi/champ_saisie';
import Qcm from 'commun/vues/defi/qcm';
import RedactionNote from 'commun/vues/defi/redaction_note';
import EvenementAffichageQuestionQCM from 'commun/modeles/evenement_affichage_question_qcm';

export default {
  components: { Question, QuestionEntete, VideoQuestion, Jauge, ChampSaisie, Qcm, RedactionNote },

  props: {
    question: {
      type: Object,
      required: true
    }
  },

  mounted () {
    this.journaliserEvenementAffichage();
    this.demarreSon();
  },

  data () {
    return {
      envoyer: false,
      reponse: this.question.type === 'action' ? { succes: true } : ''
    };
  },

  watch: {
    acteEnCours () {
      this.journaliserEvenementAffichage();
      this.demarreSon();
    }
  },

  computed: {
    ...mapGetters(['acteEnCours']),

    composantContenu () {
      if (this.question.type === 'redaction_note') return RedactionNote;
      if (this.question.type === 'action' || this.question.type === 'sous-consigne') return undefined;
      if (this.question.type === 'qcm') {
        return this.question.type_qcm === 'jauge' ? Jauge : Qcm;
      }
      return this.question.type;
    },

    contenuSansChoix () {
      return !this.question.type || this.question.type === 'champ-saisie';
    },

    reponsesPossibles () {
      return this.contenuSansChoix || (this.question.choix && this.question.choix.length > 0);
    },

    disabled () {
      return (!this.reponse || this.envoyer) && this.reponsesPossibles;
    },

    texteBouton () {
      return this.question.type == 'sous-consigne' ? 'defi.suivant' : 'defi.valider';
    },

    questionSansTexte () {
      return (!this.question.intitule && !this.question.description && !this.question.modalite_reponse);
    }
  },

  methods: {
    envoi () {
      this.envoyer = true;
      this.$emit('reponse', this.reponse);
    },

    attribueReponse (reponse) {
      this.reponse = reponse;
    },

    journaliserEvenementAffichage () {
      if (this.acteEnCours) {
        const evenement = new EvenementAffichageQuestionQCM({
          question: this.question.id,
          metacompetence: this.question.metacompetence
        });
        this.$journal.enregistre(evenement);
      }
    },

    demarreSon () {
      if (this.acteEnCours) {
        this.$refs.questionEntete.demarreSon();
      }
    }
  }
};
</script>
