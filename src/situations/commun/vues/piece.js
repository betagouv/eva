import EventEmitter from 'events';

import 'commun/styles/piece.scss';

import { CHANGEMENT_POSITION } from 'commun/modeles/piece';

export default class VuePiece extends EventEmitter {
  constructor (piece, depotRessources) {
    super();
    this.piece = piece;
    this.depotRessources = depotRessources;
  }

  affiche (pointInsertion, $) {
    function creeElementPiece (depotRessources, piece, { largeurParent, hauteurParent }) {
      const image = depotRessources.piece(piece.type);
      const $piece = $(`<img class="piece" src="${image}">`);
      const { largeur, hauteur } = piece.dimensions();
      $piece.css({
        width: largeur * largeurParent / 100,
        height: hauteur * hauteurParent / 100
      });
      metsAJourPosition($piece, piece.position(), { largeurParent, hauteurParent });
      return $piece;
    }

    function metsAJourPosition ($piece, { x, y }, { largeurParent, hauteurParent }) {
      $piece.css({
        left: x * largeurParent / 100,
        top: y * hauteurParent / 100
      });
    }

    this.$elementParent = $(pointInsertion);
    const dimensionsElementParent = {
      largeurParent: this.$elementParent.width(),
      hauteurParent: this.$elementParent.height()
    };
    this.$piece = creeElementPiece(this.depotRessources, this.piece, dimensionsElementParent);
    this.$elementParent.append(this.$piece);

    this.piece.on(CHANGEMENT_POSITION, (nouvellePosition) => {
      metsAJourPosition(this.$piece, nouvellePosition, dimensionsElementParent);
    });
  }
}
