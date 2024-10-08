<template>
  <glisser-deposer
    :question="question"
    :zones-depot="zonesDepotPositions"
    :aide-depot="!this.question.zone_depot_url"
    @deplace-item="envoiReponse"
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

  data: () => ({
    scoreTotal: 0,
  }),

  computed: {
    zonesDepotPositions() {
      if (this.zoneDeDepots.length === 0) return;

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

    zoneDepotMultiple() {
      return this.zoneDeDepots.length > 1;
    }
  },

  methods: {
    envoiReponse(reponse) {
      if(this.zoneDepotMultiple) {
        this.calculeScore(reponse);
        reponse.score = this.scoreTotal;
      }
      if(reponse.reponse.length === this.question.reponsesNonClassees.length) {
        reponse.scoreMax = this.question.score;
        this.$emit('reponse', reponse );
      }
    },

    calculeScore(reponse) {
      const scoreParReponse = reponse.scoreMax / this.question.reponsesNonClassees.length;
      this.scoreTotal += reponse.succes ? scoreParReponse : 0;
    }
  }
};
</script>
