<template>
  <ul class="liste-chansons">
    <li>
      <span class="mot"
              @click="selectionneMot"
              :class="{ 'mot--selectionne': estSelectionne('Max') }"
              >Max
      </span>
    </li>
    <li>
      <span class="mot">Jazz</span> à <span class="mot">Dimoudon</span>
    </li>
    <li>
      <span class="mot">Baille</span> et <span class="mot">taille</span>
    </li>
    <li>Le 
      <span class="mot">fil</span> du <span class="mot">temps</span>
    </li>
    <li>
      <span
          class="mot"
          @click="selectionneMot"
          :class="{ 'mot--selectionne': estSelectionne('Exercice') }"
        >Exercice</span> de <span class="mot">style</span>
    </li>
    <li>
      <span class="mot">Amour</span> <span class="mot">succulent</span>
    </li>
    <li>
      <span class="mot">Soupçon</span> d'<span class="mot">amertume</span>
    </li>
    <li>
      <span class="mot">Anguille</span> et <span class="mot">douce</span> <span class="mot">mer</span>
    </li>
    <li>
      <span class="mot">Sourire</span> <span class="mot">toujours</span>
    </li>
    <li>Un 
      <span class="mot">ami</span>, un <span class="mot">amant</span>
    </li>
    <li>
      <span class="mot">Duxo</span> et <span class="mot">matura</span>
    </li>
  </ul>
</template>

<script>
import 'cafe_de_la_place/styles/clic_sur_mots.scss';

export default {
  data () {
    return {
      motSelectionne: ''
    };
  },

  methods: {
    selectionneMot(event) {
      this.motSelectionne = event.target.innerText;
    },

    estSelectionne (mot) {
      return mot === this.motSelectionne;
    }
  }
};
</script>
