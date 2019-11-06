import EvenementActivationAide from 'commun/modeles/evenement_activation_aide';

describe("l'événement de l'activation de l'aide", function () {
  it('retourne son nom', function () {
    expect(new EvenementActivationAide().nom()).to.eql('activationAide');
  });
});
