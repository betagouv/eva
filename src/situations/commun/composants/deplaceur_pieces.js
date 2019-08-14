export default class DeplaceurPieces {
  activeDeplacementPieces (pointInsertion, $) {
    const $pointInsertion = $(pointInsertion);

    this._positionEvenement = (e) => {
      return {
        x: 100 * e.clientX / $pointInsertion.width(),
        y: 100 * e.clientY / $pointInsertion.height()
      };
    };

    $pointInsertion.mousemove(e => {
      if (e.buttons === 1) {
        this.deplacePiecesSelectionnees(e);
      } else {
        this.termineSelection();
      }
    });
  }

  debuteSelection (piece, positionActuelle, e) {
    this.pieceSelectionne = piece;
    this.pieceSelectionne.changePosition(positionActuelle);
    this.pieceSelectionne.selectionne(this._positionEvenement(e));
  }

  deplacePiecesSelectionnees (e) {
    this.pieceSelectionne.deplaceSiSelectionnee(this._positionEvenement(e));
  }

  termineSelection (piece) {
    this.pieceSelectionne.deselectionne();
  }
}
