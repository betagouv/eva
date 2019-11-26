import EvenementFermetureContenant from 'inventaire/modeles/evenement_fermeture_contenant';

describe("l'événement d'ouverture de contenant", function () {
  it('retourne son nom', function () {
    expect(new EvenementFermetureContenant().nom()).to.eql('fermetureContenant');
  });

  it('retourne ses donnees', function () {
    const donnees = { contenant: '1' };
    expect(new EvenementFermetureContenant(donnees).donnees()).to.eql(donnees);
  });
});
