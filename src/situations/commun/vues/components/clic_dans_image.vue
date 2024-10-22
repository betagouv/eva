<template>
  <div :class="['zone-cliquable', { 'zone-cliquable--sans-curseur': !curseur }]">
    <div v-html="reponses" class="reponses" @click="cliqueDansImage"/>
    <div v-if="curseur" v-html="curseur" class="curseur"/>
  </div>
</template>

<script>
import 'commun/styles/clic_dans_image.scss';
import { decodeBase64FromDataUrl, parseSvgFromBase64Url } from 'commun/helpers/decoders';

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
      selectionEnCours: null
    };
  },

  computed: {
    reponses() {
      return decodeBase64FromDataUrl(this.question.zone_cliquable);
    },

    curseur() {
      return decodeBase64FromDataUrl(this.question.image_au_clic);
    },

    nombreBonnesReponses() {
      const svgDocument = parseSvgFromBase64Url(this.question.zone_cliquable);
      return svgDocument.querySelectorAll(".bonne-reponse").length;
    },

    selectionMultiple() {
      return this.nombreBonnesReponses > 1;
    }
  },

  methods: {
    cliqueDansImage(event) {
      if(this.question.image_au_clic) {
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
      const sizeCurseur = 50;
      const zoneCliquable = document.querySelector('.zone-cliquable');
      const zoneCliquableRect = zoneCliquable.getBoundingClientRect();
      const curseur = document.querySelector('.curseur');
      curseur.style.display = 'block';
      curseur.style.left = `${event.clientX - zoneCliquableRect.left - (sizeCurseur / 2)}px`;
      curseur.style.top = `${event.clientY - zoneCliquableRect.top - sizeCurseur}px`;
    }
  }
};
</script>
