import Bac from 'commun/modeles/bac';
import Situation, { DISPARITION_PIECE } from 'tri/modeles/situation';

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
    const situation = new Situation({ pieces: [{ categorie: 1 }], bacs: [{ categorie: 1, x: 1, y: 2 }] });
    const bac = situation.bacs()[0];
    const piece = situation.piecesAffichees()[0];
    bac.contient = () => true;
    bac.correspondALaCategorie = () => true;
    piece.on(DISPARITION_PIECE, () => {
      done();
    });
    piece.selectionne({});
    piece.deselectionne();
  });
});
