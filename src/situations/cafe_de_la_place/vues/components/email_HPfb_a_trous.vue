<template>
  <div class="zone-scroll">
    <div class="email-fleurs-bibelots">
      <component :is="messageEmail"/>
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
import TrouACompleter from 'cafe_de_la_place/vues/components/trou_a_completer.vue';
import emailPartie1 from 'cafe_de_la_place/vues/components/email_partie_1.vue';
import emailPartie2 from 'cafe_de_la_place/vues/components/email_partie_2.vue';

export default {
  components: { TrouACompleter, emailPartie1, emailPartie2 },

  props: {
    question: {
      type: Object,
      required: true
    },
  },

  computed: {
    topPositionScrollBar() {
      return this.question.scrollEffectue ? '25.625rem' : '0rem';
    },

    messageEmail () {
      if (this.question.scrollEffectue) return emailPartie2;
      return emailPartie1;
    },
  }
};
</script>
