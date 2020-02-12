<template>
  <svg height="100%" width="100%">
    <image
      :xlink:href="fondSituation"
      height="100%"
      width="100%"
    />
    <!-- Définition du disque découpé -->
    <clipPath id="cercle-illustration-clip">
      <transition name="restaure-position">
        <circle
          v-if="zoneActive"
          :cx="`${zoneActive.x}%`"
          :cy="`${zoneActive.y}%`"
          :r="`${zoneActive.r}%`"
          :class="{ 'transform-scale-1-5': zoneEvaluee || zonePrevention  }"
          :style="{ 'transform-origin': zoneActiveTransformOrigin }"
          class="transition-transform"
        />
      </transition>
    </clipPath>
    <!-- Cercles de zones sauf celui actif -->
    <circle
      v-for="zone in zonesNonActive"
      :key="zone.id"
      :cx="`${zone.x}%`"
      :cy="`${zone.y}%`"
      :r="`${zone.r}%`"
      :class="{ 'zone-traitee': $store.getters.evaluationZone(zone.id) }"
      class="zone"
      @mouseover="survoleZone(zone)"
    />
    <!-- Calque orange de fond lorsqu'une zone est active -->
    <transition-fade>
      <rect
        v-if="zoneActive"
        x="0"
        y="0"
        width="100%"
        height="100%"
        class="overlay-zone"
      />
    </transition-fade>
    <transition name="vient-du-bas">
      <g v-if="zoneEvaluee || zonePrevention">
        <!-- Rectangle blanc d'interaction -->
        <rect
          :width="`${rectActions.width}%`"
          :height="`${rectActions.height}%`"
          :x="`${rectActions.x}%`"
          :y="`${rectActions.y}%`"
          :rx="rectActions.rx"
          fill="#FBF9FA"
        />
        <!-- Intérieur du rectangle blanc d'interaction -->
        <foreignObject
          :width="`${rectActions.width}%`"
          :height="`${rectActions.height}%`"
          :x="`${rectActions.x}%`"
          :y="`${rectActions.y}%`"
          :rx="rectActions.rx"
        >
          <action-prevention
            v-if="zonePrevention"
            :zone="zoneActive"
            @selectionPrevention="selectionPrevention"
          />
          <action-evaluation
            v-else
            @selectionPanneau="previentZone"
         />
        </foreignObject>
      </g>
    </transition>
    <!-- Disque découpé dans l'image de fond -->
    <transition name="restaure-position">
      <image
        v-if="zoneActive"
        :xlink:href="fondSituation"
        :style="[ { 'transform-origin': zoneActiveTransformOrigin },
                     zoneEvaluee || zonePrevention ? { transform: transformZone(2) } : '' ]"
        clip-path="url(#cercle-illustration-clip)"
        height="100%"
        width="100%"
        class="transition-transform"
      />
    </transition>
    <!-- Cercle blanc autour du disque de l'image de fond découpé -->
    <transition name="restaure-position">
      <circle
        v-if="zoneActive"
        :cx="`${zoneActive.x}%`"
        :cy="`${zoneActive.y}%`"
        :r="`${zoneActive.r}%`"
        :class="{ 'zone-agrandi': zoneEvaluee,
                  'zone-clickable': zoneSurvolee,
                  'zone-reduite':  zonePrevention }"
        :style="[{ 'transform-origin': zoneActiveTransformOrigin },
                   zoneEvaluee || zonePrevention ? { transform: transformZone(3) } : '' ]"
        class="zone transition-transform"
        @mouseout="deSurvoleZone"
        @click="evalueZone(zoneActive)"
      />
    </transition>
  </svg>
</template>

<script>
import { mapState } from 'vuex';
import gsap from 'gsap';
import 'prevention/styles/acte.scss';
import EvenementOuvertureZone from 'securite/modeles/evenement_ouverture_zone';
import TransitionFade from 'commun/vues/transition_fade';
import ActionEvaluation from './action_evaluation';
import ActionPrevention from './action_prevention';

const POSITION_CERCLE_EVALUATION = { x: 50, y: 40 };

const RECTANGLE_EVALUATION = { x: 32, y: 73, width: 35, height: 22, rx: 64 };
const RECTANGLE_PREVENTION = { x: 21.5, y: 45, width: 57, height: 44.85, rx: 30 };

export default {
  components: {
    ActionEvaluation,
    ActionPrevention,
    TransitionFade
  },

  data () {
    return {
      zoneSurvolee: null,
      zoneEvaluee: null,
      zonePrevention: null,
      rectActions: {}
    };
  },

  computed: {
    ...mapState(['fondSituation', 'zones']),
    zoneActive () {
      return this.zoneSurvolee || this.zoneEvaluee || this.zonePrevention;
    },
    zonesNonActive () {
      return this.zones.filter(z => this.zoneActive !== z);
    },
    zoneActiveTransformOrigin () {
      return `${this.zoneActive.x}% ${this.zoneActive.y}%`;
    },
    terminee () {
      return this.zones.every(zone => zone.prevention);
    }
  },

  methods: {
    transformZone (scale) {
      let transform = '';
      if (this.zonePrevention) {
        transform = `scale(0.5) translate(0, ${-5 / scale * 2}%)`;
      }
      return `scale(${scale}) translate(${(POSITION_CERCLE_EVALUATION.x - this.zoneActive.x) / scale}%, ${(POSITION_CERCLE_EVALUATION.y - this.zoneActive.y) / scale}%) ${transform}`;
    },

    survoleZone (zone) {
      this.zoneSurvolee = zone;
    },

    deSurvoleZone () {
      this.zoneSurvolee = null;
    },

    evalueZone (zone) {
      if (this.zonePrevention) return;
      this.zoneEvaluee = zone;
      this.deSurvoleZone();
      this.$journal.enregistre(new EvenementOuvertureZone({ zone: zone.id }));
    },

    previentZone (panneau) {
      this.zonePrevention = this.zoneActive;
      this.zoneEvaluee = null;
      this.$store.commit('selectionEvaluation', { id: this.zoneActive.id, panneau });
    },

    selectionPrevention () {
      this.$store.commit('selectionPrevention', { id: this.zoneActive.id });
      this.zonePrevention = null;
    },

    anime (objet, proprietes) {
      gsap.to(objet, { ...proprietes, duration: 0.3, ease: 'inOut' });
    }
  },
  watch: {
    zoneSurvolee (zone) {
      if (!zone) return;
      this.rectActions = { ...RECTANGLE_EVALUATION };
    },
    zonePrevention (zone) {
      if (!zone) return;
      this.anime(this.rectActions, RECTANGLE_PREVENTION);
    },
    terminee (terminee) {
      if (terminee) {
        this.$emit('terminer');
      }
    }
  }
};
</script>
