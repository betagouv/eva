<template>
  <ul class="liste-chansons">
    <li>
      <mot-cliquable :libelle="'Max'"
                     :estSelectionne="estSelectionne('Max')"
                     @click.native="selectionneMot"
      />
    </li>
    <li>
      <mot-cliquable :libelle="'Jazz'"
                     :estSelectionne="estSelectionne('Jazz')"
                     @click.native="selectionneMot"
      /> à 
      <mot-cliquable :libelle="'Dimoudon'"
                     :estSelectionne="estSelectionne('Dimoudon')"
                     @click.native="selectionneMot"
      />
    </li>
    <li>
      <mot-cliquable :libelle="'Baille'"
                     :estSelectionne="estSelectionne('Baille')"
                     @click.native="selectionneMot"
      /> et 
      <mot-cliquable :libelle="'taille'"
                     :estSelectionne="estSelectionne('taille')"
                     @click.native="selectionneMot"
      />
    </li>
    <li>Le 
      <mot-cliquable :libelle="'fil'"
                     :estSelectionne="estSelectionne('fil')"
                     @click.native="selectionneMot"
      /> du 
      <mot-cliquable :libelle="'temps'"
                     :estSelectionne="estSelectionne('temps')"
                     @click.native="selectionneMot"
      />
    </li>
    <li>
      <mot-cliquable :libelle="'Exercice'"
                     :estSelectionne="estSelectionne('Exercice')"
                     @click.native="selectionneMot"
      /> de 
      <mot-cliquable :libelle="'style'"
                     :estSelectionne="estSelectionne('style')"
                     @click.native="selectionneMot"
      />
    </li>
    <li>
      <mot-cliquable :libelle="'Amour'"
                     :estSelectionne="estSelectionne('Amour')"
                     @click.native="selectionneMot"
      /> 
      <mot-cliquable :libelle="'succulent'"
                     :estSelectionne="estSelectionne('succulent')"
                     @click.native="selectionneMot"
      />
    </li>
    <li>
      <mot-cliquable :libelle="'Soupçon'"
                     :estSelectionne="estSelectionne('Soupçon')"
                     @click.native="selectionneMot"
      /> d'
      <mot-cliquable :libelle="'amertume'"
                     :estSelectionne="estSelectionne('amertume')"
                     @click.native="selectionneMot"
      />
    </li>
    <li>
      <mot-cliquable :libelle="'Anguille'"
                     :estSelectionne="estSelectionne('Anguille')"
                     @click.native="selectionneMot"
      /> et 
      <mot-cliquable :libelle="'douce'"
                     :estSelectionne="estSelectionne('douce')"
                     @click.native="selectionneMot"
      /> 
      <mot-cliquable :libelle="'mer'"
                     :estSelectionne="estSelectionne('mer')"
                     @click.native="selectionneMot"
      />
    </li>
    <li>
      <mot-cliquable :libelle="'Sourire'"
                     :estSelectionne="estSelectionne('Sourire')"
                     @click.native="selectionneMot"
      /> 
      <mot-cliquable :libelle="'toujours'"
                     :estSelectionne="estSelectionne('toujours')"
                     @click.native="selectionneMot"
      />
    </li>
    <li>Un 
      <mot-cliquable :libelle="'ami'"
                     :estSelectionne="estSelectionne('ami')"
                     @click.native="selectionneMot"
      />, un 
      <mot-cliquable :libelle="'amant'"
                     :estSelectionne="estSelectionne('amant')"
                     @click.native="selectionneMot"
      />
    </li>
    <li>
      <mot-cliquable :libelle="'Duxo'"
                     @click.native="selectionneMot"
                     :estSelectionne="estSelectionne('Duxo')"
      /><mot-cliquable :libelle="'matura'"
                     @click.native="selectionneMot"
                     :estSelectionne="estSelectionne('matura')"
      />
    </li>
  </ul>
</template>

<script>
import 'cafe_de_la_place/styles/clic_sur_mots.scss';
import motCliquable from './mot_cliquable.vue';

export default {
  components: { motCliquable },

  data () {
    return {
      motSelectionne: ''
    };
  },

  methods: {
    selectionneMot(event) {
      return this.motSelectionne = event.target.innerText.trim();
    },

    estSelectionne (mot) {
      return mot.trim() === this.motSelectionne;
    }
  }
};
</script>
