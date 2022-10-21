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
        { label: 'Homme', nom_technique: 'homme' },
        { label: 'Femme', nom_technique: 'femme' },
        { label:'Autre', nom_technique: 'autre' },
      ],
      niveaux_etude: [
        { label: 'Collège', nom_technique: 'college' },
        { label: 'CFG / DNB (BEPC)', nom_technique: 'cfg_dnb_bepc' },
        { label: 'CAP / BEP', nom_technique: 'cap_bep' },
        { label: 'Bac', nom_technique: 'bac' },
        { label: 'Bac+2', nom_technique: 'bac_plus2' },
        { label: 'supérieur à Bac+2', nom_technique: 'superieur_bac_plus2' },
      ],
      situations: [
        { label: 'Scolarisation', nom_technique: 'scolarisation' },
        { label: 'Formation professionnelle', nom_technique: 'formation_professionnelle' },
        { label: 'Alternance', nom_technique: 'alternance' },
        { label: 'Emploi', nom_technique: 'emploi' },
        { label: 'Sans emploi', nom_technique: 'sans_emploi' },
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
          genre: this.genre.nom_technique,
          dernier_niveau_etude: this.dernier_niveau_etude.nom_technique,
          derniere_situation: this.derniere_situation.nom_technique
        }
      })
        .catch((xhr) => {
          this.erreurs = xhr.responseJSON;
        });
    }
  }
};
</script>
