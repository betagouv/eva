export default class DeplaceurPieces {
  constructor (situation) {
    this.situation = situation;
  }

  activeDeplacementPieces (pointInsertion, $) {
    this.$pointInsertion = $(pointInsertion);
    this.$pointInsertion.mousemove(e => {
      if (e.buttons === 1) {
        this.deplacePiecesSelectionnees(e);
      } else {
        this.deselectionneToutesLesPieces();
      }
    });
  }

  deplacePiecesSelectionnees (e) {
    const piecesAffichees = this.situation.piecesAffichees();
    piecesAffichees.forEach(p => {
      p.deplaceSiSelectionnee({
        x: 100 * e.clientX / this.$pointInsertion.width(),
        y: 100 * e.clientY / this.$pointInsertion.height()
      });
    });
  }

  deselectionneToutesLesPieces () {
    const piecesAffichees = this.situation.piecesAffichees();
    piecesAffichees.forEach(p => {
      p.deselectionne();
    });
  }
}
