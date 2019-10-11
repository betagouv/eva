<template>
  <div
    :style="{ bottom: bottom, left: left, right: right, top: top }"
    class="fenetre">

    <formulaire-radio
      :key="etat"
      :question="question" />

  </div>
</template>

<script>
import 'securite/styles/fenetre.scss';
import FormulaireRadio from './formulaire_radio';
import { traduction } from 'commun/infra/internationalisation';
import EvenementOuvertureZone from 'securite/modeles/evenement_ouverture_zone';
import EvenementQualificationDanger from 'securite/modeles/evenement_qualification_danger';
import EvenementIdentificationDanger from 'securite/modeles/evenement_identification_danger';

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

  mounted () {
    const evenement = new EvenementOuvertureZone({ zone: this.zone.id, danger: this.zone.danger });
    this.journal.enregistre(evenement);
  },

  data () {
    const qualification = this.$store.getters.qualification(this.zone.danger);
    return {
      etat: qualification ? 'qualification' : 'identification',
      identificationDanger: {
        titre: traduction('securite.danger.identification.titre'),
        options: [
          { libelle: traduction('securite.danger.identification.oui'), valeur: 'oui' },
          { libelle: traduction('securite.danger.identification.non'), valeur: 'non' }
        ],
        bouton: traduction('securite.danger.identification.bouton'),
        choix: '',
        submit: this.identifie
      }
    };
  },

  computed: {
    bottom () {
      if (this.zone.y < 45) return undefined;
      return this.formatePourcentage((100 - this.zone.y + Math.sin(Math.PI / 4) * this.zone.r).toFixed(1));
    },
    top () {
      if (this.zone.y >= 45) return undefined;
      return this.formatePourcentage((this.zone.y + Math.sin(Math.PI / 4) * this.zone.r).toFixed(1));
    },
    left () {
      if (this.zone.x >= 70) return undefined;
      return this.formatePourcentage((this.zone.x + Math.cos(Math.PI / 4) * this.zone.r).toFixed(1));
    },
    right () {
      if (this.zone.x < 70) return undefined;
      return this.formatePourcentage((100 - (this.zone.x + Math.cos(3 * Math.PI / 4) * this.zone.r)).toFixed(1));
    },
    qualificationDanger () {
      const qualification = this.$store.getters.qualification(this.zone.danger);
      return {
        titre: traduction('securite.danger.qualification.titre'),
        options: this.$store.state.dangers[this.zone.danger].qualifications,
        bouton: traduction('securite.danger.qualification.bouton'),
        choix: qualification || '',
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
    identifie (choix) {
      const evenement = new EvenementIdentificationDanger({ zone: this.zone.id, reponse: choix, danger: this.zone.danger });
      this.journal.enregistre(evenement);
      if (this.zone.danger) {
        this.etat = 'qualification';
      } else {
        this.ferme();
      }
    },
    qualifie (choix) {
      this.$store.commit('ajouteDangerQualifie', { nom: this.zone.danger, choix });
      this.journal.enregistre(
        new EvenementQualificationDanger({
          danger: this.zone.danger,
          reponse: choix
        })
      );
      this.ferme();
    },

    ferme () {
      this.$emit('ferme');
    }
  }
};
</script>
