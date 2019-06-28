export default class VueAccesSituation {
  constructor (situation, depotRessources) {
    this.situation = situation;
    this.depotRessources = depotRessources;
  }

  affiche (pointInsertion, $) {
    let $accesSituation = $(`
        <a href="${this.situation.chemin}" class='situation ${this.situation.identifiant}'>
          ${this.situation.nom}
        </a>
      `);

    $accesSituation.on('dragstart', (e) => e.preventDefault());
    $accesSituation.css('background-image', `url('${this.depotRessources.batimentSituation(this.situation.identifiant).src}')`);
    $(pointInsertion).append($accesSituation);
  }
}
