import EvenementPieceBienPlacee from 'commun/modeles/evenement_piece_bien_placee';

describe("l'événement de pièce bien placée", function () {
  it('retourne son nom', function () {
    expect(new EvenementPieceBienPlacee().nom()).toEqual('pieceBienPlacee');
  });

  it('retourne ses donnees', function () {
    const donnees = { piece: { conforme: true } };
    expect(new EvenementPieceBienPlacee(donnees).donnees()).toEqual(donnees);
  });
});
