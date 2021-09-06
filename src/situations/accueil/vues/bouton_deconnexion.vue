<template>
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
        @click="afficheJeDonneMonAvis"
      >{{ $traduction('deconnexion.titre') }}</a>
    </div>
  </transition-fade>
</template>

<script>
import { mapActions } from 'vuex';
import 'accueil/styles/deconnexion.scss';
import TransitionFade from 'commun/vues/transition_fade';

export default {
  components: { TransitionFade },
  data () {
    return {
      avatarAvis: this.$depotRessources.avatarAvis().src,
      avatarDeconnexion: this.$depotRessources.avatarDeconnexion().src,
      boutonAvis: this.$depotRessources.boutonAvis().src,
      lienDonnerAvis: 'https://voxusagers.numerique.gouv.fr/Demarches/2381?&view-mode=formulaire-avis&nd_mode=en-ligne-enti%C3%A8rement&nd_source=button&key=e556745a003dc51aac047d6818d4e1d6',
      afficheDonnerAvis: false,
      confirmeDeconnexion: false
    };
  },

  methods: {
    ...mapActions(['deconnecte']),

    fermeDonnerAvis () {
      this.afficheDonnerAvis = false;
      this.confirmeDeconnexion = true;
    },

    afficheJeDonneMonAvis () {
      this.afficheDonnerAvis = true;
    }
  }
};
</script>
