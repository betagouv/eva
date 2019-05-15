import 'controle/styles/piece.scss';

import VuePieceCommune from 'commun/vues/piece';
import { CHANGEMENT_SELECTION } from 'controle/modeles/piece';
import { DISPARITION_PIECE } from 'controle/modeles/situation';

export function animationInitiale ($element) {
  $element.animate({ left: '-' + $element.css('width') }, 10000, 'linear');
}

export function animationFinale ($element, done) {
  $element.fadeOut(500, () => { done($element); });
}

export default class VuePiece extends VuePieceCommune {
  constructor (piece,
    callbackApresApparition = animationInitiale,
    callbackAvantSuppression = animationFinale) {
    super(piece);

    this.callbackApresApparition = callbackApresApparition;
    this.callbackAvantSuppression = callbackAvantSuppression;
  }

  affiche (pointInsertion, $) {
    super.affiche(pointInsertion, $);

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
    this.$piece.show(() => { this.callbackApresApparition(this.$piece); });

    this.piece.on(DISPARITION_PIECE, () => {
      this.$piece.addClass('desactiver');
      this.callbackAvantSuppression(this.$piece, () => {
        this.$piece.remove();
      });
    });
  }
}
