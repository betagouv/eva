<script>
import Situation from 'commun/vues/situation';
import { DEMARRE, FINI } from 'commun/modeles/situation';

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
    }
  },

  computed: {
    acte () {
      if ([DEMARRE, FINI].includes(this.etat)) {
        return {
          questions: this.$depotRessources.questions()
        };
      }
      return {
        questions: this.$depotRessources.questionsEntrainement()
      };
    }
  }
};
</script>
