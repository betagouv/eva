import 'accueil/styles/acces_situation.scss';

export default class VueAccesSituation {
  constructor (accesSituation, depotRessources) {
    this.accesSituation = accesSituation;
    this.depotRessources = depotRessources;
  }

  affiche (pointInsertion, $) {
    this.$accesSituation = $(`
        <a href="${this.accesSituation.chemin}" class='acces-situation ${this.accesSituation.identifiant}'>
          ${this.accesSituation.nom}
        </a>
      `);

    this.$accesSituation.on('dragstart', (e) => e.preventDefault());
    this.$accesSituation.css('background-image', `url('${this.depotRessources.batimentSituation(this.accesSituation.identifiant).src}')`);
    $(pointInsertion).append(this.$accesSituation);
  }

  metsAJourAcces (niveau) {
    const estInaccessible = !this.accesSituation.estAccessible(niveau);

    this.$accesSituation.toggleClass('desactivee', estInaccessible);
    this.$accesSituation.css('pointer-events', function () {
      return estInaccessible ? 'none' : 'auto';
    });
  }
}
