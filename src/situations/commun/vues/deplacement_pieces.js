export default function activeDeplacementPieces (deplaceurPiece, pointInsertion, $) {
  const $pointInsertion = $(pointInsertion);

  deplaceurPiece.largeurZoneDeplacement = $pointInsertion.width();
  deplaceurPiece.hauteurZoneDeplacement = $pointInsertion.height();

  $pointInsertion.on('mousemove', (e) => { deplaceurPiece.deplaceSouris(e); });
  $pointInsertion.on('touchmove', (e) => {
    deplaceurPiece.deplacePiecesSelectionnees(e.changedTouches[0]);
  });
}
