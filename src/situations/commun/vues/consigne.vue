<template>
  <div
    class="overlay modale"
    tabindex="0"
    @keydown.s="fini"
  >
    <div class="modale-interieur">
      <h2 v-if="titreConsigne">{{ traduction('situation.consigne') }}</h2>
      <div
        v-html="message"
       ></div>
      <button
        class="bouton-arrondi"
        :disabled="aVousDeJouerDesactive"
        @click="fini"
      >{{ traduction('accueil.intro_contexte.bouton') }}</button>
    </div>
  </div>
</template>

<script>
import 'commun/styles/modale.scss';
import JoueurConsigne from 'commun/composants/joueur_consigne';

export const CONSIGNE_FINI = 'consigne-fini';

export default {
  props: {
    titreConsigne: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    message: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      consigneEnCours: false,
      depot: this.depotRessources
    };
  },

  computed: {
    aVousDeJouerDesactive () {
      return this.consigneEnCours;
    }
  },

  mounted () {
    this.joueConsigne();
  },

  methods: {

    joueConsigne () {
      this.consigneEnCours = true;
      const consigne = new JoueurConsigne(this.depot);
      consigne.joue(true, this.lectureTerminee.bind(this));
    },

    lectureTerminee () {
      this.consigneEnCours = false;
    },

    fini () {
      this.$emit(CONSIGNE_FINI);
    }
  }
};
</script>
