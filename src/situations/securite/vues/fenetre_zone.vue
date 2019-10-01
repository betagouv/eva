<template>
  <div
    :style="{ bottom: bottom, left: left, right: right }"
    class="fenetre-zone">

    <formulaire-radio
      :key="etat"
      :question="question" />

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

  props: {
    zone: {
      type: Object,
      required: true
    }
  },

  data () {
    const qualification = this.$store.getters.qualification(this.zone.danger);
    return {
      etat: qualification ? 'qualification' : 'identification',
      identificationDanger: {
        titre: traduction('securite.danger.identification.titre'),
        options: [
          { libelle: traduction('securite.danger.identification.oui'), valeur: "oui"},
          { libelle: traduction('securite.danger.identification.non'), valeur: "non"}
        ],
        bouton: traduction('securite.danger.identification.bouton'),
        choix: '',
        submit: this.identifie
      }
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
    },
    qualificationDanger () {
      const qualification = this.$store.getters.qualification(this.zone.danger);
      return {
        titre: traduction('securite.danger.qualification.titre'),
        options: this.$store.state.dangers[this.zone.danger].qualifications,
        bouton: traduction('securite.danger.qualification.bouton'),
        choix: qualification ? qualification : '',
        submit: this.qualifie
      };
    },
    question () {
      return this.etat === 'identification' ? this.identificationDanger : this.qualificationDanger;
    }
  },

  methods: {
    formatePourcentage (pourcentage) {
      return `${pourcentage}%`;
    },
    identifie () {
      if (this.zone.danger) {
        this.etat = 'qualification';
      } else {
        this.ferme();
      }
    },
    qualifie (choix) {
      this.$store.commit('ajouteDangerQualifie', { nom: this.zone.danger, choix });
      this.ferme();
    },

    ferme () {
      this.$emit('ferme');
    }
  }
}
</script>
