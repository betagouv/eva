import { DISPARITION_PIECE, PIECE_BIEN_PLACEE, PIECE_MAL_PLACEE } from 'commun/modeles/piece';
import { DEMARRE, FINI } from 'commun/modeles/situation';
import Bac from 'commun/modeles/bac';
import Situation from 'tri/modeles/situation';

describe('La situation « Tri »', function () {
  it('répond que toutes ses pièces sont affichées', function () {
    const pieces = [{}];
    const situation = new Situation({ pieces, bacs: [] });
    expect(situation.piecesAffichees().length).to.eql(1);
  });

  it('spécifie que les pièces ont la categorie de leur type', function () {
    const pieces = [{ type: 'bonbon1' }];
    const situation = new Situation({ pieces, bacs: [] });
    expect(situation.piecesAffichees()[0].categorie()).to.eql('bonbon1');
  });

  it('retourne ses bacs', function () {
    const situation = new Situation({ pieces: [], bacs: [{ categorie: 1, x: 1, y: 2 }] });
    const bac = new Bac({ x: 1, y: 2, largeur: 15, hauteur: 22.5, categorie: 1 });
    expect(situation.bacs()).to.eql([bac]);
  });

  it('fait disparaitre la pièce lorsque la pièce est bien placée', function (done) {
    const situation = new Situation({ pieces: [{}], bacs: [{ x: 1, y: 2 }] });
    const bac = situation.bacs()[0];
    const piece = situation.piecesAffichees()[0];
    bac.contient = () => true;
    bac.correspondALaCategorie = () => true;
    piece.on(DISPARITION_PIECE, () => {
      expect(situation.piecesAffichees().length).to.eql(0);
      done();
    });
    piece.selectionne({});
    piece.deselectionne();
  });

  it("émet l'événement PIECE_BIEN_PLACEE lorsque la pièce est bien placée", function (done) {
    const situation = new Situation({ pieces: [{}], bacs: [{ x: 1, y: 2 }] });
    const piece = situation.piecesAffichees()[0];
    const bac = situation.bacs()[0];
    situation.on(PIECE_BIEN_PLACEE, (piece2, bac2) => {
      expect(piece2).to.equal(piece);
      expect(bac2).to.equal(bac);
      done();
    });
    situation.faitDisparaitreLaPiece(piece, bac);
  });

  it("remet la pièce dans sa position initiale lorsqu'elle n'est pas dans son bac", function () {
    const situation = new Situation({ pieces: [{ x: 4, y: 5 }], bacs: [{ x: 1, y: 2 }] });
    const bac = situation.bacs()[0];
    const piece = situation.piecesAffichees()[0];
    bac.contient = () => false;
    piece.selectionne({ x: 0, y: 0 });
    piece.deplaceSiSelectionnee({ x: 10, y: 20 });
    piece.deselectionne();
    expect(piece.position()).to.eql({ x: 4, y: 5 });
    expect(situation.resultat.erreurs).to.eql(1);
  });

  it("émet l'événement PIECE_MAL_PLACEE lorsque la pièce n'est pas dans son bac", function (done) {
    const situation = new Situation({ pieces: [{ x: 4, y: 5 }], bacs: [{ x: 1, y: 2 }] });
    const piece = situation.piecesAffichees()[0];
    const bac = situation.bacs()[0];
    situation.on(PIECE_MAL_PLACEE, (piece2, bac2) => {
      expect(piece2).to.equal(piece);
      expect(bac2).to.equal(bac);
      done();
    });
    situation.comptabiliseErreur(piece, bac);
  });

  it('passe la situation en fin lorsque toutes les pièces ont été trié', function () {
    const situation = new Situation({ pieces: [{}, {}], bacs: [{ x: 1, y: 2 }] });
    const piece1 = situation.piecesAffichees()[0];
    const piece2 = situation.piecesAffichees()[1];
    situation.faitDisparaitreLaPiece(piece1);
    situation.faitDisparaitreLaPiece(piece2);
    expect(situation.etat()).to.eql(FINI);
  });

  it('mesure le temps passé', function () {
    let maintenant;
    const situation = new Situation(
      { pieces: [{}, {}], bacs: [{ x: 1, y: 2 }] },
      () => maintenant
    );
    maintenant = 1;
    situation.modifieEtat(DEMARRE);
    const piece1 = situation.piecesAffichees()[0];
    const piece2 = situation.piecesAffichees()[1];
    situation.faitDisparaitreLaPiece(piece1);
    maintenant = 4;
    situation.faitDisparaitreLaPiece(piece2);
    expect(situation.resultat.temps_passe).to.eql(3);
  });
});
