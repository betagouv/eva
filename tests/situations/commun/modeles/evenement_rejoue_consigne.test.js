import EvenementRejoueConsigne from 'commun/modeles/evenement_rejoue_consigne';

describe("l'événement de rejoue de consigne", function () {
  it('retourne son nom', function () {
    expect(new EvenementRejoueConsigne().nom()).toEqual('rejoueConsigne');
  });
});
