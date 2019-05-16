import 'controle/styles/situation.scss';
import Bac from 'controle/modeles/bac';
import { CHANGEMENT_ETAT, DEMARRE } from 'commun/modeles/situation';
import EvenementDemarrage from 'commun/modeles/evenement_demarrage';
import EvenementPieceBienPlacee from 'controle/modeles/evenement_piece_bien_placee';
import EvenementPieceMalPlacee from 'controle/modeles/evenement_piece_mal_placee';
import EvenementPieceRatee from 'controle/modeles/evenement_piece_ratee';
import { NOUVELLE_PIECE, PIECE_BIEN_PLACEE, PIECE_MAL_PLACEE, PIECE_RATEE } from 'controle/modeles/situation';
import { PIECE_CONFORME, PIECE_DEFECTUEUSE } from 'controle/modeles/piece';
import VueBac from 'controle/vues/bac';
import VuePiece from 'controle/vues/piece';
import VueTapis from 'controle/vues/tapis';
import VueFondSonore from 'controle/vues/fond_sonore';
import VueFin from 'controle/vues/fin';

export default class VueSituation {
  constructor (situation, journal, depotRessources) {
    function nouveauBac (categorie, { x, y }) {
      return new Bac({ categorie, x, y, largeur: 22.6, hauteur: 41.3 });
    }

    function creeBacs () {
      situation.ajouteBac(nouveauBac(PIECE_CONFORME, { x: 16, y: 8.1 }));
      situation.ajouteBac(nouveauBac(PIECE_DEFECTUEUSE, { x: 61.3, y: 8.1 }));
    }
    creeBacs();

    this.situation = situation;
    this.journal = journal;
    this.depotRessources = depotRessources;
    this.tapis = new VueTapis(situation);
    this.fondSonore = new VueFondSonore(situation);
    this.fin = new VueFin(situation);
  }

  creeVuePiece (piece) {
    return new VuePiece(piece, this.depotRessources);
  }

  affiche (pointInsertion, $) {
    function afficheBac (bac) {
      const vueBac = new VueBac(bac);
      vueBac.affiche(pointInsertion, $);
    }

    this.$situation = $(pointInsertion);
    this.$situation.addClass('controle');

    this.situation.bacs().forEach(afficheBac);
    this.tapis.affiche(pointInsertion, $);
    this.fondSonore.affiche(pointInsertion, $);
    this.fin.affiche(pointInsertion, $);

    this.situation.on(CHANGEMENT_ETAT, (etat) => {
      if (etat === DEMARRE) {
        this.journal.enregistre(new EvenementDemarrage());
        this.demarre(pointInsertion, $);
      }
    });

    this.$situation.mousemove(e => {
      if (e.buttons === 1) {
        this.deplacePiecesSelectionnees(e);
      } else {
        this.deselectionneToutesLesPieces();
      }
    });
  }

  demarre (pointInsertion, $) {
    this.situation.on(NOUVELLE_PIECE, (piece) => {
      const vuePiece = this.creeVuePiece(piece);
      vuePiece.affiche(pointInsertion, $);
    });
    const envoiEvenementPiece = (Classe) => {
      return (piece) => {
        this.journal.enregistre(new Classe({ piece: { conforme: piece.estConforme() } }));
      };
    };
    this.situation.on(PIECE_BIEN_PLACEE, envoiEvenementPiece(EvenementPieceBienPlacee));
    this.situation.on(PIECE_MAL_PLACEE, envoiEvenementPiece(EvenementPieceMalPlacee));
    this.situation.on(PIECE_RATEE, envoiEvenementPiece(EvenementPieceRatee));
    this.situation.demarre();
  }

  deplacePiecesSelectionnees (e) {
    const piecesAffichees = this.situation.piecesAffichees();
    piecesAffichees.forEach(p => {
      p.deplaceSiSelectionnee({
        x: 100 * e.clientX / this.$situation.width(),
        y: 100 * e.clientY / this.$situation.height()
      });
    });
  }

  deselectionneToutesLesPieces () {
    const piecesAffichees = this.situation.piecesAffichees();
    piecesAffichees.forEach(p => {
      p.deselectionne();
    });
  }
}
