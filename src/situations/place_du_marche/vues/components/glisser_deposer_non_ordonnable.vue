<template>
  <glisser-deposer
    :question="question"
    class="glisser-deposer-billets"
    :zones-depot="zonesDepotPositions"
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
import 'place_du_marche/styles/glisser_deposer_billets.scss';

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
      zonesDepotPositions: []
    };
  },

  mounted() {
    this.recuperePositionZoneDepot();
  },

  methods: {
    envoiReponse(reponse) {
      if(reponse.reponse.length === this.question.reponsesNonClassees.length) {
        this.$emit('reponse', reponse );
      }
    },

    recuperePositionZoneDepot() {
      const svgContent = atob(this.question.zones_depot_url.split(',')[1]);
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
      const zonesDepot = svgDoc.querySelectorAll('.zone-depot');
      if (zonesDepot) {
        zonesDepot.forEach((zoneDepot) => {
          const estBonneReponse = zoneDepot.getAttribute('class').includes('bonne-reponse');
          this.zonesDepotPositions.push({
            top: zoneDepot.getAttribute('y'),
            left: zoneDepot.getAttribute('x'),
            width: zoneDepot.getAttribute('width'),
            height: zoneDepot.getAttribute('height'),
            bonneReponse: estBonneReponse
          });
        });
      }
    },
  }
};
</script>
