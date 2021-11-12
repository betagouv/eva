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
      const pourcentageValeur = this.choixFait * (100 / (this.question.choix.length - 1));
      ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'].forEach(pref => {
        style += `.jauge input::-${pref} {background: linear-gradient(to top, #9ADBD0 0%, #9ADBD0 ${pourcentageValeur}%, #d6daec ${pourcentageValeur}%, #d6daec 100%)}`;
      });
      this.jaugeStyle.textContent = style;
    }
  }
});
</script>
