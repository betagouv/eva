import EvenementPiecePrise from 'commun/modeles/evenement_piece_prise';

describe("l'événement de pièce prise", function () {
  it('retourne son nom', function () {
    expect(new EvenementPiecePrise().nom()).to.eql('piecePrise');
  });

  it('retourne ses donnees', function () {
    const donnees = { piece: 'test' };
    expect(new EvenementPiecePrise(donnees).donnees()).to.eql(donnees);
  });
});
