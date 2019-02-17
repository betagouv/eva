import 'controle/styles/piece.scss';

export function animationInitiale ($element) {
  $element.fadeIn(2000, function () {
    $element.animate({ left: '50%', easing: 'linear' }, 3000);
  });
}

export class VuePiece {
  constructor (piece, dureeVie) {
    this.piece = piece;
    this.dureeVie = dureeVie;
  }

  affiche (pointInsertion, $, callbackApparition) {
    function creeElementPiece (position, dimensionsElementParent) {
      let $piece = $('<div class="piece"></div>');
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
    const $piece = creeElementPiece(this.piece.position(), dimensionsElementParent);

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
      setTimeout(() => { $piece.fadeOut(100, () => { $piece.remove(); }); }, this.dureeVie);
    }
  }
}
