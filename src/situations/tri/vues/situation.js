import 'tri/styles/situation.scss';

export default class VueSituationTri {
  constructor (situation, journal, depotRessource) {
    this.depotRessource = depotRessource;
  }

  affiche (pointInsertion, $) {
    $(pointInsertion).addClass('tri')
      .css('background-image', `url('${this.depotRessource.fondSituation().src}')`);
  }
}
