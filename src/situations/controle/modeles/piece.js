import PieceCommune from 'commun/modeles/piece';

export const PIECE_CONFORME = true;
export const PIECE_DEFECTUEUSE = false;

export * from 'commun/modeles/piece';

export default class Piece extends PieceCommune {
  constructor ({ conforme, ...reste }) {
    super(reste);
    this.conforme = conforme;
  }

  estConforme () {
    return this.conforme;
  }
}
