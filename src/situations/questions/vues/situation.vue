<script>
import Situation from 'commun/vues/situation';
import { DEMARRE, FINI } from 'commun/modeles/situation';
import RegistreCampagne from 'commun/infra/registre_campagne';

export default {
  extends: Situation,

  props: {
    configurationEntrainement: {
      type: Object,
      required: false
    },
    configurationNormale: {
      type: Object,
      required: false
    },
    idSituation: {
      type: String,
      required: true
    }
  },

  computed: {
    acte () {
      if ([DEMARRE, FINI].includes(this.etat)) {
        return {
          questions: new RegistreCampagne().questions(this.idSituation)
        };
      }
      return {
        questions: new RegistreCampagne().questionsEntrainement(this.idSituation)
      };
    }
  }
};
</script>
