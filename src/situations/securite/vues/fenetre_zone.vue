<template>
  <div
    :style="{ bottom: bottom, left: left, right: right }"
    class="fenetre-zone">
    <formulaire-radio
      v-if="etatIdentification"
      :question="identificationDanger" />
  </div>
</template>

<script>
import 'securite/styles/fenetre_zone.scss';
import FormulaireRadio from './formulaire_radio';
import { traduction } from 'commun/infra/internationalisation';

export default {
  components: {
    FormulaireRadio
  },

  data () {
    return {
      etat: "identification",
      identificationDanger: {
        titre: traduction('securite.danger.titre'),
        options: [
          { libelle: traduction('securite.danger.oui'), valeur: "oui"},
          { libelle: traduction('securite.danger.non'), valeur: "non"}
        ],
        click: this.suivant
      }
    }
  },

  props: {
    zone: {
      type: Object,
      required: true
    }
  },

  methods: {
    formatePourcentage (pourcentage) {
      return `${pourcentage}%`;
    },

    suivant () {
      this.etat="qualification";
    }
  },

  computed: {
    etatIdentification () {
      return this.etat == "identification";
    },

    bottom () {
      return this.formatePourcentage((100 - this.zone.y + Math.sin(Math.PI / 4) * this.zone.r).toFixed(1));
    },
    left () {
      if (this.zone.x >= 80) return undefined;
      return this.formatePourcentage((this.zone.x + Math.cos(Math.PI / 4) * this.zone.r).toFixed(1));
    },
    right () {
      if (this.zone.x < 80) return undefined;
      return this.formatePourcentage((100 - (this.zone.x + Math.cos(3 * Math.PI / 4) * this.zone.r)).toFixed(1));
    }
  }
}
</script>
