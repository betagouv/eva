<template>
  <form
    class="overlay modale modale-formulaire"
    @submit.prevent="envoieFormulaire">
    <div>
      <h2 v-html="$traduction('accueil.donnee_sociodemographique.titre', { nom: nom })" class="scene-titre"></h2>
      <p class="formulaire-sociodemographique-description" v-html="$traduction('accueil.donnee_sociodemographique.description')"></p>
      <p class="formulaire-sociodemographique-avertissement" v-html="avertissement"></p>
      <div class="elements-formulaire">
        <div class="element-formulaire" ><h3 class="m-0 formulaire-sociodemographique-vous">Vous</h3></div>
        <div class="element-formulaire" ><h3 class="m-0 formulaire-sociodemographique-votre-parcours">Votre parcours</h3></div>
        <champ-formulaire
          v-model="age"
          nom="donnee_sociodemographique.age"
          :post-label="$traduction('accueil.donnee_sociodemographique.unite_age')"
          :erreurs="erreurs"
          typeInput="number"
          :min="0"
          classSpecifique="champ-age"
        />
        <champ-formulaire
          v-model="dernier_niveau_etude"
          :options="niveaux_etude"
          nom="donnee_sociodemographique.dernier_niveau_etude"
          typeInput="select"
          :erreurs="erreurs"
        />
        <champ-formulaire
          v-model="genre"
          nom="donnee_sociodemographique.genre"
          :options="genres"
          typeInput="select"
          :erreurs="erreurs"
        />
        <champ-formulaire
          v-model="derniere_situation"
          nom="donnee_sociodemographique.derniere_situation"
          :options="situations"
          typeInput="select"
          :erreurs="erreurs"
        />
      </div>
      <div class="element-formulaire">
        <button class="bouton-arrondi bouton-sociodemographique">
          {{ $traduction('accueil.donnee_sociodemographique.bouton') }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import { marked } from 'marked';
import 'accueil/styles/formulaire.scss';
import 'commun/styles/boutons.scss';
import ChampFormulaire from 'accueil/vues/champ_formulaire';

export default {
  components: { ChampFormulaire },

  data () {
    return {
      age: null,
      genre: null,
      dernier_niveau_etude: null,
      derniere_situation: null,
      enCours: false,
      genres: [
        'Homme',
        'Femme',
        'Autre genre'
      ],
      niveaux_etude: [
        'Niveau Collège',
        'Niveau CFG / DNB (BEPC)',
        'Niveau CAP / BEP',
        'Niveau Bac',
        'Niveau Bac +2',
        'Supérieur Bac +2'
      ],
      situations: [
        'Scolarisation',
        'Formation professionnelle',
        'Alternance',
        'Emploi',
        'Sans emploi'
      ],
      erreurs: {}
    };
  },

  computed: {
    ...mapState(['nom']),

    avertissement () {
      return marked(this.$traduction('accueil.donnee_sociodemographique.avertissement'));
    }
  },

  methods: {
    envoieFormulaire () {
      this.erreurs = {};
      return this.$store.dispatch('enregistreDonneesComplementaires', {
        donnee_sociodemographique_attributes: {
          age: this.age,
          genre: this.genre,
          dernier_niveau_etude: this.dernier_niveau_etude,
          derniere_situation: this.derniere_situation
        }
      })
        .catch((xhr) => {
          this.erreurs = xhr.responseJSON;
        });
    }
  }
};
</script>
