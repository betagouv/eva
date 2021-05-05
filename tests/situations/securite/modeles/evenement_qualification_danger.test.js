import EvenementQualificationDanger from 'securite/modeles/evenement_qualification_danger';

describe("l'événement de la qualification de danger", function () {
  it('retourne son nom', function () {
    expect(new EvenementQualificationDanger().nom()).toEqual('qualificationDanger');
  });

  it('retourne ses donnees', function () {
    const donnees = { danger: 'nomDanger', reponse: 'bonne' };
    expect(new EvenementQualificationDanger(donnees).donnees()).toEqual(donnees);
  });
});
