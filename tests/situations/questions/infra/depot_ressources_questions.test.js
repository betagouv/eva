import DepotRessourcesQuestions from 'questions/infra/depot_ressources_questions';

describe('Le dépot ressource de la situation Questions', function () {
  function creeDepotRessources (reponsesJson) {
    return new DepotRessourcesQuestions({
      wav: () => Promise.resolve(),
      svg: () => Promise.resolve(),
      jpg: () => Promise.resolve(),
      json: (url) => Promise.resolve(() => reponsesJson[url])
    }, 'http://api.localhost');
  }

  it("il retourne les questions de l'évaluation lorque aucun questionnaire n'est associé a la situation", function () {
    const nomSituation = 'nomSituation';
    const reponsesJson = {
      'urlEvaluation.json': {
        situations: [{
          nom_technique: nomSituation
        }],
        questions: [
          { id: '1' }
        ]
      }
    };

    const depotRessources = creeDepotRessources(reponsesJson);
    depotRessources.chargeEvaluation('urlEvaluation.json', nomSituation);
    return depotRessources.chargement().then(() => {
      expect(depotRessources.questions()).toEqual([
        { id: '1' }
      ]);
    });
  });

  it("lorsque la situation n'est pas dans l'évaluation, retourne les questions", function () {
    const nomSituation = 'nomSituation';
    const reponsesJson = {
      'urlEvaluation.json': {
        situations: [],
        questions: [
          { id: '1' }
        ]
      }
    };
    const depotRessources = creeDepotRessources(reponsesJson);
    depotRessources.chargeEvaluation('urlEvaluation.json', nomSituation);
    return depotRessources.chargement().then(() => {
      expect(depotRessources.questions()).toEqual([
        { id: '1' }
      ]);
    });
  });

  it('lorsque la situation a un questionnaire, charge le questionnaire associé', function () {
    const nomSituation = 'nomSituation';
    const reponsesJson = {
      'urlEvaluation.json': {
        situations: [{
          nom_technique: nomSituation,
          questionnaire_id: 'monIdDeQuestionnaire'
        }]
      },
      'http://api.localhost/api/questionnaires/monIdDeQuestionnaire.json': [
        { id: '1' }
      ]
    };
    const depotRessources = creeDepotRessources(reponsesJson);
    depotRessources.chargeEvaluation('urlEvaluation.json', nomSituation);
    return depotRessources.chargement().then(() => {
      expect(depotRessources.questions()).toEqual([
        { id: '1' }
      ]);
    });
  });

  it("lorsque la situation a un questionnaire de situation et d'entrainement, il les charge", function () {
    const nomSituation = 'nomSituation';
    const reponsesJson = {
      'urlEvaluation.json': {
        situations: [{
          nom_technique: nomSituation,
          questionnaire_id: 'monIdDeQuestionnaire',
          questionnaire_entrainement_id: 'monIdDeQuestionnaireEntrainement'
        }]
      },
      'http://api.localhost/api/questionnaires/monIdDeQuestionnaire.json': [
        { id: '1' }
      ],
      'http://api.localhost/api/questionnaires/monIdDeQuestionnaireEntrainement.json': [
        { id: '2' }
      ]
    };
    const depotRessources = creeDepotRessources(reponsesJson);
    depotRessources.chargeEvaluation('urlEvaluation.json', nomSituation);
    return depotRessources.chargement().then(() => {
      expect(depotRessources.questions()).toEqual([
        { id: '1' }
      ]);
      expect(depotRessources.questionsEntrainement()).toEqual([
        { id: '2' }
      ]);
    });
  });
});
