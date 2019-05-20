import Piece from 'commun/modeles/piece';
import Situation from 'tri/modeles/situation';

describe('La situation « Tri »', function () {
  it('répond que toutes ses pièces sont affichées', function () {
    const pieces = [new Piece({ x: 1, y: 2, largeur: 7.44, hauteur: 11.3 })];
    let situation = new Situation({ pieces: pieces });
    expect(situation.piecesAffichees()).to.eql(pieces);
  });
});
