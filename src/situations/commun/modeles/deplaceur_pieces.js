export default class DeplaceurPieces {
  constructor (largeurZoneDeplacement, hauteurZoneDeplacement) {
    this.largeurZoneDeplacement = largeurZoneDeplacement;
    this.hauteurZoneDeplacement = hauteurZoneDeplacement;
  }

  _positionEvenement (e) {
    return {
      x: 100 * e.clientX / this.largeurZoneDeplacement,
      y: 100 * e.clientY / this.hauteurZoneDeplacement
    };
  }

  debuteSelection (piece, e) {
    this.pieceSelectionne = piece;
    const position = this._positionEvenement(e);
    this.pieceSelectionne.selectionne(position);
  }

  deplaceSouris (e) {
    if (e.buttons === 0) {
      this.termineSelection();
    }
    this.deplacePiecesSelectionnees(e);
  }

  deplacePiecesSelectionnees (e) {
    if (this.pieceSelectionne) {
      this.pieceSelectionne.deplaceSiSelectionnee(this._positionEvenement(e));
    }
  }

  termineSelection () {
    if (this.pieceSelectionne) {
      this.pieceSelectionne.deselectionne();
    }
  }
}
