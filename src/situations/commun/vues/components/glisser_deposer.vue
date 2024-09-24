<template>
  <div class="glisser-deposer">
    <div v-for="(zone, index) in zonesDepot"
      :key="index"
      class="container-arrivee" :style="styleZoneDepot(zone)"
    >
      <draggable
      class="zone-depot"
      :list="fragmentsClasses[index]"
      item-key="id"
      group="items"
      draggable=".glisser-deposer__item"
      @add="bonneReponse = zone.bonneReponse"
      @start="elementGlisse = true"
      @end="envoiReponse(zone.bonneReponse)"
      :sort="true"
    >
      <template #item="{ element }">
        <div
          :key="element.id"
          class="glisser-deposer__item"
        >
          <slot name="item" :item="element" />
        </div>
      </template>
      <template #footer>
        <div v-if="afficheAideDepot"
            class="aide-depot">
            {{ $traduction('commun.glisser_deposer.texte_zone_depot') }}
        </div>
      </template>
    </draggable>
    <svg
      v-if="!aideDepot"
      class="rectangle-bleu"
      :class="{ 'rectangle-bleu--cache': !elementGlisse,
                'rectangle-bleu--visible': elementGlisse }"
      viewBox="0 0 222 222" fill="none">
    </svg>
    </div>
    <div class="container-depart">
      <draggable
      v-if="afficheZoneDepotDepart"
      :list="reponsesNonClassees"
      class="zone-depot"
      item-key="id"
      group="items"
      @start="elementGlisse = true"
      @end="envoiReponse"
      :sort="false"
    >
      <template #item="{ element }">
        <div
          :key="element.id"
          class="glisser-deposer__item"
          :class="{'glisser-deposer__item--flottant': !elementGlisse }"
        >
        <slot name="item" :item="element" />
        </div>
      </template>
    </draggable>
    </div>
  </div>
</template>

<script>
import 'commun/styles/glisser_deposer.scss';
import Draggable from 'vuedraggable';

export default {
  components: { Draggable },

  props: {
    question: {
      type: Object,
      required: true
    },

    aideDepot: {
      type: Boolean,
      default: true
    },

    zonesDepot: {
      type: Array,
      default() {
        return [{ left: 0 }];
      }
    }
  },

  data() {
    return {
      fragmentsClasses: [[]],
      reponsesNonClassees: [],
      bonneReponse: undefined,
      elementGlisse: false,
      nombreFragment: this.question.reponsesNonClassees.length,
      afficheZoneDepotDepart: true,
    };
  },

  mounted() {
    this.attribueReponsesNonClassees();
    this.$nextTick(() => {
      if (this.zonesDepot.length > 1) {
        this.fragmentsClasses = Array.from({ length: this.zonesDepot.length }, () => []);
      }
    });
  },

  computed: {
    afficheAideDepot() {
      return this.aideDepot && this.reponsesNonClassees.length > 0;
    }
  },

  methods: {
    envoiReponse() {
      this.elementGlisse = false;
      const nonEmptyArray = this.fragmentsClasses.find(arr => arr.length !== 0);
      const reponse = nonEmptyArray ? nonEmptyArray.map((fragment) => fragment.position) : [];
      const succes = this.bonneReponse ?? this.succes(reponse);
      const scoreMax = this.question.score;
      this.afficheZoneDepotDepart = reponse.length < this.nombreFragment;
      this.$emit('deplace-item', { reponse, succes, scoreMax });
    },

    succes(reponse) {
      return reponse.every((position, index) => position === index + 1);
    },

    attribueReponsesNonClassees() {
      this.reponsesNonClassees = [...this.question.reponsesNonClassees];
      this.reponsesNonClassees.sort((a, b) => {
        if (a.position_client === undefined) return 1;
        if (b.position_client === undefined) return -1;
        return a.position_client - b.position_client;
      });
    },

    styleZoneDepot (zone) {
      return {
        top: `${zone.top}px`,
        left: `${zone.left}px`,
        width: `${zone.width}px`,
        height: `${zone.height}px`
      };
    }
  }
};
</script>
