<script>
import Situation from 'commun/vues/situation';
import { DEMARRE, FINI } from 'commun/modeles/situation';
import RegistreCampagne from 'commun/infra/registre_campagne';

export default {
  extends: Situation,

  props: {
    idSituation: {
      type: String,
      required: true
    }
  },

  computed: {
    acte () {
      let questions = {};
      if ([DEMARRE, FINI].includes(this.etat)) {
        questions = new RegistreCampagne().questions(this.idSituation);
      } else {
        questions = new RegistreCampagne().questionsEntrainement(this.idSituation);
      }
      return {
        questions: questions,
        fondSituation: this.$depotRessources.fondSituation().src
      };
    }
  }
};
</script>
