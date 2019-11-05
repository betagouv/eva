<template>
  <div
    :style="{ bottom: bottom, left: left, right: right, top: top }"
    class="fenetre">

    <div v-if="etat === 'deja-identifie'">
      <p>{{ $traduction('securite.danger.deja-identifie.texte') }}</p>
      <button
        class="bouton-arrondi bouton-arrondi--petit"
        @click="ferme"
        >{{ $traduction('securite.danger.deja-identifie.bouton') }}</button>
    </div>
    <resultat-identification
      v-else-if="etat == 'resultat-identification'"
      :succesIdentification="succesIdentification"
      :danger="zone.danger != undefined"
      @termine="termineIdentification"
      />
    <formulaire-radio
      v-else
      :key="etat"
      :question="question" />

  </div>
</template>

<script>
import 'commun/styles/fenetre.scss';
import FormulaireRadio from './formulaire_radio';
import ResultatIdentification from './resultat_identification';
import { traduction } from 'commun/infra/internationalisation';
import EvenementOuvertureZone from 'securite/modeles/evenement_ouverture_zone';
import EvenementQualificationDanger from 'securite/modeles/evenement_qualification_danger';
import EvenementIdentificationDanger from 'securite/modeles/evenement_identification_danger';

export default {
  components: {
    FormulaireRadio,
    ResultatIdentification
  },

  props: {
    zone: {
      type: Object,
      required: true
    }
  },

  mounted () {
    const evenement = new EvenementOuvertureZone({ zone: this.zone.id, danger: this.zone.danger });
    this.$journal.enregistre(evenement);
  },

  data () {
    const dejaQualifie = this.$store.getters.qualification(this.zone.danger);
    const nonDangerDejaIdentifie = this.$store.state.nonDangersIdentifies.includes(this.zone.id);
    const etatInitial = () => {
      if (nonDangerDejaIdentifie) return 'deja-identifie';
      else if (dejaQualifie) return 'qualification';
      return 'identification';
    };
    return {
      etat: etatInitial(),
      succesIdentification: null,
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
      if (this.zone.y < 50) return undefined;
      return this.formatePourcentage((100 - this.zone.y + Math.sin(Math.PI / 4) * this.zone.r).toFixed(1));
    },
    top () {
      if (this.zone.y >= 50) return undefined;
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
      this.$journal.enregistre(evenement);

      const estUnDanger = !!this.zone.danger;
      const aIdentifieUnDanger = choix === 'oui';
      this.succesIdentification = estUnDanger === aIdentifieUnDanger;
      this.etat = 'resultat-identification';
    },
    termineIdentification () {
      if (this.zone.danger) {
        this.etat = 'qualification';
      } else {
        this.$store.commit('ajouteNonDangerIdentifie', this.zone.id);
        this.ferme();
      }
    },
    qualifie (choix) {
      this.$store.commit('ajouteDangerQualifie', { nom: this.zone.danger, choix });
      this.$journal.enregistre(
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
