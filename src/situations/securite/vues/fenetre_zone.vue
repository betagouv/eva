<template>
  <div
    v-if="etat != 'termine'"
    :style="{ bottom: bottom, left: left, right: right }"
    class="fenetre-zone">
    <formulaire-radio
      key="identification"
      v-if="etat == 'identification'"
      :question="identificationDanger" />
    <formulaire-radio
      key="qualification"
      v-else-if="etat == 'qualification'"
      :question="qualificationDanger" />
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
        titre: traduction('securite.danger.identification.titre'),
        options: [
          { libelle: traduction('securite.danger.identification.oui'), valeur: "oui"},
          { libelle: traduction('securite.danger.identification.non'), valeur: "non"}
        ],
        bouton: traduction('securite.danger.identification.bouton'),
        click: this.qualification
      },
      qualificationDanger: {
        titre: traduction('securite.danger.qualification.titre'),
        options: this.zone.qualification,
        bouton: traduction('securite.danger.qualification.bouton'),
        click: this.termine
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
    qualification () {
      this.etat = "qualification";
    },
    termine () {
      this.etat = "termine";
    }
  },

  computed: {
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
