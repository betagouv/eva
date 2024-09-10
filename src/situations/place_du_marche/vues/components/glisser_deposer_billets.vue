<template>
  <glisser-deposer
    :question="question"
    class="glisser-deposer-billets"
    @deplace-item="envoiReponse"
    >
    <template #item="{ item }">
      <img :src="item.illustration"/>
    </template>
    <template #footer="{ nombreFragment }">
      <div class="glisser-deposer__footer">
        <div v-for="element in nombreFragment" :key="element" class="zone-vide"/>
      </div>
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

  methods: {
    envoiReponse(reponse) {
      if(reponse.reponse.length === this.question.reponsesNonClassees.length) {
        this.$emit('reponse', reponse );
      }
    }
  }
};
</script>
