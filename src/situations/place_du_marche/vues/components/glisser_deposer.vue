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
      if (!this.nombreZonesDeDepot) return;

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

    nombreZonesDeDepot() {
      return this.zoneDeDepots.length;
    },

    sontToutesPlacees() {
      return this.reponsesPlacees.length === this.nombreReponsesAPlacer;
    },

    auMoinsUneReponsePlacee() {
      return this.reponsesPlacees.length > 0;
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
      if (this.auMoinsUneReponsePlacee) {
        const score = reponse.succes ? this.question.score : 0;
        const reponseFinale = {
          score,
          scoreMax: this.question.score,
          succes: reponse.succes,
          reponse: this.reponsesPlacees
        };
        this.$emit('reponse', reponseFinale);
      }
    },

    envoiReponsesPlacees(reponse) {
      this.ajouteNouvelleReponse(reponse);

      if (!this.auMoinsUneReponsePlacee) return;

      const score = this.nombreReponsesAPlacer > this.nombreZonesDeDepot
        ? this.calculeScoreUneFauteAutorisee()
        : this.calculeScorePointParBonneReponse();

      this.$emit('reponse', {
        score,
        scoreMax: this.question.score,
        succes: score === this.question.score,
        reponse: this.reponsesPlacees.map(r => r.reponse)
      });
    },

    ajouteNouvelleReponse(reponse) {
      this.reponsesPlacees = this.reponsesPlacees
        .filter(r => r.reponse !== reponse.reponse)
        .concat(reponse);
    },

    calculeScorePointParBonneReponse() {
      const scoreParReponse = this.question.score / this.nombreReponsesAPlacer;

      return this.reponsesPlacees.reduce((total, reponse) => {
        return total + (reponse.succes ? scoreParReponse : 0);
      }, 0);
    },

    calculeScoreUneFauteAutorisee() {
      const nombreBonnesReponses = this.reponsesPlacees.filter(reponse => reponse.succes).length;
      switch (nombreBonnesReponses) {
      case this.nombreZonesDeDepot:
        return this.question.score;
      case this.nombreZonesDeDepot - 1:
        return this.question.score / 2;
      default:
        return 0;
      }
    }
  }
};
</script>
