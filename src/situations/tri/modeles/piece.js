import PieceCommune, {
  CHANGEMENT_POSITION,
  CHANGEMENT_SELECTION,
  DISPARITION_PIECE,
  PIECE_BIEN_PLACEE,
  PIECE_MAL_PLACEE,
  PIECE_DEPOSE_HORS_BACS,
  PIECE_PRISE
} from 'commun/modeles/piece';

export {
  CHANGEMENT_POSITION,
  CHANGEMENT_SELECTION,
  DISPARITION_PIECE,
  PIECE_BIEN_PLACEE,
  PIECE_MAL_PLACEE,
  PIECE_DEPOSE_HORS_BACS,
  PIECE_PRISE
};

export default class Piece extends PieceCommune {
  constructor (parametres) {
    super(parametres);
    this._positionOriginelle = this.position();
  }

  positionOriginelle () {
    return this._positionOriginelle;
  }
}
