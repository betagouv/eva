export default class DeplaceurPieces {
  constructor (largeurZoneDeplacement, hauteurZoneDeplacement) {
    this._positionEvenement = (e) => {
      return {
        x: 100 * e.clientX / largeurZoneDeplacement,
        y: 100 * e.clientY / hauteurZoneDeplacement
      };
    };
  }

  activeDeplacementPieces (pointInsertion, $) {
    const $pointInsertion = $(pointInsertion);

    this._positionEvenement = (e) => {
      return {
        x: 100 * e.clientX / $pointInsertion.width(),
        y: 100 * e.clientY / $pointInsertion.height()
      };
    };

    $pointInsertion.on('mousemove', (e) => { this.deplaceSouris(e); });
    $pointInsertion.on('touchmove', (e) => {
      this.deplacePiecesSelectionnees(e.changedTouches[0]);
    });
  }

  deplaceSouris (e) {
    if (e.buttons === 0) {
      this.termineSelection();
      return;
    }
    this.deplacePiecesSelectionnees(e);
  }

  debuteSelection (piece, e) {
    this.pieceSelectionne = piece;
    const position = this._positionEvenement(e);
    this.pieceSelectionne.selectionne(position);
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
