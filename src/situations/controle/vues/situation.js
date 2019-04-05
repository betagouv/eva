import { Bac } from 'controle/modeles/bac';
import EvenementDisparitionPiece from 'controle/modeles/evenement_disparition_piece';
import { PIECE_CONFORME, PIECE_DEFECTUEUSE } from 'controle/modeles/piece';
import EvenementDemarrage from 'commun/modeles/evenement_demarrage';
import { VueBac } from 'controle/vues/bac';
import { VuePiece, DISPARITION_PIECE } from 'controle/vues/piece';

export class VueSituation {
  constructor (situation, journal, callbackApresCreationPiece) {
    function nouveauBac (categorie, { x, y }) {
      return new Bac({ categorie, x, y, largeur: 24.2, hauteur: 44 });
    }

    function creeBacs () {
      const bacs = [];
      bacs.push(nouveauBac(PIECE_CONFORME, { x: 15.6, y: 12 }));
      bacs.push(nouveauBac(PIECE_DEFECTUEUSE, { x: 60, y: 12 }));
      return bacs;
    }

    this.situation = situation;
    this.journal = journal;
    this.callbackApresCreationPiece = callbackApresCreationPiece;
    this._bacs = creeBacs();
  }

  bacs () {
    return this._bacs;
  }

  creeVuePiece (piece) {
    return new VuePiece(piece, this.situation.dureeViePiece(), this.callbackApresCreationPiece);
  }

  affiche (pointInsertion, $) {
    function afficheBac (bac) {
      const vueBac = new VueBac(bac);
      vueBac.affiche(pointInsertion, $);
    }

    $(pointInsertion).addClass('controle');
    this._bacs.forEach(afficheBac);

    this.situation.observe(EvenementDemarrage, () => {
      this.demarre(pointInsertion, $);
    });
  }

  demarre (pointInsertion, $) {
    const afficheProchainePiece = () => {
      if (this.situation.sequenceTerminee()) {
        clearInterval(this.identifiantIntervalle);
        return;
      }

      const piece = this.situation.pieceSuivante();
      let vuePiece = this.creeVuePiece(piece);
      vuePiece.on(DISPARITION_PIECE, (e) => this.journal.enregistre(new EvenementDisparitionPiece(e)));
      vuePiece.affiche(pointInsertion, $);
    };
    afficheProchainePiece();
    this.identifiantIntervalle = setInterval(
      afficheProchainePiece,
      this.situation.cadenceArriveePieces()
    );
  }
}
