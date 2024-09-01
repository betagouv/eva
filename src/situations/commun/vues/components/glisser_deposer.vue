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
      :list="fragmentsNonClasses"
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
      fragmentsNonClasses: [...this.question.fragmentsNonClasses],
      nombreFragment: this.question.fragmentsNonClasses.length,
      afficheZoneDepotDepart: true
    };
  },

  methods: {
    envoiReponse() {
      const reponse = this.fragmentsClasses.map((fragment) => fragment.position);
      const succes = this.succes(reponse);
      const score = succes ? this.calculeScore(reponse) : 0;
      const scoreMax = this.question.score;
      this.afficheZoneDepotDepart = reponse.length < this.nombreFragment;
      this.$emit('reponse', { reponse, succes, score, scoreMax });
    },

    calculeScore(reponse) {
      const nombre_biens_places = reponse
        .map((position, i) => position === i ? 1 : 0)
        .reduce((somme, element) => somme + element, 0);

      let score = nombre_biens_places;
      if(nombre_biens_places >= 5) score++;
      return score;
    },

    succes(reponse) {
      return reponse.every((position, index) => position === index);
    }
  }
};
</script>
