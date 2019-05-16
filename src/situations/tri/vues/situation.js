import 'tri/styles/situation.scss';
import VuePiece from 'tri/vues/piece.js';

export default class VueSituationTri {
  constructor (situation, journal, depotRessources) {
    this.depotRessources = depotRessources;
    this.situation = situation;
  }

  affiche (pointInsertion, $) {
    $(pointInsertion).addClass('tri')
      .css('background-image', `url('${this.depotRessources.fondSituation().src}')`);

    this.situation.pieces.forEach((piece) => {
      const vuePiece = new VuePiece(piece, this.depotRessources);
      vuePiece.affiche(pointInsertion, $);
    });
  }
}
