<template>
  <div v-if="question.texte_a_trous" class="liste-de-courses">
    <component :is="texteATrous" />
  </div>
  <div v-else class="liste-de-courses">
    <h1 class="liste-de-courses__titre">Courses pour la <trou-a-completer idQuestion="APlc1"/></h1>
    <ul class="liste-de-courses__liste">
      <li>2 <trou-a-completer idQuestion="APlc2"/> en <trou-a-completer idQuestion="APlc3"/></li>
      <li>1 pot de <trou-a-completer idQuestion="APlc4"/></li>
      <li>Du <trou-a-completer idQuestion="APlc5"/></li>
      <li>2 kilos de <trou-a-completer idQuestion="APlc6"/> de <trou-a-completer idQuestion="APlc7"/></li>
      <li>4 <trou-a-completer idQuestion="APlc8"/></li>
      <li>Des <trou-a-completer idQuestion="APlc9"/> qui <trou-a-completer idQuestion="APlc10"/> du goût</li>
      <li>2 <trou-a-completer idQuestion="APlc11"/> d'<trou-a-completer idQuestion="APlc12"/></li>
      <li>2 <trou-a-completer idQuestion="APlc13"/></li>
      <li>1 <trou-a-completer idQuestion="APlc14"/></li>
      <li>1 <trou-a-completer idQuestion="APlc15"/></li>
      <li>1 <trou-a-completer idQuestion="APlc16"/> de <trou-a-completer idQuestion="APlc17"/></li>
      <li>1 <trou-a-completer idQuestion="APlc18"/> qui n'<trou-a-completer idQuestion="APlc19"/> pas</li>
      <li>1 solution <trou-a-completer idQuestion="APlc20"/></li>
    </ul>
  </div>
</template>

<script>
import 'cafe_de_la_place/styles/liste_courses_a_trous.scss';
import TrouACompleter from 'cafe_de_la_place/vues/components/trou_a_completer.vue';

export default {
  components: { TrouACompleter },
  props: {
    question: {
      type: Object,
    },
  },

  computed: {
    texteATrous() {
      return {
        template: `${this.question.texte_a_trous}`,
        components: {
          'trou-a-completer': TrouACompleter
        }
      };
    }
  }
};
</script>
