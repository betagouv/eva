<template>
  <glisser-deposer
    :question="question"
    :class="`glisser-deposer--marche glisser-deposer--${statut}`"
    :zones-depot="zonesDepotPositions"
    :aide-depot="!this.question.zone_depot_url"
    :style-container-depart="styleContainerDepart"
    @ordonne-item="envoiReponsesOrdonnees"
    @deplace-item="envoiReponsesPlacees"
    >
    <template #item="{ item }">
      <img :src="item.illustration"/>
    </template>
  </glisser-deposer>
</template>

<script>
import GlisserDeposer from 'commun/vues/components/glisser_deposer';
import 'place_du_marche/styles/glisser_deposer.scss';
import { parseSvgFromBase64Url } from 'commun/helpers/decoders';

export default {
  components: { GlisserDeposer },

  props: {
    question: {
      type: Object,
      required: true
    },
  },

  data() {
    return {
      reponsesPlacees: [],
      nombreReponsesAPlacer: this.question.reponsesNonClassees.length,
      statut: this.question.zone_depot_url ? 'personnalise' : 'default'
    };
  },

  computed: {
    zonesDepotPositions() {
      if (!this.zoneDeDepots.length) return;

      return Array.from(this.zoneDeDepots).map(zone => {
        const nomTechnique = zone.getAttribute('class').match(/zone-depot--(\w+)/)[1];
        const { y: top, x: left, width, height } = zone.attributes;
        return {
          top: top.value,
          left: left.value,
          width: width.value,
          height: height.value,
          nomTechnique
        };
      });
    },

    zoneDeDepots() {
      const svgDoc = parseSvgFromBase64Url(this.question.zone_depot_url);
      return svgDoc.querySelectorAll('.zone-depot');
    },

    sontToutesPlacees() {
      return this.reponsesPlacees.length === this.nombreReponsesAPlacer;
    },

    styleContainerDepart() {
      return {
        width: `calc(var(--largeur-item-glisse) * ${this.nombreReponsesAPlacer} + var(--gap-depot) * (${this.nombreReponsesAPlacer - 1}) + var(--padding-depot) * 2)`
      };
    }
  },

  methods: {
    envoiReponsesOrdonnees(reponse) {
      this.reponsesPlacees = reponse.reponse;
      if (this.sontToutesPlacees) {
        reponse.scoreMax = this.question.score;
        this.$emit('reponse', reponse);
      }
    },

    envoiReponsesPlacees(reponse) {
      this.ajouteNouvelleReponse(reponse);

      if (this.sontToutesPlacees) {
        const score = this.calculeScore();
        const reponseFinale = {
          score,
          scoreMax: this.question.score,
          succes: score === this.question.score,
          reponse: this.reponsesPlacees.map(reponse => reponse.reponse)
        };
        this.$emit('reponse', reponseFinale);
      }
    },

    ajouteNouvelleReponse(reponse) {
      this.reponsesPlacees = this.reponsesPlacees
        .filter(r => r.reponse !== reponse.reponse)
        .concat(reponse);
    },

    calculeScore() {
      const scoreParReponse = this.question.score / this.nombreReponsesAPlacer;

      return this.reponsesPlacees.reduce((total, reponse) => {
        return total + (reponse.succes ? scoreParReponse : 0);
      }, 0);
    }
  }
};
</script>
