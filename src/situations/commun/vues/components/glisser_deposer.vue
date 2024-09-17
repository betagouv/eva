<template>
  <div class="glisser-deposer">
    <div class="container-arrivee">
      <draggable
      class="zone-depot"
      :list="fragmentsClasses"
      item-key="id"
      group="items"
      draggable=".glisser-deposer__item"
      @end="envoiReponse"
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
        <slot name="footer" :nombreFragment="nombreFragment"/>
      </template>
    </draggable>
    </div>
    <div class="container-depart">
      <draggable
      v-if="afficheZoneDepotDepart"
      :list="reponsesNonClassees"
      class="zone-depot"
      item-key="id"
      group="items"
      @end="envoiReponse"
      :sort="false"
    >
      <template #item="{ element }">
        <div
          :key="element.id"
          class="glisser-deposer__item"
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
  },

  data() {
    return {
      fragmentsClasses: [],
      nombreFragment: this.question.reponsesNonClassees.length,
      afficheZoneDepotDepart: true
    };
  },

  computed: {
    reponsesNonClassees() {
      const reponses = [...this.question.reponsesNonClassees];
      return reponses.sort((a, b) => {
        if (a.position_client === undefined) return 1;
        if (b.position_client === undefined) return -1;
        return a.position_client - b.position_client;
      });
    }
  },

  methods: {
    envoiReponse() {
      const reponse = this.fragmentsClasses.map((fragment) => fragment.position);
      const succes = this.succes(reponse);
      const scoreMax = this.question.score;
      this.afficheZoneDepotDepart = reponse.length < this.nombreFragment;
      this.$emit('deplace-item', { reponse, succes, scoreMax });
    },

    succes(reponse) {
      return reponse.every((position, index) => position === index + 1);
    }
  }
};
</script>
