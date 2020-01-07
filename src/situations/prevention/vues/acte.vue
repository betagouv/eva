<template>
  <div
    :style="{ 'background-image': `url(${fondSituation})` }"
    class="fond-situation"
  >
    <svg height="100%" width="100%">
      <clipPath id="cercle-illustration">
        <circle
          v-if="zoneActive"
          :cx="`${zoneActive.x}%`"
          :cy="`${zoneActive.y}%`"
          :r="`${zoneActive.r}%`"
          :class="{ 'transform-scale-1-5': zoneEvaluee  }"
          :style="{ 'transform-origin': zoneActiveTransformOrigin }"
          class="transition-transform"
        />
      </clipPath>
      <circle
        v-for="zone in zonesNonActive"
        :key="zone.id"
        :cx="`${zone.x}%`"
        :cy="`${zone.y}%`"
        :r="`${zone.r}%`"
        class="zone"
        @mouseover="survoleZone(zone)"
      />
      <rect
        v-if="zoneActive"
        x="0"
        y="0"
        width="100%"
        height="100%"
        class="overlay-zone"
        @click="sortEvaluationZone"
      />
      <image
        v-if="zoneActive"
        :xlink:href="fondSituation"
        :style="[ { 'transform-origin': zoneActiveTransformOrigin },
                     zoneEvaluee ? { transform: transformZoneEvaluee(2) } : '' ]"
        clip-path="url(#cercle-illustration)"
        height="100%"
        width="100%"
        class="transition-transform"
      />
      <circle
        v-if="zoneActive"
        :cx="`${zoneActive.x}%`"
        :cy="`${zoneActive.y}%`"
        :r="`${zoneActive.r}%`"
        :style="[ {'transform-origin': zoneActiveTransformOrigin },
                  zoneEvaluee ? { transform: transformZoneEvaluee(3) } : '' ]"
        :class="{ 'zone-agrandi': zoneEvaluee,
                  'zone-clickable': zoneSurvolee }"
        class="zone"
        @mouseout="deSurvoleZone"
        @click="evalueZone(zoneActive)"
      />
    </svg>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'prevention/styles/acte.scss';

export default {
  data () {
    return {
      zoneSurvolee: null,
      zoneEvaluee: null
    };
  },

  computed: {
    ...mapState(['fondSituation', 'zones']),
    translateX () {
      return (50 - this.zoneActive.x);
    },
    translateY () {
      return (40 - this.zoneActive.y);
    },
    zoneActive () {
      return this.zoneSurvolee || this.zoneEvaluee;
    },
    zonesNonActive () {
      return this.zones.filter(z => this.zoneActive !== z);
    },
    zoneActiveTransformOrigin () {
      return `${this.zoneActive.x}% ${this.zoneActive.y}%`;
    }
  },

  methods: {
    transformZoneEvaluee (scale) {
      return `scale(${scale}) translate(${this.translateX / scale}%, ${this.translateY / scale}%)`;
    },

    survoleZone (zone) {
      this.zoneSurvolee = zone;
    },

    deSurvoleZone () {
      this.zoneSurvolee = null;
    },

    evalueZone (zone) {
      this.zoneEvaluee = zone;
      this.deSurvoleZone();
    },

    sortEvaluationZone () {
      this.zoneEvaluee = null;
    }
  }
};
</script>
