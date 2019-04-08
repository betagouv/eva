import { Bac } from 'controle/modeles/bac';
import { CHANGEMENT_ETAT, DEMARRE } from 'commun/modeles/situation';
import EvenementDisparitionPiece from 'controle/modeles/evenement_disparition_piece';
import { NOUVELLE_PIECE, DISPARITION_PIECE } from 'controle/modeles/situation';
import { PIECE_CONFORME, PIECE_DEFECTUEUSE } from 'controle/modeles/piece';
import { VueBac } from 'controle/vues/bac';
import { VuePiece } from 'controle/vues/piece';
import VueTapis from 'controle/vues/tapis';
import VueFondSonore from 'controle/vues/fond_sonore';

export class VueSituation {
  constructor (situation, journal) {
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
    this._bacs = creeBacs();
    this.tapis = new VueTapis(situation);
    this.fondSonore = new VueFondSonore(situation);
  }

  bacs () {
    return this._bacs;
  }

  creeVuePiece (piece) {
    return new VuePiece(piece);
  }

  affiche (pointInsertion, $) {
    function afficheBac (bac) {
      const vueBac = new VueBac(bac);
      vueBac.affiche(pointInsertion, $);
    }

    $(pointInsertion).addClass('controle');

    this._bacs.forEach(afficheBac);
    this.tapis.affiche(pointInsertion, $);
    this.fondSonore.affiche(pointInsertion, $);

    this.situation.on(CHANGEMENT_ETAT, (etat) => {
      if (etat === DEMARRE) {
        this.demarre(pointInsertion, $);
      }
    });
  }

  demarre (pointInsertion, $) {
    this.situation.on(NOUVELLE_PIECE, (piece) => {
      const vuePiece = this.creeVuePiece(piece);
      vuePiece.affiche(pointInsertion, $);
      piece.on(DISPARITION_PIECE, (e) => {
        this.journal.enregistre(new EvenementDisparitionPiece({ position: piece.position() }));
      });
    });
    this.situation.demarre();
  }
}
