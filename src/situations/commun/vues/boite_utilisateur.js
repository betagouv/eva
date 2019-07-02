import 'commun/styles/boite_utilisateur.scss';
import 'commun/styles/font_awesome.scss';
import { CHANGEMENT_CONNEXION } from 'commun/infra/registre_utilisateur';

export default class VueBoiteUtilisateur {
  constructor (registreUtilisateur) {
    this.registreUtilisateur = registreUtilisateur;
  }

  affiche (pointInsertion, $) {
    this.registreUtilisateur.on(CHANGEMENT_CONNEXION, () => this.rafraichis());

    this.$utilisateur = $(`
      <div class="boite-utilisateur">
        <span class="nom-utilisateur">${this.registreUtilisateur.consulte()}</span>
        <a class='deconnexion' href='#'>
          <i class='fas fa-sign-out-alt'></i>
        </a>
      </div>`
    );
    this.rafraichis();

    this.$utilisateur.find('.deconnexion').click(() => {
      this.registreUtilisateur.deconnecte();
    });

    $(pointInsertion).append(this.$utilisateur);
  }

  rafraichis () {
    this.$utilisateur.toggleClass('invisible', !this.registreUtilisateur.estConnecte());
    this.$utilisateur.find('.nom-utilisateur').text(this.registreUtilisateur.consulte());
  }
}
