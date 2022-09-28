<template>
  <div
    v-if="estSmartphoneOuTablette"
    class="actions-fleches mobile"
    >
    <button
      :class="{ 'actions-fleches--animation': choixFait === choixGauche }"
       class="bouton-arrondi bouton-arrondi--vert"
      @click="selectionne(choixGauche)"
    >
      <img
        :src="$depotRessources.flecheGauche().src"
        class="bouton-arrondi-icone bouton-arrondi-icone--droite"
      />
      <span class="bouton-arrondi-texte">{{ labelGauche }}</span>
    </button>
    <button
      :class="{ 'actions-fleches--animation': choixFait === choixDroit }"
      class="bouton-arrondi bouton-arrondi--rouge"
      @click="selectionne(choixDroit)"
    >
      <img
        :src="$depotRessources.flecheDroite().src"
        class="bouton-arrondi-icone bouton-arrondi-icone--gauche"
      />
      <span class="bouton-arrondi-texte">{{ labelDroit }}</span>
    </button>
  </div>
  <div
      v-else
      class="actions-fleches clavier">
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
import { ref } from 'vue';
import { useKeypress } from 'vue3-keypress';
import Touche from './touche';
import 'commun/styles/boutons.scss';
import 'commun/styles/choix_bidirectionnel.scss';

import { estSmartphoneOuTablette } from 'commun/helpers/mobile';


export const flecheGauche = 37;
export const flecheDroite = 39;

export default {
  components: { Touche },
  emits: ['actionGauche', 'actionDroite', 'animationGaucheTerminee', 'animationDroiteTerminee'],

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
    desactive: {
      type: Boolean,
      required: false,
      default: false
    },
    dureeAnimation: {
      type: Number,
      required: false,
      default: 500
    }
  },

  setup(props) {
    const choixFait = ref(null);
    const choixGauche = 'Gauche';
    const choixDroit = 'Droite';

    function selectionne (reponse) {
      if (props.desactive) { return; }
      if (choixFait.value !== null) { return; }

      choixFait.value = reponse;
      setTimeout(() => { choixFait.value = null; }, props.dureeAnimation);
    }

    useKeypress({
      keyEvent: "keydown",
      keyBinds: [
        {
          keyCode: flecheGauche,
          success: () => selectionne(choixGauche)
        },
        {
          keyCode: flecheDroite,
          success: () => selectionne(choixDroit)
        },
      ]
    });
    return {
      choixFait,
      choixGauche,
      choixDroit,
      selectionne
    };
  },

  data () {
    return {
      estSmartphoneOuTablette: estSmartphoneOuTablette
    };
  },

  watch: {
    choixFait (nouveauChoix, ancienChoix) {
      if(nouveauChoix == null) {
        this.$emit(`animation${ancienChoix}Terminee`);
      }
      else {
        this.$emit(`action${nouveauChoix}`);
      }
    }
  }
};
</script>
