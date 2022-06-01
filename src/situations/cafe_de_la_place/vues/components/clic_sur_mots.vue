<template>
  <div ref="zoneCliquable"
       v-html="htmlTexteCliquable"
       :class="presentationZoneCliquable"
  ></div>
</template>

<script>
import { mapGetters } from 'vuex';
import 'cafe_de_la_place/styles/clic_sur_mots.scss';
import { marked } from 'marked';

export default {
  props: {
    question: {
      type: Object,
      required: true
    },
  },

  computed: {
    ...mapGetters(['texteCliquable']),

    htmlTexteCliquable() {
      return marked(this.texteCliquable);
    },

    presentationZoneCliquable() {
      return 'zone-cliquable ' + this.question.zone_cliquable;
    }
  },

  mounted() {
    const listeLiens = Array.from(this.$refs.zoneCliquable.getElementsByTagName("a"));
    listeLiens.forEach(lien => {
      lien.classList.add('mot-cliquable');
      lien.addEventListener('click', (event) => {
        event.preventDefault(); // empêche le comportement par défaut du lien
        this.envoiReponse(lien);
        this.metAJourSelection(listeLiens, lien);
      });
    });
  },

  methods: {
    envoiReponse(lien) {
      const reponse = lien.textContent.trim();
      const succes = this.question.reponse.texte === reponse;
      const score = succes ? this.question.reponse.score : 0;
      this.$emit('reponse', { reponse, succes, score } );
    },

    metAJourSelection(listeLiens, lien) {
      listeLiens.forEach(lien => {
        lien.classList.remove('mot-cliquable--selectionne');
      });
      lien.classList.add('mot-cliquable--selectionne');
    }
  }
};
</script>
