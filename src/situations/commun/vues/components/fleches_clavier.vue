<template>
  <div class="actions-fleches clavier">
    <Keypress key-event="keydown" :key-code="flecheGauche" @success="selectionne(choixGauche)" />
    <Keypress key-event="keydown" :key-code="flecheDroite" @success="selectionne(choixDroit)" />
    <div
      :class="{ 'actions-fleches--animation': choixFait === choixGauche }"
      class="touches-horizontales touche-gauche">
      <touche :label-gauche="labelGauche" couleur="verte" />
    </div>
    <div class="touches-verticales" >
      <touche :rotation=90 />
      <touche :rotation=270 />
    </div>
    <div
      :class="{ 'actions-fleches--animation': choixFait === choixDroit }"
      class="touches-horizontales touche-droite">
      <touche
        :rotation=180
        couleur="rouge"
        :label="labelDroit" />
    </div>
  </div>
</template>

<script>
import Touche from './touche';
import Keypress from 'vue-keypress';
import 'commun/styles/fleches_clavier.scss';

export const flecheGauche = 37;
export const flecheDroite = 39;

export default {
  components: { Touche, Keypress },

  props: {
    labelGauche: {
      type: String,
      required: false,
      default: 'Vers la gauche'
    },
    labelDroit: {
      type: String,
      required: false,
      default: 'Vers la droite'
    },
    actionGauche: {
      type: Function,
      required: false
    },
    actionDroite: {
      type: Function,
      required: false
    },
    animationGaucheTerminee: {
      type: Function,
      required: false
    },
    animationDroiteTerminee: {
      type: Function,
      required: false
    },
    dureeAnimation: {
      type: Number,
      required: false,
      default: 500
    }
  },

  data () {
    return {
      choixGauche: 'gauche',
      choixDroit: 'droite',
      choixFait: null,
      flecheGauche,
      flecheDroite
    };
  },

  methods: {
    selectionne (reponse) {
      if (this.choixFait !== null) { return; }

      this.choixFait = reponse;
      this.$emit(`action${this.capitalizeFirstLetter(reponse)}`, reponse);
      setTimeout(() => {
        this.choixFait = null;
        this.$emit(`animation${this.capitalizeFirstLetter(reponse)}Terminee`, reponse);
      }, this.dureeAnimation);
    },
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>
