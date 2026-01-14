<template>
  <transition-fade>
    <defi
      v-if="question.id"
      :key="question.id"
      :question="question"
      @reponse="reponse"
    />
  </transition-fade>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import EvenementReponse from 'questions/modeles/evenement_reponse';

import Defi from 'commun/vues/defi';
import TransitionFade from 'commun/vues/transition_fade';
import PositionnementMixin from 'commun/mixins/positionnement_mixin';

export default {
  components: { Defi, TransitionFade },
  mixins: [PositionnementMixin],

  data () {
    return {
      question: {}
    };
  },

  mounted () {
    this.$store.commit('recupereQuestionsServeur', this.$depotRessources.questions());
  },

  computed: {
    ...mapState(['questionActive', 'termine', 'aide']),
    ...mapGetters(['questionServeur', 'acteEnCours']),
  },

  methods: {
    onQuestionActiveChange() {
      this.enregistreConsigneEnCours();
      this.$depotRessources.texteAide = this.question.aide;
      this.afficheBoutonDemandeAide();
    },

    reponse (reponse) {
      this.fermeFenetreAide();
      if(this.question.type !== 'sous-consigne') {
        this.appliqueMalus(reponse);
        this.$store.commit('enregistreReponse', reponse);
        this.$journal.enregistre(new EvenementReponse(reponse));
        this.$store.commit('recalculePourcentageReussiteGlobal');
      }
      this.$store.commit('carteSuivante');
    },

    enregistreConsigneEnCours() {
      this.$depotRessources.consigneEnCours = `${this.question.nom_technique}_consigne`;
    },

    afficheBoutonDemandeAide() {
      const bouton = document.querySelector('.actions-aide');
      if(bouton)
        bouton.style = this.question.aide ? '' : 'display: none';
    },

    fermeFenetreAide() {
      const fenetre = document.querySelector('.fenetre-aide-presentation .fenetre-aide-presentation-bouton');
      if(fenetre)
        fenetre.click();
    },

    appliqueMalus(reponse) {
      const malus = 0.5;
      if(this.aide && reponse.score >= malus) {
        reponse.score = reponse.score - malus;
      }
    }
  }
};
</script>
