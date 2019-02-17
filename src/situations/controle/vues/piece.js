import 'controle/styles/piece.scss';

export class VuePiece {
  constructor (piece) {
    this.piece = piece;
  }

  affiche (pointInsertion, $) {
    function creeElementPiece ({ x, y }, largeurElementParent, hauteurElementParent) {
      let $piece = $('<div class="piece"></div>');

      $piece.css('left', x * largeurElementParent / 100);
      $piece.css('top', y * hauteurElementParent / 100);

      return $piece;
    }

    const $elementParent = $(pointInsertion);
    const $piece = creeElementPiece(this.piece.position(), $elementParent.width(), $elementParent.height());
    $elementParent.append($piece);
    $piece.fadeIn(2000);
  }
}
