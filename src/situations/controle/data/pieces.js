const CONFORME = true;
const DEFECTUEUX = false;

const pieceConforme = { type: 'biscuit-normal', categorie: CONFORME };

const piecesNonConformes = Array(19).fill().map((_, i) => {
  return { type: `def${i + 1}`, categorie: DEFECTUEUX };
});

const scenario = [
  pieceConforme,
  pieceConforme,
  pieceConforme,
  piecesNonConformes[14],
  pieceConforme,
  pieceConforme,
  piecesNonConformes[2],
  pieceConforme,
  pieceConforme,
  pieceConforme,
  piecesNonConformes[4],
  pieceConforme,
  piecesNonConformes[10],
  pieceConforme,
  piecesNonConformes[1],
  pieceConforme,
  piecesNonConformes[13],
  pieceConforme,
  pieceConforme,
  pieceConforme,
  piecesNonConformes[12],
  pieceConforme,
  pieceConforme,
  pieceConforme,
  pieceConforme,
  piecesNonConformes[15],
  pieceConforme,
  pieceConforme,
  piecesNonConformes[11],
  pieceConforme,
  pieceConforme,
  pieceConforme,
  pieceConforme,
  pieceConforme,
  piecesNonConformes[1],
  pieceConforme,
  piecesNonConformes[12],
  pieceConforme,
  piecesNonConformes[15],
  piecesNonConformes[13],
  pieceConforme,
  piecesNonConformes[12],
  pieceConforme,
  pieceConforme,
  piecesNonConformes[4],
  pieceConforme,
  piecesNonConformes[14],
  pieceConforme,
  pieceConforme,
  piecesNonConformes[10],
  pieceConforme,
  pieceConforme,
  pieceConforme,
  pieceConforme,
  pieceConforme,
  piecesNonConformes[4],
  piecesNonConformes[2],
  pieceConforme,
  piecesNonConformes[2],
  pieceConforme
];

const bacs = [
  { categorie: CONFORME, x: 16, y: 8.1, largeur: 22.6, hauteur: 41.3 },
  { categorie: DEFECTUEUX, x: 61.3, y: 8.1, largeur: 22.6, hauteur: 41.3 }
];

export { scenario, bacs };
