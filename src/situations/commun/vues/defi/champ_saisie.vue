<template>
  <div class="defi-champ-saisie"
       :class="{'defi-champ-saisie--decale': afficheLectureQuestion }">
    <bouton-lecture
      v-if="afficheLectureReponse"
      :nomTechnique="question.reponse.nom_technique"
      :avecTexte="true"
      ref="boutonLecture"
    />
    <div class="champ-saisie-conteneur"
         :class="{ 'chiffres-espaces' : question.espacerChiffres }">
      <div
         v-if="estNumerique"
         class="conteneur-traits-saisie"
       >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <input
          v-on:input="emetReponse($event.target.value)"
          class="champ"
          :class="{ 'champ-texte' : estTexte,
                    'champ-numerique' : estNumerique }"
          :maxlength="maxLength"
          :placeholder="question.placeholder"
          type='text'
          />
    </div>
  </div>
</template>

<script>
import 'commun/styles/champ.scss';
import 'commun/styles/defi/champ_saisie.scss';
import BoutonLecture from 'commun/vues/bouton_lecture';

export default {
  props: {
    question: {
      type: Object,
      required: true
    }
  },

  components: { BoutonLecture },

  computed: {
    estTexte () {
      return this.question.sous_type === 'texte';
    },
    estNumerique () {
      return this.question.sous_type === 'numerique';
    },
    maxLength () {
      return this.estNumerique ? 4 : 12;
    },

    afficheLectureReponse () {
      return this.question.reponse && this.$depotRessources.existeMessageAudio(this.question.reponse.nom_technique);
    },

    afficheLectureQuestion () {
      return this.$depotRessources.existeMessageAudio(this.question.nom_technique);
    }
  },

  methods: {
    emetReponse (valeur) {
      const reponse = valeur.trim();
      this.$emit('input', { reponse: reponse, succes: reponse.toLowerCase() === this.question.reponse.texte });
    },

    demarreSon() {
      if (this.afficheLectureReponse) {
        this.$refs.boutonLecture.demarreSon();
      }
    }
  }
};
</script>
