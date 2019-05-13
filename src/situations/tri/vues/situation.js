import 'tri/styles/situation.scss';
import VuePiece from 'tri/vues/piece.js';

export default class VueSituationTri {
  constructor (situation, journal, depotRessource) {
    this.depotRessource = depotRessource;
    this.situation = situation;
  }

  affiche (pointInsertion, $) {
    $(pointInsertion).addClass('tri')
      .css('background-image', `url('${this.depotRessource.fondSituation().src}')`);

    this.situation.pieces.forEach((piece) => {
      const vuePiece = new VuePiece(piece);
      vuePiece.affiche(pointInsertion, $);
    });
  }
}
