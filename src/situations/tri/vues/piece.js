export default class VuePiece {
  constructor (piece) {
    this.piece = piece;
  }

  affiche (pointInsertion, $) {
    const $piece = $(`<img class="piece" src="${this.piece.image}">`);
    $(pointInsertion).append($piece);
  }
}
