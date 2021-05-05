import EvenementEvaluationDanger from 'prevention/modeles/evenement_evaluation_danger';

describe("l'événement d'évaluation de danger", function () {
  it('retourne son nom', function () {
    expect(new EvenementEvaluationDanger().nom()).toEqual('evaluationDanger');
  });
});
