<template>
  <consigne
    :titreConsigne="traduction('situation.titre_transition')"
    :message="message"
    @consigne-fini="fini"
  >
  </consigne>
</template>

<script>
import 'commun/styles/modale.scss';
import Consigne, { CONSIGNE_FINI } from 'commun/vues/consigne';
import { traduction } from 'commun/infra/internationalisation';

export default {
  components: { Consigne },
  props: {
    identifiantSituation: {
      type: String,
      required: true
    }
  },

  computed: {
    message () {
      return traduction(`${this.identifiantSituation}.intro_contexte.message_transition`);
    }
  },

  methods: {
    fini () {
      this.$emit(CONSIGNE_FINI);
    }
  }
};
</script>
