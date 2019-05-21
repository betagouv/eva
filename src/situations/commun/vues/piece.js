import EventEmitter from 'events';

import 'commun/styles/piece.scss';

import { CHANGEMENT_POSITION, CHANGEMENT_SELECTION, DISPARITION_PIECE } from 'commun/modeles/piece';

export function animationFinale ($element, done) {
  $element.fadeOut(500, () => { done($element); });
}

export default class VuePiece extends EventEmitter {
  constructor (piece, depotRessources, animationDisparition = animationFinale) {
    super();
    this.piece = piece;
    this.depotRessources = depotRessources;
    this.animationDisparition = animationDisparition;
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

    this.piece.on(DISPARITION_PIECE, () => {
      this.$piece.addClass('desactiver');

      this.animationDisparition(this.$piece, () => {
        this.$piece.remove();
      });
    });
  }
}
