import { CHANGEMENT_CONNEXION } from 'commun/infra/registre_utilisateur';

export default class VueProgression {
  constructor (depotRessources, registreUtilisateur) {
    this.depotRessources = depotRessources;
    this.registreUtilisateur = registreUtilisateur;
  }

  affiche (pointInsertion, $) {
    this.$progression = $(`<div class='progression'></div>`);
    this.rafraichis();

    this.registreUtilisateur.on(CHANGEMENT_CONNEXION, () => this.rafraichis());

    $(pointInsertion).append(this.$progression);
  }

  rafraichis () {
    const niveau = this.registreUtilisateur.niveauActuel();
    this.$progression.css('background-image', `url('${this.depotRessources.progression(niveau).src}')`);
  }
}
