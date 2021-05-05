import EvenementPreventionDanger from 'prevention/modeles/evenement_prevention_danger';

describe("l'événement de prévention du danger", function () {
  it('retourne son nom', function () {
    expect(new EvenementPreventionDanger().nom()).toEqual('preventionDanger');
  });
});
