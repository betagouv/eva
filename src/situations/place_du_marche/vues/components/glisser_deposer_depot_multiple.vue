<template>
  <glisser-deposer
    :question="question"
    class="glisser-deposer-non-ordonnable"
    :zones-depot="zoneDepotPositions"
    :aide-depot="false"
    @deplace-item="envoiReponse"
    >
    <template #item="{ item }">
      <img :src="item.illustration"/>
    </template>
  </glisser-deposer>
</template>

<script>
import GlisserDeposer from 'commun/vues/components/glisser_deposer';
import 'place_du_marche/styles/glisser_deposer_depot_multiple.scss';

export default {
  components: { GlisserDeposer },

  props: {
    question: {
      type: Object,
      required: true
    },
  },

  computed: {
    zoneDepotPositions() {
      const zones = this.recupereZonesDeDepot();

      if (!zones) return;

      return Array.from(zones).map(zone => {
        const BonneReponse = zone.getAttribute('class').includes('bonne-reponse');
        const { y: top, x: left, width, height } = zone.attributes;
        return {
          top: top.value,
          left: left.value,
          width: width.value,
          height: height.value,
          bonneReponse: BonneReponse
        };
      });
    },
  },

  methods: {
    envoiReponse(reponse) {
      if(reponse.reponse.length === this.question.reponsesNonClassees.length) {
        this.$emit('reponse', reponse );
      }
    },

    recupereZonesDeDepot() {
      if (!this.question.zones_depot_url) return;
      const svgContent = atob(this.question.zones_depot_url.split(',')[1]);
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
      return svgDoc.querySelectorAll('.zone-depot');
    }

  }
};
</script>
