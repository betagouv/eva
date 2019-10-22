<template>
  <div
    class="overlay modale"
    tabindex="0"
    @keydown.s="passe"
  >
    <div
      v-if="ecran == 'consigne'"
      class="modale-interieur"
    >
      <h2>{{ titre }}</h2>
      <p class="icone-description">
        <img
          :src="casque"
          class="icone-description-icone"
        >
        <span>{{ traduction('accueil.intro_consigne.message') }}</span>
      </p>
      <button
        class="bouton-arrondi"
        @click="afficheContexte"
      >{{ traduction('accueil.intro_consigne.bouton') }}</button>
    </div>
    <div
      v-else
      class="modale-interieur"
    >
      <h2 v-if="titreConsigne">{{ traduction('situation.consigne') }}</h2>
      <div
        v-html="message"
       ></div>
      <button
        class="bouton-arrondi"
        :disabled="passeDesactive"
        @click="passe"
      >{{ traduction('accueil.intro_contexte.bouton') }}</button>
    </div>
  </div>
</template>

<script>
import 'commun/styles/modale.scss';
import JoueurConsigne from 'commun/composants/joueur_consigne';
import { traduction } from 'commun/infra/internationalisation';

export default {
  props: {
    titre: {
      type: String,
      default: () => {
        return traduction('situation.ecouter-consigne');
      }
    },
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
      ecran: 'consigne',
      casque: this.depotRessources.casque().src,
      consigneEnCours: false,
      depot: this.depotRessources
    };
  },

  computed: {
    passeDesactive () {
      return this.consigneEnCours;
    }
  },

  methods: {
    afficheContexte () {
      this.ecran = 'contexte';
      this.joueConsigne();
    },

    joueConsigne () {
      this.consigneEnCours = true;
      const consigne = new JoueurConsigne(this.depot);
      consigne.joue(true, this.lectureTerminee.bind(this));
    },

    lectureTerminee () {
      this.consigneEnCours = false;
    },

    passe () {
      this.$emit('passe');
    }
  }
};
</script>
