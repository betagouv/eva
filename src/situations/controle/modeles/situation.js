import Piece, { CHANGEMENT_POSITION, CHANGEMENT_SELECTION, DISPARITION_PIECE } from 'commun/modeles/piece';
import Bac from 'commun/modeles/bac';
import SituationCommune, { FINI } from 'commun/modeles/situation';

import sonFondSonore from 'controle/assets/fond_sonore.wav';

export const NOUVELLE_PIECE = 'nouvellePiece';
export const PIECE_BIEN_PLACEE = 'pieceBienPlacée';
export const PIECE_MAL_PLACEE = 'pieceMalPlacée';
export const PIECE_RATEE = 'pieceRatée';

export default class Situation extends SituationCommune {
  constructor ({ cadence, scenario, bacs = [], dureeViePiece, positionApparitionPieces }) {
    super();
    this.cadence = cadence;
    this.scenario = scenario;
    this.positionApparition = positionApparitionPieces;
    this._dureeViePiece = dureeViePiece;
    this.audios = {
      fondSonore: new window.Audio(sonFondSonore)
    };
    this.resultat = {
      bien_placees: 0,
      mal_placees: 0,
      ratees: 0
    };
    this._piecesAffichees = [];
    this._bacs = bacs.map((bac) => new Bac(bac));
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

  pieceSuivante () {
    const donneesPiece = this.scenario.shift();
    return new Piece({ x: this.positionApparition.x,
      y: this.positionApparition.y,
      categorie: donneesPiece.categorie,
      type: donneesPiece.type,
      largeur: 13,
      hauteur: 30
    });
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

    if (piece.estSelectionnee()) {
      this.bacs().forEach((bac) => bac.reinitialiseEtatSurvole());
    }

    const bac = this.bacs().find((bac) => bac.contient(piece));
    if (bac) {
      if (bac.correspondALaCategorie(piece)) {
        this.resultat.bien_placees++;
        this.emit(PIECE_BIEN_PLACEE, piece);
      } else {
        this.resultat.mal_placees++;
        this.emit(PIECE_MAL_PLACEE, piece);
      }
    } else {
      this.resultat.ratees++;
      this.emit(PIECE_RATEE, piece);
    }

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
