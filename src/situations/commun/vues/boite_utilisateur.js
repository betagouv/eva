import 'commun/styles/boite_utilisateur.scss';
import 'commun/styles/font_awesome.scss';
import { CHANGEMENT_CONNEXION } from 'commun/infra/registre_utilisateur';

export default class VueBoiteUtilisateur {
  constructor (registreUtilisateur, accesSituations) {
    this.registreUtilisateur = registreUtilisateur;
    this.accesSituations = accesSituations;
  }

  affiche (pointInsertion, $) {
    this.registreUtilisateur.on(CHANGEMENT_CONNEXION, () => this.rafraichis());

    this.$boiteUtilisateur = $(`
      <div class="boite-utilisateur">
        <div class='nom-utilisateur'> ${this.registreUtilisateur.nom()}</div>
        <div class="progression-utilisateur">${this.afficheEtapesUtilisateur()}</div>
        <a class='deconnexion' href='#'>
          <i class='fas fa-sign-out-alt'></i>
        </a>
      </div>`
    );
    this.rafraichis();

    this.$boiteUtilisateur.find('.deconnexion').click(() => {
      this.registreUtilisateur.deconnecte();
    });

    $(pointInsertion).append(this.$boiteUtilisateur);
  }

  rafraichis () {
    this.$boiteUtilisateur.toggleClass('invisible', !this.registreUtilisateur.estConnecte());
    this.$boiteUtilisateur.find('.nom-utilisateur').text(this.registreUtilisateur.nom());
    this.$boiteUtilisateur.find('.progression-utilisateur').text(this.afficheEtapesUtilisateur());
  }

  afficheEtapesUtilisateur () {
    if (this.accesSituations.length === 0) return 0;
    const nombreDeSituationsFaites = this.registreUtilisateur.nombreSituationsFaites();
    return `${nombreDeSituationsFaites}/${this.accesSituations.length}`;
  }
}
