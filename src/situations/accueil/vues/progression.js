import { CHANGEMENT_CONNEXION } from 'commun/modeles/utilisateur';

export default class VueProgression {
  constructor (depotRessources, utilisateur) {
    this.depotRessources = depotRessources;
    this.utilisateur = utilisateur;
  }

  affiche (pointInsertion, $) {
    this.$progression = $(`<div class='progression'></div>`);
    this.rafraichis();

    this.utilisateur.on(CHANGEMENT_CONNEXION, () => this.rafraichis());

    $(pointInsertion).append(this.$progression);
  }

  rafraichis () {
    const niveau = this.utilisateur.progression().niveau();
    this.$progression.css('background-image', `url('${this.depotRessources.progression(niveau).src}')`);
  }
}
