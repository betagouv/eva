<template>
  <svg height="100%" width="100%">
    <image
      :xlink:href="fondSituation"
      height="100%"
      width="100%"
    />
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
    <transition-fade>
      <rect
        v-if="zoneActive"
        x="0"
        y="0"
        width="100%"
        height="100%"
        class="overlay-zone"
        @click="sortEvaluationZone"
      />
    </transition-fade>
    <g
      :class="{ 'overlay-zone-actions-cache': !zoneEvaluee }"
      class="transition-transform"
    >
      <rect
        width="35%"
        height="22%"
        rx="64"
        fill="#FBF9FA"
        x="32%"
        y="73%"
      />

      <svg width="52" height="51" viewBox="0 0 52 51" x="37%" y="79%" class="overlay-zone-action">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M26 51C40.3594 51 52 39.5833 52 25.5C52 11.4167 40.3594 0 26 0C11.6406 0 0 11.4167 0 25.5C0 39.5833 11.6406 51 26 51ZM41.5416 14.3955C42.2484 13.5092 42.124 12.2004 41.2637 11.4722C40.4034 10.744 39.1331 10.8722 38.4263 11.7585L21.3023 33.2316L17.6413 28.0931C16.9825 27.1684 15.7208 26.969 14.8232 27.6478C13.9257 28.3265 13.7321 29.6264 14.391 30.5511L21.123 40L41.5416 14.3955Z" fill="#9ADBD0"/>
      </svg>

      <svg width="53.805" height="49.25" x="47%" y="79%" class="overlay-zone-action">
        <path d="m18.242 5c3.849-6.6667 13.472-6.6667 17.321 0l16.888 29.25c3.849 6.6667-0.9623 15-8.6603 15h-33.775c-7.698 0-12.509-8.3333-8.6603-15z" fill="#fdaf54"/>
        <path d="m26.921 33.213c-0.8521 0-1.3158-0.561-1.391-1.6829l-1.0902-16.297c-0.0501-0.9153 0.1504-1.6829 0.6015-2.3029 0.4762-0.62 1.0902-0.93 1.8421-0.93s1.3659 0.31 1.8421 0.93 0.6767 1.3876 0.6015 2.3029l-1.0526 16.297c-0.0752 1.1219-0.5263 1.6829-1.3534 1.6829zm-0.2632 9.7871c-0.7268 0-1.2907-0.2214-1.6917-0.6643-0.3759-0.4724-0.5639-1.1367-0.5639-1.9928v-0.7529c0-0.8562 0.188-1.5057 0.5639-1.9486 0.401-0.4724 0.9649-0.7085 1.6917-0.7085h0.4888c0.7268 0 1.2782 0.2361 1.6541 0.7085 0.401 0.4429 0.6015 1.0924 0.6015 1.9486v0.7529c0 0.8561-0.2005 1.5204-0.6015 1.9928-0.3759 0.4429-0.9273 0.6643-1.6541 0.6643z" fill="#fbf9fa"/>
      </svg>

      <svg width="54" height="50" viewBox="0 0 54 50" x="57%" y="79%" class="overlay-zone-action">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.2422 5C22.0912 -1.66667 31.7137 -1.66667 35.5627 5L52.4502 34.25C56.2992 40.9167 51.4879 49.25 43.7899 49.25H10.0149C2.31692 49.25 -2.49434 40.9167 1.35466 34.25L18.2422 5ZM22.425 33.8443C21.4024 33.8443 20.846 33.3195 20.7558 32.27L19.4475 17.0243C19.3874 16.1681 19.628 15.45 20.1693 14.87C20.7408 14.29 21.4776 14 22.3799 14C23.2821 14 24.019 14.29 24.5904 14.87C25.1618 15.45 25.4024 16.1681 25.3122 17.0243L24.049 32.27C23.9588 33.3195 23.4175 33.8443 22.425 33.8443ZM22.1092 43C21.237 43 20.5603 42.7929 20.0791 42.3786C19.628 41.9367 19.4024 41.3152 19.4024 40.5143V39.81C19.4024 39.009 19.628 38.4014 20.0791 37.9871C20.5603 37.5452 21.237 37.3243 22.1092 37.3243H22.6956C23.5678 37.3243 24.2295 37.5452 24.6806 37.9871C25.1618 38.4014 25.4024 39.009 25.4024 39.81V40.5143C25.4024 41.3152 25.1618 41.9367 24.6806 42.3786C24.2295 42.7929 23.5678 43 22.6956 43H22.1092ZM29.7558 32.27C29.846 33.3195 30.4024 33.8443 31.425 33.8443C32.4175 33.8443 32.9588 33.3195 33.049 32.27L34.3122 17.0243C34.4024 16.1681 34.1618 15.45 33.5904 14.87C33.019 14.29 32.2821 14 31.3799 14C30.4776 14 29.7408 14.29 29.1693 14.87C28.628 15.45 28.3874 16.1681 28.4475 17.0243L29.7558 32.27ZM29.0791 42.3786C29.5603 42.7929 30.237 43 31.1092 43H31.6956C32.5678 43 33.2295 42.7929 33.6806 42.3786C34.1618 41.9367 34.4024 41.3152 34.4024 40.5143V39.81C34.4024 39.009 34.1618 38.4014 33.6806 37.9871C33.2295 37.5452 32.5678 37.3243 31.6956 37.3243H31.1092C30.237 37.3243 29.5603 37.5452 29.0791 37.9871C28.628 38.4014 28.4024 39.009 28.4024 39.81V40.5143C28.4024 41.3152 28.628 41.9367 29.0791 42.3786Z" fill="#FD5C54"/>
      </svg>
    </g>

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
</template>

<script>
import { mapState } from 'vuex';
import 'prevention/styles/acte.scss';
import TransitionFade from 'commun/vues/transition_fade';

export default {
  components: {
    TransitionFade
  },

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
