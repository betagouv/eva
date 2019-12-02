import EvenementAbandon from 'commun/modeles/evenement_abandon';

describe("l'événement de stop", function () {
  it('retourne son nom', function () {
    expect(new EvenementAbandon().nom()).to.eql('abandon');
  });
});
