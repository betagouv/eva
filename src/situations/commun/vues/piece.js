import EventEmitter from 'events';

import 'commun/styles/piece.scss';

import { CHANGEMENT_POSITION, CHANGEMENT_SELECTION } from 'commun/modeles/piece';

export default class VuePiece extends EventEmitter {
  constructor (piece, depotRessources) {
    super();
    this.piece = piece;
    this.depotRessources = depotRessources;
  }

  affiche (pointInsertion, $) {
    function creeElementPiece (depotRessources, piece, dimensionsElementParent) {
      const image = depotRessources.piece(piece.type);
      const $piece = $(`<img class="piece" src="${image}">`);
      metsAJourPosition($piece, piece.position(), dimensionsElementParent);
      return $piece;
    }

    function metsAJourPosition ($piece, { x, y }, { largeurParent, hauteurParent }) {
      $piece.css('left', x * largeurParent / 100);
      $piece.css('top', y * hauteurParent / 100);
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

    this.$piece.mousedown(e => {
      this.$piece.stop(true);
      this.$piece.css('opacity', 1);
      this.piece.changePosition({
        x: 100 * parseInt(this.$piece.css('left')) / this.$elementParent.width(),
        y: 100 * parseInt(this.$piece.css('top')) / this.$elementParent.height()
      });
      this.piece.selectionne({
        x: 100 * e.clientX / this.$elementParent.width(),
        y: 100 * e.clientY / this.$elementParent.height()
      });
    });

    this.$piece.on('dragstart', function (event) { event.preventDefault(); });
    this.$piece.mouseup(e => { this.piece.deselectionne(); });

    this.piece.on(CHANGEMENT_SELECTION, (selectionnee) => {
      this.$elementParent.append(this.$piece);
      this.$piece.toggleClass('selectionnee', selectionnee);
    });
  }
}
