import Bac from 'commun/modeles/bac';
import Piece from 'commun/modeles/piece';
import Situation from 'tri/modeles/situation';

describe('La situation « Tri »', function () {
  it('répond que toutes ses pièces sont affichées', function () {
    const pieces = [new Piece({ x: 1, y: 2, largeur: 7.44, hauteur: 11.3 })];
    const situation = new Situation({ pieces, bacs: [] });
    expect(situation.piecesAffichees()).to.eql(pieces);
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
});
