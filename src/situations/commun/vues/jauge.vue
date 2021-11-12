<template>
   <div class="jauge-conteneur">
    <div class="jauge">
      <input
        type="range"
        min="1"
        :max="question.choix.length"
        steps="1"
        value="4"
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
      jaugeStyle: document.createElement('style')
    };
  },

  computed: {
    jauge () {
      return document.querySelector('.jauge input');
    }
  },

  mounted () {
    document.body.appendChild(this.jaugeStyle);

    this.appliqueStyles(this.jauge, this.labelChoisi());
  },

  destroyed () {
    document.body.removeChild(this.jaugeStyle);
  },

  methods: {
    selectioneLabel (label) {
      const elementLabel = label.target;
      this.jauge.value = elementLabel.value + 1;
      this.appliqueStyles(this.jauge, elementLabel);
      this.emetSelection(elementLabel);
    },

    labelChoisi () {
      return document.querySelector(`.jauge-labels li:nth-last-child(${this.jauge.value})`);
    },

    selectionJauge () {
      const label = this.labelChoisi();
      this.appliqueStyles(this.jauge, label);
      this.emetSelection(label);
    },

    emetSelection (label) {
      this.$emit('choixjauge', label.getAttribute('id'));
    },

    appliqueStyles (jauge, label) {
      const parentLabels = document.querySelector('.jauge-labels');
      const labels = parentLabels.querySelectorAll('.label');

      labels.forEach(label => {
        label.classList.remove('selected');
      });
      label.classList.add('selected');

      let style = '';
      const pourcentageValeur = (jauge.value - 1) * (100 / (labels.length - 1));
      ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'].forEach(pref => {
        style += `.jauge input::-${pref} {background: linear-gradient(to top, #9ADBD0 0%, #9ADBD0 ${pourcentageValeur}%, #d6daec ${pourcentageValeur}%, #d6daec 100%)}`;
      });
      this.jaugeStyle.textContent = style;
    }
  }
});
</script>
