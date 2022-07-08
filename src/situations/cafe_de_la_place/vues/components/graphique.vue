<template>
  <div class="graphique">
    <label class="graphique-barre moyenne">
      <span>13%</span>
    </label>
    <label
      v-for="pays in pays"
      v-bind:key="pays.id"
      class="graphique-barre graphique-barre--selectionnable"
      :class="{'graphique-barre--selectionnee': paysSelectionnes.includes(pays.id)}"
      :style="{ height: pays.hauteur }"
    >
      <input type="checkbox" class="checkbox" :value="pays.id" v-model="paysSelectionnes" />
      <span>{{pays.pourcentage}}%</span>
    </label>
  </div>
</template>

<script>
import 'cafe_de_la_place/styles/graphique.scss';

export default {

  props: {
    question: {
      type: Object,
      required: true
    },
  },

  data() {
    return {
      paysSelectionnes: [],
      pays: [
        {
          id: 'allemagne',
          pourcentage: 23,
          hauteur: '17.375rem'
        },
        {
          id: 'pologne',
          pourcentage: 18,
          hauteur: '14rem'
        },
        {
          id: 'danemark',
          pourcentage: 10,
          hauteur: '7.5rem'
        },
        {
          id: 'grece',
          pourcentage: 16,
          hauteur: '12.5rem'
        },
        {
          id: 'italie',
          pourcentage: 10,
          hauteur: '7.5rem'
        },
        {
          id: 'roumanie',
          pourcentage: 6,
          hauteur: '4.75rem'
        },
        {
          id: 'espagne',
          pourcentage: 8,
          hauteur: '6.5rem'
        },
      ]
    };
  },

  watch: {
    paysSelectionnes () {
      this.emetReponse(this.paysSelectionnes);
    }
  },

  methods: {
    emetReponse(reponse) {
      if (reponse.length === 0) {
        this.$emit('reponse');
      } else {
        const succes = this.estSucces(reponse, this.question.reponse.bonne_reponse);
        let score;
        if(succes) {
          score = this.question.reponse.score;
        }
        this.$emit('reponse', { score, succes, reponse });
      }
    },

    estSucces(reponses, reponsesAttendues) {
      const reponsesTriees = Array.from(reponses).sort();
      const reponseAttenduesTriees = Array.from(reponsesAttendues).sort();
      return reponseAttenduesTriees.length === reponsesTriees.length &&
        reponseAttenduesTriees.every((pays, index) => pays === reponsesTriees[index]);
    }
  }
};
</script>
