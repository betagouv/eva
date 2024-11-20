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
import MultiSelectMixin from './multi_select_mixin';

export default {
  mixins: [MultiSelectMixin],

  computed: {
    ...mapGetters(['texteCliquable']),

    htmlTexteCliquable() {
      if(this.question.texte_cliquable) {
        return marked(this.question.texte_cliquable);
      }
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
        if(this.question.reponses_multiples) {
          this.metAJourSelectionMultiple(lien);
          this.envoiReponseMultiple(listeLiens);
        }
        else {
          this.metAJourSelection(listeLiens, lien);
          this.envoiReponse(lien);
        }
      });
    });
  },

  methods: {
    envoiReponse(lien) {
      const reponse = lien.textContent.trim();
      const succes = this.question.reponse.texte === reponse;
      const score = succes ? this.question.score : 0;
      const scoreMax = this.question.score;
      this.$emit('reponse', { reponse, succes, score, scoreMax } );
    },

    envoiReponseMultiple(listeLiens) {
      const reponse = listeLiens
        .filter(lien => lien.classList.contains('mot-cliquable--selectionne'))
        .map(lien => lien.textContent.trim());
      this.emetReponseMultiple(reponse);
    },

    metAJourSelection(listeLiens, lien) {
      listeLiens.forEach(lien => {
        lien.classList.remove('mot-cliquable--selectionne');
      });
      lien.classList.add('mot-cliquable--selectionne');
    },

    metAJourSelectionMultiple(lien) {
      lien.classList.toggle('mot-cliquable--selectionne');
    }
  }
};
</script>
