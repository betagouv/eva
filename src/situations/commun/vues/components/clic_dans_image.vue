<template>
  <div :class="['zone-cliquable', { 'zone-cliquable--sans-curseur': !curseur }]">
    <div v-html="reponses" class="reponses" @click="cliqueDansImage"/>
        <div v-if="curseur" v-html="curseur"
            class="curseur"
            :style="{
              'width': `${taille_curseur}px`,
              'height': `${taille_curseur}px`
            }">
        </div>
  </div>
</template>

<script>
import 'commun/styles/clic_dans_image.scss';

export default {
  props: {
    question: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      reponsesSelectionnees: [],
      selectionEnCours: null,
      taille_curseur: 50,
    };
  },

  computed: {
    reponses() {
      const svgDoc = this.$depotRessources.zoneCliquable(this.question.nom_technique);
      if (svgDoc) { return svgDoc.outerHTML; }

      return undefined;
    },

    curseur() {
      const svgDoc = this.$depotRessources.imageAuClic(this.question.nom_technique);
      if (svgDoc) { return svgDoc.outerHTML; }

      return undefined;
    },

    nombreBonnesReponses() {
      const svgDoc = this.$depotRessources.zoneCliquable(this.question.nom_technique);
      return svgDoc.querySelectorAll(".bonne-reponse").length;
    },

    selectionMultiple() {
      return this.nombreBonnesReponses > 1;
    }
  },

  methods: {
    cliqueDansImage(event) {
      if(this.question.image_au_clic_url) {
        this.placeCurseur(event);
      } else {
        if (event.target.tagName === 'svg') return;
      }
      this.selectionEnCours = event.target;
      this.selectionMultiple ? this.gereSelectionMultiple() : this.gereSelectionSimple();
    },

    gereSelectionSimple() {
      const ancienneSelection = document.querySelector('.reponse--selectionnee');
      if (ancienneSelection) {
        this.deselectionne(ancienneSelection);
      }
      this.selectionne();
    },

    gereSelectionMultiple() {
      const estDejaSelectionnee = this.selectionEnCours.classList.contains('reponse--selectionnee');
      if (!estDejaSelectionnee && this.reponsesSelectionnees.length < this.nombreBonnesReponses) {
        this.selectionne();
      } else if (estDejaSelectionnee) {
        this.deselectionne(this.selectionEnCours);
      }
    },

    selectionne() {
      this.reponsesSelectionnees = [...this.reponsesSelectionnees, this.selectionEnCours];
      this.selectionEnCours.classList.add('reponse--selectionnee');
      this.envoiReponse();
    },

    deselectionne(selection) {
      this.reponsesSelectionnees = this.reponsesSelectionnees.filter(reponse => reponse !== selection);
      selection.classList.remove('reponse--selectionnee');
      this.envoiReponse();
    },

    envoiReponse() {
      const score = this.calculeScore();
      const scoreMax = this.question.score;
      const succes = score === scoreMax;
      this.$emit('reponse', { reponse: '', succes, score, scoreMax } );
    },

    calculeScore() {
      const scoreParReponse = this.selectionMultiple ? (this.question.score / this.nombreBonnesReponses) : this.question.score;

      let score = 0;
      this.reponsesSelectionnees.forEach(reponse => {
        if (reponse.classList.contains('bonne-reponse')) {
          score += scoreParReponse;
        }
      });

      return score;
    },

    placeCurseur(event) {
      const zoneCliquable = document.querySelector('.zone-cliquable');
      const zoneCliquableRect = zoneCliquable.getBoundingClientRect();
      const curseur = document.querySelector('.curseur');
      curseur.style.display = 'block';
      curseur.style.left = `${event.clientX - zoneCliquableRect.left - (this.taille_curseur / 2)}px`;
      curseur.style.top = `${event.clientY - zoneCliquableRect.top - this.taille_curseur}px`;
    }
  }
};
</script>
