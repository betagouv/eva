import 'commun/styles/boite_utilisateur.scss';
import 'commun/styles/font_awesome.scss';

export default class VueBoiteUtilisateur {
  constructor (registreUtilisateur) {
    this.registreUtilisateur = registreUtilisateur;
  }

  affiche (pointInsertion, $) {
    this.$utilisateur = $(`
      <div class="boite-utilisateur">
        ${this.registreUtilisateur.consulte()}
        <a class='deconnexion' href='#'>
          <i class='fas fa-sign-out-alt'></i>
        </a>
      </div>`
    );
    this.$utilisateur.find('.deconnexion').click(() => {
      this.registreUtilisateur.deconnecte();
    });
    $(pointInsertion).append(this.$utilisateur);
  }

  supprime () {
    if (this.$utilisateur) {
      this.$utilisateur.remove();
    }
  }
}
