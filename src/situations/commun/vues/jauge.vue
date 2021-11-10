<template>
   <div class="jauge-conteneur">
    <div class="jauge">
      <input
        type="range"
        min="1"
        :max="question.choix.length"
        steps="1"
        value="0"
        @input="styleTrack"
        orient="vertical"
      >
    </div>
    <ul class="jauge-labels">
      <li
        v-for="(element, index) in question.choix"
        :key="element.id"
        :id="element.id"
        :value="(question.choix.length - 1) - index"
        @click="assigneValeur"
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

  mounted () {
    this.jauge = document.querySelector('.jauge input');
    this.inverseChoix();
    document.body.appendChild(this.jaugeStyle);
  },

  destroyed () {
    document.body.removeChild(this.jaugeStyle);
  },

  methods: {
    assigneValeur (e) {
      const index = e.target.value;

      this.jauge.value = index + 1;
      this.jaugeStyle.textContent = this.appliqueTrackStyle(this.jauge);
    },

    styleTrack () {
      this.jaugeStyle.textContent = this.appliqueTrackStyle(this.jauge);
    },

    inverseChoix () {
      this.question.choix.reverse();
    },

    recupereChoixPrecedents (choix) {
      const choixPrecedents = [];

      while (choix === choix.previousElementSibling) { choixPrecedents.push(choix); }
      return choixPrecedents;
    },

    appliqueTrackStyle (el) {
      const parentLabels = document.querySelector('.jauge-labels');
      const labels = parentLabels.querySelectorAll('.label');
      const prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

      const valeurCourante = el.value;
      const valeur = (valeurCourante - 1) * (100 / (labels.length - 1));
      let style = '';

      labels.forEach(label => {
        label.classList.remove('active', 'selected');
      });

      const labelCourant = document.querySelector(`.jauge-labels li:nth-last-child(${valeurCourante})`);
      const idCourant = labelCourant.getAttribute('id');

      labelCourant.classList.add('active', 'selected');
      this.$emit('choixjauge', idCourant);

      this.recupereChoixPrecedents(labelCourant).forEach(el => { el.classList.add('selected'); });

      prefs.forEach(pref => {
        style += `.jauge input::-${pref} {background: linear-gradient(to top, #9ADBD0 0%, #9ADBD0 ${valeur}%, #d6daec ${valeur}%, #d6daec 100%)}`;
      });
      return style;
    }
  }
});
</script>
