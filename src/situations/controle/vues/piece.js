import 'controle/styles/piece.scss';

export function animationInitiale ($element) {
  $element.animate({ left: '-10%' }, 10000, 'linear');
}

export function animationFinale ($element, done) {
  $element.fadeOut(500, () => { done($element); });
}

export class VuePiece {
  constructor (piece, dureeVie, callbackAvantSuppression) {
    this.piece = piece;
    this.dureeVie = dureeVie;
    this.callbackAvantSuppression = callbackAvantSuppression || animationFinale;
  }

  affiche (pointInsertion, $, callbackApparition) {
    function creeElementPiece (pieceConforme, position, dimensionsElementParent) {
      let classeConformite = pieceConforme ? 'conforme' : 'defectueuse';
      let $piece = $(`<div class="piece ${classeConformite}"></div>`);
      metsAJourPosition($piece, position, dimensionsElementParent);
      return $piece;
    }

    function metsAJourPosition ($piece, { x, y }, { largeurParent, hauteurParent }) {
      $piece.css('left', x * largeurParent / 100);
      $piece.css('top', y * hauteurParent / 100);
    }

    const $elementParent = $(pointInsertion);
    const dimensionsElementParent = {
      largeurParent: $elementParent.width(),
      hauteurParent: $elementParent.height()
    };
    const $piece = creeElementPiece(
      this.piece.estConforme(), this.piece.position(), dimensionsElementParent);

    $piece.mousedown(e => {
      $piece.stop(true);
      $piece.css('opacity', 1);
      this.piece.changePosition({
        x: 100 * parseInt($piece.css('left')) / $elementParent.width(),
        y: 100 * parseInt($piece.css('top')) / $elementParent.height()
      });
      this.piece.selectionne({
        x: 100 * e.clientX / $elementParent.width(),
        y: 100 * e.clientY / $elementParent.height()
      });
    });

    $piece.mouseup(e => { this.piece.deselectionne(); });

    $elementParent.mousemove(e => {
      this.piece.deplaceSiSelectionnee({
        x: 100 * e.clientX / $elementParent.width(),
        y: 100 * e.clientY / $elementParent.height()
      });
    });

    this.piece.quandChangementPosition(function (nouvellePosition) {
      metsAJourPosition($piece, nouvellePosition, dimensionsElementParent);
    });
    $elementParent.append($piece);
    callbackApparition ? callbackApparition($piece) : $piece.show();

    if (this.dureeVie) {
      setTimeout(() => {
        this.callbackAvantSuppression($piece, () => { $piece.remove(); });
      }, this.dureeVie);
    }
  }
}
