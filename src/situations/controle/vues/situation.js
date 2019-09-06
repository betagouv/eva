import 'controle/styles/situation.scss';
import { CHANGEMENT_ETAT, DEMARRE } from 'commun/modeles/situation';
import { PIECE_BIEN_PLACEE, PIECE_MAL_PLACEE } from 'commun/modeles/piece';
import EvenementPieceBienPlacee from 'commun/modeles/evenement_piece_bien_placee';
import EvenementPieceMalPlacee from 'commun/modeles/evenement_piece_mal_placee';
import EvenementPieceRatee from 'controle/modeles/evenement_piece_ratee';
import { NOUVELLE_PIECE, PIECE_RATEE } from 'controle/modeles/situation';
import VueBac from 'commun/vues/bac';
import VuePiece from 'controle/vues/piece';
import VueTapis from 'controle/vues/tapis';
import VueFondSonore from 'controle/vues/fond_sonore';
import DeplaceurPieces from 'commun/composants/deplaceur_pieces';

export default class VueSituation {
  constructor (situation, journal, depotRessources) {
    this.situation = situation;
    this.journal = journal;
    this.depotRessources = depotRessources;
    this.tapis = new VueTapis(situation, depotRessources);
    this.deplaceurPieces = new DeplaceurPieces(situation);
  }

  creeVuePiece (piece) {
    return new VuePiece(piece, this.depotRessources);
  }

  affiche (pointInsertion, $) {
    function afficheBac (bac) {
      const vueBac = new VueBac(bac);
      vueBac.affiche(pointInsertion, $);
    }

    this.$situation = $(pointInsertion)
      .css('background-image', `url('${this.depotRessources.fondSituation().src}')`);
    this.$situation.addClass('controle');

    this.situation.bacs().forEach(afficheBac);
    this.tapis.affiche(pointInsertion, $);
    this.fondSonore = new VueFondSonore(this.situation, this.depotRessources);
    this.fondSonore.affiche(pointInsertion, $);

    this.situation.on(CHANGEMENT_ETAT, (etat) => {
      if (etat === DEMARRE) {
        this.demarre(pointInsertion, $);
      }
    });

    this.deplaceurPieces.activeDeplacementPieces(this.$situation, $);
  }

  demarre (pointInsertion, $) {
    this.situation.on(NOUVELLE_PIECE, (piece) => {
      const vuePiece = this.creeVuePiece(piece);
      vuePiece.affiche(pointInsertion, $);
    });
    const envoiEvenementPiece = (Classe) => {
      return (piece) => {
        this.journal.enregistre(new Classe({ piece: { conforme: piece.categorie() } }));
      };
    };
    this.situation.on(PIECE_BIEN_PLACEE, envoiEvenementPiece(EvenementPieceBienPlacee));
    this.situation.on(PIECE_MAL_PLACEE, envoiEvenementPiece(EvenementPieceMalPlacee));
    this.situation.on(PIECE_RATEE, envoiEvenementPiece(EvenementPieceRatee));
    this.situation.demarre();
  }
}
