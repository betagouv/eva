<template>
  <div :class="`glisser-deposer glisser-deposer--${statut}`">
    <div v-for="(zone, index) in zonesDepot" :key="index" class="container-arrivee" :style="positionZoneDepot(zone)">
      <draggable
        :class="`zone-depot zone-depot--${zone.nomTechnique}`"
        :list="zonesDeClassement[index]"
        item-key="id"
        group="items"
        draggable=".glisser-deposer__item"
        @start="elementGlisse = true"
        @end="deplaceElement($event)"
        :sort="true"
      >
        <template #item="{ element }">
          <div :key="element.id" :class="`glisser-deposer__item item--${element.nom_technique}`">
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
        item-key="id"
        group="items"
        @start="elementGlisse = true"
        @end="deplaceElement($event)"
        :sort="false"
      >
        <template #item="{ element }">
          <div :key="element.id" :class="[`glisser-deposer__item item--${element.nom_technique}`, { 'glisser-deposer__item--flottant': !elementGlisse }]">
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
    }
  },

  data() {
    return {
      zonesDeClassement: this.zonesDepot.length > 1 ? Array.from({ length: this.zonesDepot.length }, () => []) : [[]],
      reponsesNonClassees: [],
      elementGlisse: false,
      afficheZoneDepotDepart: true,
      zoneDepotMultiple: this.zonesDepot.length > 1,
      statut: this.question.zone_depot_url ? 'personnalise' : 'default'
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
      const nomTechniqueReponse = this.extraitNomTechnique(event.item, 'item--');
      const nomTechniqueZone = this.extraitNomTechnique(event.to, 'zone-depot--');
      const succes = nomTechniqueReponse === nomTechniqueZone;
      this.afficheZoneDepotDepart = this.reponsesNonClassees.length > 0;
      this.$emit('deplace-item', { reponse: nomTechniqueReponse, succes });
    },

    extraitNomTechnique(element, prefix) {
      const match = element.getAttribute('class').match(new RegExp(`${prefix}(\\w+)`));
      return match ? match[1] : null;
    },

    envoiReponse(succes) {
      const reponsesClassees = this.zonesDeClassement.flat();
      const reponse = reponsesClassees ? reponsesClassees.map(reponse => reponse.position) : [];
      const finalSucces = succes !== undefined ? succes : this.succes(reponse);
      this.afficheZoneDepotDepart = this.reponsesNonClassees.length > 0;
      this.$emit('ordonne-item', { reponse, succes: finalSucces });
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
    }
  }
};
</script>
