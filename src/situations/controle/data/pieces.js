const CONFORME = true;
const DEFECTUEUX = false;

const pieceConforme = { type: 'biscuit-normal', categorie: CONFORME };

const piecesNonConformes = Array(9).fill().map((_, i) => {
  return { type: `def${i + 1}`, categorie: DEFECTUEUX };
});

const scenario = [
  pieceConforme,
  pieceConforme,
  pieceConforme,
  piecesNonConformes[8],
  pieceConforme,
  pieceConforme,
  piecesNonConformes[2],
  pieceConforme,
  pieceConforme,
  pieceConforme,
  piecesNonConformes[3],
  pieceConforme,
  piecesNonConformes[4],
  pieceConforme,
  piecesNonConformes[1],
  pieceConforme,
  piecesNonConformes[7],
  pieceConforme,
  pieceConforme,
  pieceConforme,
  piecesNonConformes[6],
  pieceConforme,
  pieceConforme,
  pieceConforme,
  pieceConforme,
  piecesNonConformes[9],
  pieceConforme,
  pieceConforme,
  piecesNonConformes[5],
  pieceConforme,
  pieceConforme,
  pieceConforme,
  pieceConforme,
  pieceConforme,
  piecesNonConformes[1],
  pieceConforme,
  piecesNonConformes[6],
  pieceConforme,
  piecesNonConformes[9],
  piecesNonConformes[7],
  pieceConforme,
  piecesNonConformes[6],
  pieceConforme,
  pieceConforme,
  piecesNonConformes[3],
  pieceConforme,
  piecesNonConformes[8],
  pieceConforme,
  pieceConforme,
  piecesNonConformes[4],
  pieceConforme,
  pieceConforme,
  pieceConforme,
  pieceConforme,
  pieceConforme,
  piecesNonConformes[3],
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
