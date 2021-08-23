import DepotRessourcesQuestions from 'questions/infra/depot_ressources_questions';

import RegistreCampagne from 'commun/infra/registre_campagne';

describe('Le dépot ressource de la situation Questions', function () {
  function creeDepotRessources (registreCampagne = new RegistreCampagne()) {
    return new DepotRessourcesQuestions({
      wav: () => Promise.resolve(),
      svg: () => Promise.resolve(),
      jpg: () => Promise.resolve(),
      json: (url) => Promise.resolve()
    }, 'http://api.localhost', registreCampagne);
  }

  it("il retourne les questions de l'évaluation lorque aucun questionnaire n'est associé a la situation", function () {
    const nomSituation = 'nom_situation';
    const campagne = {
      questions: [
        { id: '1', nom_technique: 'bienvenue_1' }
      ],
      situations: [
        {
          nom_technique: 'nom_situation',
          questionnaire_id: null,
          questionnaire: [],
          questionnaire_entrainement_id: null,
          questionnaire_entrainement: []
        }
      ]
    };
    const registreCampagne = new RegistreCampagne();
    registreCampagne.recupereCampagneCourante = () => {
      return campagne;
    };

    const depotRessources = creeDepotRessources(registreCampagne);
    depotRessources.chargeEvaluation('urlEvaluation.json', nomSituation);
    return depotRessources.chargement().then(() => {
      expect(depotRessources.questions()).toEqual([
        { id: '1', illustration: 'bienvenue_background.jpg', nom_technique: 'bienvenue_1' }
      ]);
    });
  });

  it("lorsque la situation n'est pas dans l'évaluation, retourne les questions", function () {
    const nomSituation = 'nomSituation';
    const campagne = {
      questions: [
        { id: '1', nom_technique: 'bienvenue_1' }
      ],
      situations: []
    };
    const registreCampagne = new RegistreCampagne();
    registreCampagne.recupereCampagneCourante = () => {
      return campagne;
    };

    const depotRessources = creeDepotRessources(registreCampagne);
    depotRessources.chargeEvaluation('urlEvaluation.json', nomSituation);
    return depotRessources.chargement().then(() => {
      expect(depotRessources.questions()).toEqual([
        { id: '1', illustration: 'bienvenue_background.jpg', nom_technique: 'bienvenue_1' }
      ]);
    });
  });

  it('lorsque la situation a un questionnaire, charge le questionnaire associé', function () {
    const nomSituation = 'nom_situation';
    const campagne = {
      situations: [
        {
          nom_technique: 'nom_situation',
          questionnaire_id: 1,
          questionnaire: [{ id: 1, nom_technique: 'bienvenue_1' }]
        }
      ]
    };
    const registreCampagne = new RegistreCampagne();
    registreCampagne.recupereCampagneCourante = () => {
      return campagne;
    };

    const depotRessources = creeDepotRessources(registreCampagne);
    depotRessources.chargeEvaluation('urlEvaluation.json', nomSituation);
    return depotRessources.chargement().then(() => {
      expect(depotRessources.questions()).toEqual([
        { id: 1, illustration: 'bienvenue_background.jpg', nom_technique: 'bienvenue_1' }
      ]);
    });
  });

  it("lorsque la situation a un questionnaire de situation et d'entrainement, il les charge", function () {
    const nomSituation = 'nom_situation';
    const campagne = {
      situations: [
        {
          nom_technique: 'nom_situation',
          questionnaire_id: 1,
          questionnaire: [{ id: 1, nom_technique: 'bienvenue_1' }],
          questionnaire_entrainement_id: 2,
          questionnaire_entrainement: [{ id: 2, nom_technique: 'bienvenue_1' }]
        }
      ]
    };
    const registreCampagne = new RegistreCampagne();
    registreCampagne.recupereCampagneCourante = () => {
      return campagne;
    };

    const depotRessources = creeDepotRessources(registreCampagne);
    depotRessources.chargeEvaluation('urlEvaluation.json', nomSituation);
    return depotRessources.chargement().then(() => {
      expect(depotRessources.questions()).toEqual([
        { id: 1, illustration: 'bienvenue_background.jpg', nom_technique: 'bienvenue_1' }
      ]);
      expect(depotRessources.questionsEntrainement()).toEqual([
        { id: 2, illustration: 'bienvenue_background.jpg', nom_technique: 'bienvenue_1' }
      ]);
    });
  });

  it('charge les illustrations du questionnaire', function () {
    const nomSituation = 'nom_situation';
    const campagne = {
      situations: [
        {
          nom_technique: 'nom_situation',
          questionnaire_id: 1,
          questionnaire: [{ id: 1, nom_technique: 'bienvenue_1' }],
          questionnaire_entrainement_id: 2,
          questionnaire_entrainement: [{ id: 2, nom_technique: 'bienvenue_2' }]
        }
      ]
    };
    const registreCampagne = new RegistreCampagne();
    registreCampagne.recupereCampagneCourante = () => {
      return campagne;
    };

    const depotRessources = creeDepotRessources(registreCampagne);
    depotRessources.chargeEvaluation('urlEvaluation.json', nomSituation);
    let illustrationsUrls;
    depotRessources.charge = (illustrations) => { illustrationsUrls = illustrations; };
    return depotRessources.chargement().then(() => {
      expect(illustrationsUrls).toEqual(['bienvenue_background.jpg', 'bienvenue_background.jpg']);
    });
  });

  it("quand une question n'a pas d'illustration, retourne une erreur", function () {
    const depotRessources = creeDepotRessources();

    depotRessources.questions = () => { return [{ id: '1', nom_technique: 'inconnu' }]; };
    depotRessources.questionsEntrainement = () => { return []; };

    expect(() => {
      depotRessources.chargeIllustrations();
    }).toThrow("La question 1 ne possède pas d'illustration");
  });
});
