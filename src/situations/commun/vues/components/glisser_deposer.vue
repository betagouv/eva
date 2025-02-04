<template>
  <div class="glisser-deposer">
    <div v-for="(zone, index) in zonesDepot" :key="index" class="container-arrivee" :style="positionZoneDepot(zone)">
      <draggable
        :class="`zone-depot zone-depot--${zone.nomTechnique}`"
        :data-nom-technique="zone.nomTechnique"
        :data-index="index"
        :list="zonesDeClassement[index]"
        item-key="id"
        group="items"
        draggable=".glisser-deposer__item"
        @start="elementGlisse = true"
        @end="deplaceElement($event)"
        @add="remplaceElement($event, index)"
        :sort="true"
      >
        <template #item="{ element }">
          <div :key="element.id" :class="`glisser-deposer__item item--${element.nom_technique}`" :data-nom-technique="element.nom_technique">
            <slot name="item" :item="element" />
          </div>
        </template>
        <template #footer>
          <div v-if="afficheAideDepot" class="aide-depot">
            {{ $traduction('commun.glisser_deposer.texte_zone_depot') }}
          </div>
        </template>
      </draggable>
      <glisser-deposer-ombre :aide-depot="aideDepot" :element-glisse="elementGlisse"/>
    </div>
    <div class="container-depart">
      <draggable
        v-if="afficheZoneDepotDepart"
        :list="reponsesNonClassees"
        class="zone-depot"
        :style="styleContainerDepart"
        item-key="id"
        group="items"
        @start="elementGlisse = true"
        @end="deplaceElement($event)"
        :sort="false"
      >
        <template #item="{ element }">
          <div :key="element.id" :class="`glisser-deposer__item item--${element.nom_technique}`" :data-nom-technique="element.nom_technique">
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
import GlisserDeposerOmbre from './glisser_deposer_ombre';

export default {
  components: { Draggable, GlisserDeposerOmbre },

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
      default: () => [{ left: 0 }]
    },
    styleContainerDepart: {
      type: Object,
    },
  },

  data() {
    return {
      zonesDeClassement: this.zonesDepot.length > 1 ? Array.from({ length: this.zonesDepot.length }, () => []) : [[]],
      reponsesNonClassees: [],
      reponsesPlacees: this.zonesDepot.length > 1 ? Array.from({ length: this.zonesDepot.length }, () => ({ reponse: null, succes: false })) : [{}],
      elementGlisse: false,
      afficheZoneDepotDepart: true,
      zoneDepotMultiple: this.zonesDepot.length > 1
    };
  },

  computed: {
    afficheAideDepot() {
      return this.aideDepot && this.reponsesNonClassees.length > 0;
    }
  },

  mounted() {
    this.ordonneReponsesNonClassees();
  },

  methods: {
    deplaceElement(event) {
      this.elementGlisse = false;
      this.zoneDepotMultiple ? this.envoiReponseMultiple(event) : this.envoiReponse();
    },

    envoiReponseMultiple(event) {
      const index = event.to.dataset.index;
      const nomTechniqueReponse = event.item.dataset.nomTechnique;
      const nomTechniqueZone = event.to.dataset.nomTechnique;
      const succes = nomTechniqueReponse === nomTechniqueZone;
      const reponse = { reponse: nomTechniqueReponse, succes };
      this.reponsesPlacees[index] = reponse;
      this.$emit('deplace-item', this.reponsesPlacees);
    },

    envoiReponse() {
      const reponsesClassees = this.zonesDeClassement.flat();
      const reponse = reponsesClassees ? reponsesClassees.map(reponse => reponse.position) : [];
      const succes = this.succes(reponse);
      this.afficheZoneDepotDepart = this.reponsesNonClassees.length > 0;
      this.$emit('ordonne-item', { reponse, succes: succes });
    },

    succes(reponse) {
      return reponse.every((position, index) => position === index + 1);
    },

    ordonneReponsesNonClassees() {
      this.reponsesNonClassees = [...this.question.reponsesNonClassees].sort((a, b) => {
        if (a.position_client === undefined) return 1;
        if (b.position_client === undefined) return -1;
        return a.position_client - b.position_client;
      });
    },

    positionZoneDepot(zone) {
      return {
        top: `${zone.top}px`,
        left: `${zone.left}px`,
        width: `${zone.width}px`,
        height: `${zone.height}px`
      };
    },

    remplaceElement(event, indexZone) {
      if (this.zoneDepotMultiple && this.zonesDeClassement[indexZone].length > 1) {
        const elementAremplacer = this.zonesDeClassement[indexZone].find((item, i) => i !== event.newIndex);
        this.zonesDeClassement[indexZone] = this.zonesDeClassement[indexZone].filter((item, i) => i === event.newIndex);
        this.reponsesNonClassees = [...this.reponsesNonClassees, elementAremplacer];
      }
    }
  }
};
</script>
