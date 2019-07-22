import 'commun/styles/boite_utilisateur.scss';
import 'commun/styles/font_awesome.scss';
import { CHANGEMENT_CONNEXION } from 'commun/modeles/utilisateur';

export default class VueBoiteUtilisateur {
  constructor (utilisateur, accesSituations) {
    this.utilisateur = utilisateur;
    this.accesSituations = accesSituations;
  }

  affiche (pointInsertion, $) {
    this.utilisateur.on(CHANGEMENT_CONNEXION, () => this.rafraichis());

    this.$boiteUtilisateur = $(`
      <div class="boite-utilisateur">
        <div class='nom-utilisateur'> ${this.utilisateur.nom()}</div>
        <div class="progression-utilisateur">${this.afficheEtapesUtilisateur()}</div>
        <a class='deconnexion' href='#'>
          <i class='fas fa-sign-out-alt'></i>
        </a>
      </div>`
    );
    this.rafraichis();

    this.$boiteUtilisateur.find('.deconnexion').click(() => {
      this.utilisateur.deconnecte();
    });

    $(pointInsertion).append(this.$boiteUtilisateur);
  }

  rafraichis () {
    this.$boiteUtilisateur.toggleClass('invisible', !this.utilisateur.estConnecte());
    this.$boiteUtilisateur.find('.nom-utilisateur').text(this.utilisateur.nom());
    this.$boiteUtilisateur.find('.progression-utilisateur').text(this.afficheEtapesUtilisateur());
  }

  afficheEtapesUtilisateur () {
    if (this.accesSituations.length === 0) return 0;
    const nombreDeSituationsFaites = this.utilisateur.nbSituationsFaites();
    return `${nombreDeSituationsFaites}/${this.accesSituations.length}`;
  }
}
