import { Piece } from 'controle/modeles/piece.js';

export class Situation {
  constructor ({ cadence, scenario, dureeViePiece, positionApparitionPieces, dimensionsPieces }) {
    this.cadence = cadence;
    this.scenario = scenario;
    this.positionApparition = positionApparitionPieces;
    this.dimensionsPieces = dimensionsPieces;
    this._dureeViePiece = dureeViePiece;
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

  pieceSuivante () {
    const estConforme = this.scenario.shift();
    return new Piece({
      x: this.positionApparition.x,
      y: this.positionApparition.y,
      hauteur: this.dimensionsPieces.hauteur,
      largeur: this.dimensionsPieces.largeur,
      conforme: estConforme
    });
  }
}
