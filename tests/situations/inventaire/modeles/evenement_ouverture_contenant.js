import EvenementOuvertureContenant from 'inventaire/modeles/evenement_ouverture_contenant';

describe("l'événement d'ouverture de contenant", function () {
  it('retourne son nom', function () {
    expect(new EvenementOuvertureContenant().nom()).to.eql('ouvertureContenant');
  });

  it('retourne ses donnees', function () {
    const donnees = { contenant: '1' };
    expect(new EvenementOuvertureContenant(donnees).donnees()).to.eql(donnees);
  });
});
