import EvenementPieceMalPlacee from 'commun/modeles/evenement_piece_mal_placee';

describe("l'événement de pièce mal placée", function () {
  it('retourne son nom', function () {
    expect(new EvenementPieceMalPlacee().nom()).to.eql('pieceMalPlacee');
  });

  it('retourne ses donnees', function () {
    const donnees = { piece: { conforme: true } };
    expect(new EvenementPieceMalPlacee(donnees).donnees()).to.eql(donnees);
  });
});
