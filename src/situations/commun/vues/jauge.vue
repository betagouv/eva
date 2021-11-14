<template>
   <div class="jauge-conteneur" :style="styleJaugeConteneur">
    <div class="jauge">
      <input
        type="range"
        min="0"
        :max="question.choix.length - 1"
        steps="1"
        :value="choixFait"
        @input="selectionJauge"
        orient="vertical"
        :style="styleJauge"
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
    <div class="curseur" :style="styleCurseur">
    </div>
  </div>
</template>

<script>

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
      hauteurJauge: 14.5,
      largeurJauge: 1,
      tailleCurseur: 1.5,
      choixFait: 0
    };
  },

  mounted () {
    this.jaugeStyle.type = 'text/css';
    document.head.appendChild(this.jaugeStyle);
    this.choixFait = Math.floor(this.question.choix.length / 2);
  },

  destroyed () {
    document.head.removeChild(this.jaugeStyle);
  },

  computed: {
    pourcentageJauge () {
      return this.choixFait * (100 / (this.question.choix.length - 1));
    },

    styleJaugeConteneur () {
      return {
        height: `${this.hauteurJauge}rem`
      };
    },

    styleJauge () {
      return {
        width: `${this.largeurJauge}rem`
      };
    },

    styleCurseur () {
      const hauteurBoutArrondi = this.largeurJauge / 2;
      const hauteurDeplacement = this.hauteurJauge - 2 * hauteurBoutArrondi;
      const position = hauteurBoutArrondi +
        this.pourcentageJauge * hauteurDeplacement / 100 -
        this.tailleCurseur / 2;
      return {
        height: `${this.tailleCurseur}rem`,
        width: `${this.tailleCurseur}rem`,
        left: `${-(this.tailleCurseur - this.largeurJauge) / 2}rem`,
        bottom: `${position}rem`
      };
    }
  },

  watch: {
    pourcentageJauge (pourcentage) {
      this.jaugeStyle.textContent =
        ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track']
          .map(pref => `.jauge input::-${pref} {background: linear-gradient(to top, #9ADBD0 0%, #9ADBD0 ${pourcentage}%, #d6daec ${pourcentage}%, #d6daec 100%)}`)
          .join('');
    }
  },

  methods: {
    selectioneLabel (label) {
      this.choixFait = label.target.value;
      this.emetSelection();
    },

    selectionJauge (input) {
      this.choixFait = parseInt(input.target.value);
      this.emetSelection();
    },

    emetSelection () {
      const reponseChoisie = this.question.choix[this.choixFait];
      this.$emit('choixjauge', reponseChoisie.id);
    }
  }
});
</script>
