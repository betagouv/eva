<template>
  <div class="zone-scroll">
    <div v-if="question.texte_a_trous" class="email-fleurs-bibelots">
      <component :is="texteATrous" />
    </div>
    <div v-else class="email-fleurs-bibelots">
      <email-partie-1 v-if="question.numero_page == 1" :texte_a_trous="question.texte_a_trous"/>
      <email-partie-2 v-else  :texte_a_trous="question.texte_a_trous" />
    </div>
    <svg
      class="zone-scroll__ascenseur"
      :style="{ 'margin-top': topPositionScrollBar }"
      width="8"
      height="100"
      viewBox="0 0 8 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="8" height="100" rx="4" fill="#D6DAEC"/>
    </svg>
  </div>
</template>

<script>
import 'cafe_de_la_place/styles/email_HPfb_a_trous.scss';
import emailPartie1 from 'cafe_de_la_place/vues/components/email_partie_1.vue';
import emailPartie2 from 'cafe_de_la_place/vues/components/email_partie_2.vue';
import TrouACompleter from 'cafe_de_la_place/vues/components/trou_a_completer.vue';

export default {
  components: { emailPartie1, emailPartie2 },

  props: {
    question: {
      type: Object,
      required: true
    },
  },

  computed: {
    topPositionScrollBar() {
      return this.question.numero_page == 1 ? '0rem' : '25.625rem';
    },

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
