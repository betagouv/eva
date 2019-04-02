import Evenement from 'commun/modeles/evenement';

describe("l'événement", function () {
  it("renvoit une exception lorsqu'on lui demande son nom", function () {
    expect(new Evenement().nom).to.throwError('Pas implémenté');
  });

  it('retourne ses donnéees', function () {
    expect(new Evenement().donnees()).to.eql({});
  });
});
