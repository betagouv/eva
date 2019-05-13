export default class VuePiece {
  constructor (piece) {
    this.piece = piece;
  }

  affiche (pointInsertion, $) {
    const $piece = $(`<img class="piece" src="${this.piece.image}">`);
    $piece.css('top', this.piece.posY);
    $piece.css('left', this.piece.posX);
    $(pointInsertion).append($piece);
  }
}
