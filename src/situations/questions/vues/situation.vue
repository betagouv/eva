<script>
import Situation from 'commun/vues/situation';

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
      return {
        questions: this.$depotRessources.questions()
      };
    }
  }
};
</script>
