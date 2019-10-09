import EvenementQualificationDanger from 'securite/modeles/evenement_qualification_danger';

describe("l'événement de la qualification de danger", function () {
  it('retourne son nom', function () {
    expect(new EvenementQualificationDanger().nom()).to.eql('qualificationDanger');
  });

  it('retourne ses donnees', function () {
    const donnees = { danger: 'nomDanger', reponse: 'bonne' };
    expect(new EvenementQualificationDanger(donnees).donnees()).to.eql(donnees);
  });
});
