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
      if (e.buttons === 0) {
        this.termineSelection();
        return;
      }
      this.deplacePiecesSelectionnees(e);
    });
    $pointInsertion.on('touchmove', (e) => {
      this.deplacePiecesSelectionnees(e.changedTouches[0]);
    });
  }

  debuteSelection (piece, positionActuelle, e) {
    this.pieceSelectionne = piece;
    this.pieceSelectionne.changePosition(positionActuelle);
    this.pieceSelectionne.selectionne(this._positionEvenement(e));
  }

  deplacePiecesSelectionnees (e) {
    if (this.pieceSelectionne) {
      this.pieceSelectionne.deplaceSiSelectionnee(this._positionEvenement(e));
    }
  }

  termineSelection (piece) {
    if (this.pieceSelectionne) {
      this.pieceSelectionne.deselectionne();
    }
  }
}
