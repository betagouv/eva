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
            @reponse="valeur => reponse = valeur"
          />
        </div>
      </div>
      <video-question :nomTechnique="question.nom_technique_mini_tuto"/>
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
import ChampSaisie from 'commun/vues/defi/champ_saisie';
import Jauge from 'commun/vues/defi/jauge';
import Qcm from 'commun/vues/defi/qcm';
import Question from './question';
import QuestionEntete from 'commun/vues/question_entete';
import RedactionNote from 'commun/vues/defi/redaction_note';
import VideoQuestion from 'commun/vues/video_question';
import EvenementAffichageQuestionQCM from 'commun/modeles/evenement_affichage_question_qcm';

import LectureMessage from 'objets_trouves/vues/lecture-message';
import EcranTelephoneDeverrouillage from 'objets_trouves/vues/ecran-telephone-deverrouillage';

import ClicSurMots from 'cafe_de_la_place/vues/components/clic_sur_mots';
import ListeCoursesATrous from 'cafe_de_la_place/vues/components/liste_courses_a_trous';
import EmailHPfbATrous from 'cafe_de_la_place/vues/components/email_HPfb_a_trous';
import Puzzle from 'cafe_de_la_place/vues/components/puzzle';
import Graphique from 'cafe_de_la_place/vues/components/graphique';

import ModeEmploi from 'plan_de_la_ville/vues/components/mode_emploi';
import ClicMaisonBleue from 'plan_de_la_ville/vues/components/clic_maison_bleue';
import DragAndDrop from 'plan_de_la_ville/vues/components/drag_and_drop';
import DeplacementDroiteMaisonVerte from 'plan_de_la_ville/vues/components/deplacement_droite_maison_verte';

export default {
  components: { ChampSaisie, Jauge, Qcm,
    Question, QuestionEntete, RedactionNote, VideoQuestion,
    LectureMessage, EcranTelephoneDeverrouillage,
    ClicSurMots, ListeCoursesATrous, EmailHPfbATrous, Puzzle, Graphique,
    ModeEmploi, ClicMaisonBleue, DragAndDrop, DeplacementDroiteMaisonVerte
  },

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
      switch(this.question.type) {
      case 'action':
      case 'sous-consigne':
        return undefined;
      case 'qcm':
        return this.question.type_qcm === 'jauge' ? Jauge : Qcm;
      case 'saisie':
        return this.question.sous_type == 'redaction' ? RedactionNote : ChampSaisie;
      default:
        return this.question.type;
      }
    },

    contenuSansChoix () {
      return !this.question.type || this.question.type === 'saisie';
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
      this.$emit('reponse', {
        question: this.question.id,
        intitule: this.question.intitule ?? this.question.retranscription_audio,
        scoreMax: this.scoreMax(),
        metacompetence: this.question.metacompetence,
        reponseIntitule: this.reponseIntitule(),
        ...this.reponse
      });
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
    },

    reponseIntitule () {
      const reponseId = this.reponse;

      if (this.question.choix) {
        const reponse = this.question.choix.find(choix => choix.id === reponseId);
        if (reponse) return reponse.intitule;
      }

      return undefined;
    },

    scoreMax () {
      let scoreMax = undefined;

      if (this.question.choix) {
        scoreMax = this.scoreMaxDepuisChoix(this.question.choix);
      }

      if (this.question.reponse) {
        scoreMax = this.scoreMaxDepuisReponse(this.question.reponse);
      }

      return scoreMax;
    },

    scoreMaxDepuisChoix(choix) {
      return choix.reduce((max, choix) => {
        if (!max) return choix.score;
        return (choix.score > max) ? choix.score : max;
      }, undefined);
    },

    scoreMaxDepuisReponse(reponse) {
      let scoreMax = undefined;

      if (reponse.score) {
        scoreMax = reponse.score;
      }

      if (reponse.scores) {
        scoreMax = reponse.scores.reduce((max, score) => {
          if (!max) return score;
          return (score > max) ? score : max;
        }, undefined);
      }
      return scoreMax;
    }
  }
};
</script>
