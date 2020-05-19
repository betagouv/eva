<template>
  <div class="overlay modale centrage-horizontal">
    <div
      v-if="ecran == 'bravo'"
      class="modale-interieur bravo">
      <img class="avatar-fin" :src="avatarFin"/>
      <div>
        <h2 v-html="$traduction('accueil.fin.bravo.titre', { nom: nom })"></h2>
        <div v-if="this.competencesFortes.length != 0">
          <div class="contenu">
            <p class="message-fin">
            {{ $traduction('accueil.fin.bravo.message') }}
            </p>
          </div>
          <button
            class="bouton-arrondi"
            @click="suivant"
            >{{ $traduction('accueil.fin.bravo.bouton') }}</button>
        </div>
      </div>
    </div>
    <div
      v-else
      class="modale-interieur resultat">
      <h2>{{ $traduction('accueil.fin.resultat.titre') }}</h2>
      <div
        class="message-competences-fortes"
        v-html="$traduction('accueil.fin.resultat.competences')">
      </div>
      <div class="contenu">
        <div
          v-for="competence in competencesFortes"
          :key="competence.id"
          class="competences-fortes"
          >
          <img :src="competence.picto" />
          <p class="competences-fortes-nom">{{ competence.nom }}</p>
          <p class="competences-fortes-description">{{ competence.description }}</p>
        </div>
      </div>
      <div class="contenu">
        <div
          v-for="competence in competencesFortes"
          :key="competence.id"
          >
            <a target="_blank" class="bouton-arrondi bouton-arrondi--petit" :href="lienSiteVitrine(competence.id)">{{ $traduction('accueil.fin.resultat.en-savoir-plus') }}</a>
        </div>
      </div>

      <transition-fade>
        <div
            v-if="afficheDonnerAvis"
            key="mon-avis"
            class='actions-fin'
          >
          <div class='mon-avis'>
            <div class='information'>
              <img class="avatar" :src="avatarAvis"/>
              <span class="texte" v-html="$traduction('accueil.fin.avis.label')" />
            </div>
            <div class='actions-avis'>
              <a :href="lienDonnerAvis"
                target='_blank'
                @click="fermeDonnerAvis">
                <img style="height:40px;" :src="boutonAvis" alt="Je donne mon avis" title="Je donne mon avis sur cette démarche" />
              </a>
              <a class="bouton-arrondi bouton-arrondi--petit bouton-arrondi-orange"
                 @click="fermeDonnerAvis"
              >
                {{ $traduction('accueil.fin.avis.fermer') }}
              </a>
            </div>
          </div>
        </div>

        <div
            v-else-if="confirmeDeconnexion"
            key="confirme-deconnection"
            class='actions-fin'
        >
            <div class="confirmation-deconnexion" >
              <div class="information">
                <span class="avatar">
                  <img class :src="avatarDeconnexion" />
                </span>
                <span class="texte" v-html="$traduction('accueil.fin.confirmation_deconnexion.label')" />
              </div>
              <div class="actions-deconnexion">
                <a
                  class="bouton-arrondi bouton-arrondi--petit bouton-arrondi-orange"
                  @click="deconnecte"
                >{{ $traduction('accueil.fin.confirmation_deconnexion.bouton') }}</a>
              </div>
            </div>
        </div>

        <div v-else
            key="buton-deconnexion"
            class='actions-fin'
        >
          <a
            class="bouton-deconnexion bouton-arrondi"
            @click="afficheConfirmationDeconnexion"
          >{{ $traduction('deconnexion.titre') }}</a>
        </div>
      </transition-fade>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import 'accueil/styles/fin.scss';
import TransitionFade from 'commun/vues/transition_fade';

export default {
  components: { TransitionFade },
  computed: mapState(['competencesFortes', 'nom']),

  data () {
    return {
      ecran: 'bravo',
      avatarFin: this.$depotRessources.avatarFin().src,
      avatarAvis: this.$depotRessources.avatarAvis().src,
      avatarDeconnexion: this.$depotRessources.avatarDeconnexion().src,
      boutonAvis: this.$depotRessources.boutonAvis().src,
      lienDonnerAvis: 'https://voxusagers.numerique.gouv.fr/Demarches/2381?&view-mode=formulaire-avis&nd_mode=en-ligne-enti%C3%A8rement&nd_source=button&key=e556745a003dc51aac047d6818d4e1d6',
      afficheDonnerAvis: true,
      confirmeDeconnexion: false
    };
  },

  methods: {
    ...mapActions(['deconnecte']),

    lienSiteVitrine (competence) {
      return `https://eva.beta.gouv.fr/competences/${competence}`;
    },

    suivant () {
      this.ecran = 'resultat';
    },

    fermeDonnerAvis () {
      this.afficheDonnerAvis = false;
    },

    afficheConfirmationDeconnexion () {
      this.confirmeDeconnexion = true;
    }
  }
};
</script>
