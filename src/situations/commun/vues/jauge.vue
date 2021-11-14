<template>
   <div class="jauge-conteneur">
    <div class="jauge">
      <input
        type="range"
        min="0"
        :max="question.choix.length - 1"
        steps="1"
        :value="choixFait"
        @input="selectionJauge"
        orient="vertical"
      >
    </div>
    <ul class="jauge-labels">
      <li
        v-for="(element, index) in question.choix.slice().reverse()"
        :key="element.id"
        :id="element.id"
        :value="(question.choix.length - 1) - index"
        @click="selectioneLabel"
        class="label"
        :class="{ 'selected': choixFait === (question.choix.length - 1) - index }"
      >
        {{element.intitule}}
      </li>
    </ul>
    <div class="curseur"
         :style="positionCurseur"
      >
    </div>
  </div>
</template>

<script>

// /!\ hauteurs aussi présésentes dans jauge.scss
const TAILLE_CURSEUR = 1.5;
const TAILLE_JAUGE = 1;
const HAUTEUR_JAUGE = 14.5;

export default ({
  props: {
    question: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      jaugeStyle: document.createElement('style'),
      choixFait: Math.floor(this.question.choix.length / 2)
    };
  },

  mounted () {
    document.body.appendChild(this.jaugeStyle);
    this.ajustePourcentageJauge();
  },

  destroyed () {
    document.body.removeChild(this.jaugeStyle);
  },

  computed: {
    pourcentageValeur () {
      return this.choixFait * (100 / (this.question.choix.length - 1));
    },

    positionCurseur () {
      const hauteurDeplacement = HAUTEUR_JAUGE - TAILLE_JAUGE;
      const position = TAILLE_JAUGE / 2 +
        this.pourcentageValeur * hauteurDeplacement / 100 -
        TAILLE_CURSEUR / 2;
      return `bottom: ${position}rem;`;
    }
  },

  methods: {
    selectioneLabel (label) {
      this.choixFait = label.target.value;
      this.emetSelection();
      this.ajustePourcentageJauge();
    },

    selectionJauge (input) {
      this.choixFait = parseInt(input.target.value);
      this.emetSelection();
      this.ajustePourcentageJauge();
    },

    emetSelection () {
      const reponseChoisie = this.question.choix[this.choixFait];
      this.$emit('choixjauge', reponseChoisie.id);
    },

    ajustePourcentageJauge () {
      let style = '';
      ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'].forEach(pref => {
        style += `.jauge input::-${pref} {background: linear-gradient(to top, #9ADBD0 0%, #9ADBD0 ${this.pourcentageValeur}%, #d6daec ${this.pourcentageValeur}%, #d6daec 100%)}`;
      });
      this.jaugeStyle.textContent = style;
    }
  }
});
</script>
