import { Piece, CHANGEMENT_POSITION, CHANGEMENT_SELECTION } from 'controle/modeles/piece';
import SituationCommune, { FINI } from 'commun/modeles/situation';

export const NOUVELLE_PIECE = 'nouvellePiece';
export const DISPARITION_PIECE = 'disparitionPiece';

export class Situation extends SituationCommune {
  constructor ({ cadence, scenario, dureeViePiece, positionApparitionPieces, consigneAudio }) {
    super();
    this.cadence = cadence;
    this.scenario = scenario;
    this.positionApparition = positionApparitionPieces;
    this._dureeViePiece = dureeViePiece;
    this.consigneAudio = consigneAudio;
    this._piecesAffichees = [];
    this._bacs = [];
  }

  cadenceArriveePieces () {
    return this.cadence;
  }

  dureeViePiece () {
    return this._dureeViePiece;
  }

  sequenceTerminee () {
    return this.scenario.length === 0;
  }

  nAPlusRienAFaire () {
    return this._piecesAffichees.length === 0 && this.sequenceTerminee();
  }

  bacs () {
    return this._bacs;
  }

  ajouteBac (bac) {
    this._bacs.push(bac);
  }

  pieceSuivante () {
    const donneesPiece = this.scenario.shift();
    return new Piece({ x: this.positionApparition.x,
      y: this.positionApparition.y,
      conforme: donneesPiece.conforme,
      image: donneesPiece.image });
  }

  piecesAffichees () {
    return this._piecesAffichees;
  }

  demarre () {
    const afficheProchainePiece = () => {
      if (this.sequenceTerminee()) {
        clearInterval(this.identifiantIntervalle);
        return;
      }

      this.faisApparaitreLaNouvellePiece();
    };
    afficheProchainePiece();
    this.identifiantIntervalle = setInterval(
      afficheProchainePiece,
      this.cadence
    );
  }

  faisApparaitreLaNouvellePiece () {
    const piece = this.pieceSuivante();
    this.ajoutePiece(piece);
    setTimeout(() => this.faisDisparaitrePiece(piece), this.dureeViePiece());
  }

  ajoutePiece (piece) {
    this._piecesAffichees.push(piece);
    this.emit(NOUVELLE_PIECE, piece);
    piece.on(CHANGEMENT_POSITION, () => this.detecteSurvol(piece));
    piece.on(CHANGEMENT_SELECTION, () => this.reinitialiseBacs(piece));
  }

  faisDisparaitrePiece (piece) {
    this._piecesAffichees.splice(this._piecesAffichees.indexOf(piece), 1);
    piece.emit(DISPARITION_PIECE);
    if (this.nAPlusRienAFaire()) {
      this.modifieEtat(FINI);
    }
  }

  detecteSurvol (piece) {
    this.bacs().forEach((bac) => {
      if (bac.contient(piece)) {
        bac.passeEnEtatSurvole();
      } else {
        bac.reinitialiseEtatSurvole();
      }
    });
  }

  reinitialiseBacs (piece) {
    if (!piece.estSelectionnee()) {
      this.bacs().forEach(bac => bac.reinitialiseEtatSurvole());
    }
  }
}
