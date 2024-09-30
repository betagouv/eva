import {
  NIVEAU1,
  NIVEAU2,
  NIVEAU3,
  creeStore,
  additionneScores,
  calculPourcentage,
  recupereReponsesMeilleursScores,
  reinitialiseRattrapagesAPasser,
  calculeScoreParMetrique,
  filtreMeilleursScores
} from 'place_du_marche/modeles/store';

describe('Le store de la situation place du marché', function () {
  let store;
  const questionNiveau1Question1 = { nom_technique: 'N1Pse1', score: 0.5 };
  const questionNiveau1Question2 = { nom_technique: 'N1Pse2', score: 1 };
  const questionNiveau1Question3 = { nom_technique: 'N1Pse3', score: 1 };
  const questionNiveau2 = { nom_technique: 'N2Pse1'};
  const questionNiveau3 = { nom_technique: 'N3Pse1'};
  const questionAvecRattrapage = { score: 1 };
  const questionRattrapage = { nom_technique: 'N1Rrn1' };

  let configuration = {
    [NIVEAU1]: {
      series: [
        { cartes: [questionNiveau1Question1, questionNiveau1Question2]},
        { cartes: [questionNiveau1Question3]},
      ],
    },
    [NIVEAU2]: {
      series: [
        { cartes: [questionNiveau2]},
      ],
    },
    [NIVEAU3]: {
      series: [
        { cartes: [questionNiveau3]},
      ],
    },
    ['N1Prn']: {
      series: [
        { cartes: [questionRattrapage]},
      ],
    }
  };

  beforeEach(function() {
    store = creeStore();
  });

  describe('quand un acte est configuré', function() {
    beforeEach(function() {
      store.commit('configureActe', configuration);
    });

    it("s'initialise avec le premier chapitre et la première carte du chapitre", function () {
      expect(store.state.indexCarte).toEqual(0);
      expect(store.state.questionActive).toEqual(questionNiveau1Question1);
    });

    describe("#nombreCartes", function() {
      it('retourne le nombre de cartes dans la série en cours', function() {
        store.state.indexSerie = 0;
        expect(store.getters.nombreCartes).toEqual(2);

        store.state.indexSerie = 1;
        expect(store.getters.nombreCartes).toEqual(1);
      });
    });

    describe("#rattrapagesAPasser", function() {
      it('retourne les compétences à rattraper', function() {
        expect(store.getters.rattrapagesAPasser).toEqual([]);

        store.state.pourcentageDeReussiteCompetence['N1Prn'] = 50;

        expect(store.getters.rattrapagesAPasser).toEqual(['N1Prn']);
      });
    });

    describe("#estDerniereQuestionRattrapage", function() {
      it("retourne si c'est la derniere question du rattrapage", function() {
        expect(store.getters.estDerniereQuestionRattrapage).toEqual(false);

        store.state.parcours = 'N1Rrn';
        store.state.questionActive = { nom_technique: 'N1Roa2' };
        store.state.pourcentageDeReussiteCompetence['N1Prn'] = 50;
        store.state.pourcentageDeReussiteCompetence['N1Poa'] = 50;

        expect(store.getters.estDerniereQuestionRattrapage).toEqual(true);
      });
    });

    describe('#carteSuivanteParcours', function () {
      it("passe à la question suivante", function() {
        store.commit('carteSuivanteParcours');

        expect(store.state.questionActive).toEqual(questionNiveau1Question2);
      });

      it("passe de la dernière question du jeu de cartes en cours à la première question du jeu suivant", function() {
        store.state.indexCarte = 1;
        store.commit('carteSuivanteParcours');

        expect(store.state.questionActive).toEqual(questionNiveau1Question3);
      });

      it("termine le parcours après la dernière question", function() {
        store.state.indexCarte = 0;
        store.state.indexSerie = 1;
        store.state.questionActive = questionNiveau2;
        store.commit('carteSuivanteParcours');
        expect(store.state.parcoursTermine).toBe(true);
        expect(store.state.questionActive).toEqual(questionNiveau2);
        expect(store.getters.nombreCartes).toEqual(1);
      });
    });

    describe("#carteSuivante", function() {
      describe('quand la série est terminée', function() {
        beforeEach(function() {
          store.state.indexCarte = 0;
          store.state.indexSerie = 1;
          store.state.questionActive = questionNiveau2;
        });

        it("termine la situation après la dernière question du dernier niveau", function () {
          expect(store.state.questionActive).toEqual(questionNiveau2);
          expect(store.state.termine).toBe(false);
          store.commit('carteSuivante');
          expect(store.state.questionActive).toEqual(questionNiveau2);
          expect(store.state.termine).toBe(true);
        });
      });

      describe('quand un niveau est terminé', function() {
        beforeEach(function() {
          store.state.parcoursTermine = true;
        });

        describe('si le pourcentage de réussite du parcours est supérieur à 70', function() {
          beforeEach(function() {
            store.state.pourcentageDeReussiteGlobal = 71;
          });

          it("démarre le niveau suivant", function () {
            expect(store.state.parcours).toBe(NIVEAU1);

            store.commit('carteSuivante');
            expect(store.state.parcours).toBe(NIVEAU2);
            expect(store.state.termine).toBe(false);
          });

          it("termine la situation à la fin du dernier niveau", function () {
            store.state.parcours = NIVEAU3;
            expect(store.getters.estDernierNiveau).toBe(true);

            store.commit('carteSuivante');
            expect(store.state.termine).toBe(true);
          });
        });

        describe('si le pourcentage de réussite du parcours est inférieur à 70', function() {
          beforeEach(function() {
            store.state.pourcentageDeReussiteGlobal = 69;
          });

          describe('quand il y a des compétences à rattraper', function() {
            it("démarre le parcours de rattrapage", function () {
              store.state.pourcentageDeReussiteCompetence['N1Prn'] = 50;
              store.commit('carteSuivante');
              expect(store.state.parcours).toEqual('N1Prn');
              expect(store.state.termine).toBe(false);
            });
          });

          describe("quand il n'y a pas des compétences à rattraper", function() {
            it("termine la situation", function () {
              store.state.pourcentageDeReussiteCompetence['N1Prn'] = 100;
              store.commit('carteSuivante');
              expect(store.state.termine).toBe(true);
            });
          });
        });

        it('réinitialise les rattrapages à passer avant de passer au niveau suivant', function() {
          store.state.pourcentageDeReussiteGlobal = 71;
          store.state.pourcentageDeReussiteCompetence = {
            'N1Prn': 69,
          };
          expect(store.getters.rattrapagesAPasser).toEqual(['N1Prn']);

          store.commit('carteSuivante');

          expect(store.getters.rattrapagesAPasser).toEqual([]);
        });
      });

      describe('à la dernière question tu rattrapage', function() {
        it("termine la situation", function () {
          store.state.parcoursTermine = true;
          store.state.parcours = 'N1Prn';
          expect(store.state.termine).toBe(false);

          store.commit('carteSuivante');
          expect(store.state.termine).toBe(true);
        });
      });
    });

    describe("#maxScoreSerieEnCours", function() {
      it('retourne le score maximum du niveau en cours', function() {
        store.state.parcours = NIVEAU1;
        expect(store.getters.maxScoreSerieEnCours).toEqual(2.5);
      });
    });

    describe('#codeCompetenceEnCours', function() {
      it('retourne le code compétence de la question en cours', function() {
        expect(store.getters.codeCompetenceEnCours).toEqual('N1Pse');
      });
    });

    describe('#estCompetenceARattraper', function() {
      it('retourne vrai si la compétence de la question en cours est à rattraper', function() {
        expect(store.getters.estCompetenceARattraper).toBe(false);
        questionAvecRattrapage.nom_technique = 'N1Prn1';
        store.state.questionActive = questionAvecRattrapage;
        expect(store.getters.estCompetenceARattraper).toBe(true);
      });
    });

    describe('#rattrapageEnCours', function() {
      it('retourne vrai si le parcours en cours est un rattrapage', function() {
        expect(store.getters.rattrapageEnCours).toEqual(false);

        store.state.parcours = 'N1Prn';

        expect(store.getters.rattrapageEnCours).toEqual(true);
      });
    });

    describe('#estDernierNiveau', function() {
      it('retourne vrai si le parcours en cours est le dernier niveau', function() {
        expect(store.getters.estDernierNiveau).toEqual(false);

        store.state.parcours = 'niveau3';

        expect(store.getters.estDernierNiveau).toEqual(true);
      });
    });

    describe('#tousLesParcours', function() {
      it('retourne tous les parcours', function() {
        expect(store.getters.tousLesParcours).toEqual(['niveau1', 'niveau2', 'niveau3', 'N1Prn']);
      });
    });

    describe("#sauteALaCarte", function () {
      it("peut sauter à une carte du niveau 1", function () {
        store.dispatch('sauteALaCarte', 'N1Pse2');
        expect(store.state.questionActive).toEqual(questionNiveau1Question2);
        expect(store.state.termine).toBe(false);
      });

      it("peut sauter à une carte d'un autre niveau", function () {
        store.dispatch('sauteALaCarte', 'N2Pse1');
        expect(store.state.questionActive).toEqual(questionNiveau2);
        expect(store.state.termine).toBe(false);
      });

      it("peut sauter à une carte du rattrapage", function () {
        store.dispatch('sauteALaCarte', 'N1Rrn1');
        expect(store.state.questionActive).toEqual(questionRattrapage);
        expect(store.state.termine).toBe(false);
      });
    });
  });

  describe('Mutations', function() {
    describe("#enregistreReponse", function() {
      it('peut enregistrer une réponse et la restituer', function() {
        store.state.questionActive = questionNiveau1Question1;
        let laReponse = { question: 'id1', reponse: 'ma reponse' };
        store.commit('enregistreReponse', laReponse);
        laReponse = {...laReponse, score: 0};
        expect(store.getters.reponse('id1')).toEqual(laReponse);
      });

      describe("enregistre le score d'un niveau", function() {
        beforeEach(function() {
          store.state.parcours = NIVEAU1;
          store.state.series = configuration[NIVEAU1].series;
          store.state.indexSerie = 0;
          store.state.questionActive = questionNiveau1Question1;
        });

        describe("quand la réponse est bonne et qu'aucun rattrapage n'est en cours", function() {
          it("met à jour le pourcentage de réussite globale", function() {
            expect(store.state.pourcentageDeReussiteGlobal).toEqual(0);
            store.commit('enregistreReponse', { succes: true });
            expect(store.state.pourcentageDeReussiteGlobal).toEqual(20);
          });

          it("accumule le pourcentage au fur et à mesure des reponses", function() {
            expect(store.getters.maxScoreSerieEnCours).toEqual(2.5);
            store.commit('enregistreReponse', { succes: true });
            expect(store.state.pourcentageDeReussiteGlobal).toEqual(20);

            store.state.questionActive = questionNiveau1Question2;
            store.commit('enregistreReponse', { succes: true });
            expect(store.state.pourcentageDeReussiteGlobal).toEqual(60);
          });
        });

        describe("quand la réponse est bonne et qu'un rattrapage est en cours", function() {
          it("n'ajoute rien", function() {
            store.state.parcours = 'N1Prn';
            expect(store.state.pourcentageDeReussiteGlobal).toEqual(0);
            store.commit('enregistreReponse', { succes: true });
            expect(store.state.pourcentageDeReussiteGlobal).toEqual(0);
          });
        });

        describe("quand la réponse est fausse et fait partie d'une compétence à rattraper", function() {
          it("décompte du pourcentage de réussite de la compétence", function() {
            questionAvecRattrapage.nom_technique = 'N1Prn1';
            store.state.questionActive = questionAvecRattrapage;
            store.commit('enregistreReponse', { succes: true });
            expect(store.state.pourcentageDeReussiteCompetence['N1Prn']).toEqual(100);

            store.commit('enregistreReponse', { succes: false });
            expect(store.state.pourcentageDeReussiteCompetence['N1Prn']).toEqual(50);
          });
        });
      });
    });

    describe("#recalculePourcentageReussiteGlobal", function() {
      describe("si ce n'est pas la dernière question du rattrapage", function() {
        it("ne change rien", function() {
          store.state.parcours = NIVEAU1;
          store.state.questionActive = questionNiveau1Question1;
          store.state.pourcentageDeReussiteGlobal = 60;

          store.commit('recalculePourcentageReussiteGlobal');

          expect(store.state.pourcentageDeReussiteGlobal).toEqual(60);
        });
      });

      describe("si c'est la dernière question du rattrapage", function() {
        it('retourne le nouveau pourcentage de réussite global', function() {
          store.state.parcours = 'N1Rrn';
          store.state.reponses = {
            'N1Prn1': { question: 'N1Prn1', succes: true, score: 0 },
            'N1Rrn1': { question: 'N1Rrn1', succes: true, score: 1 },
          };
          store.state.questionActive = { nom_technique: 'N1Rrn2' };
          store.state.pourcentageDeReussiteCompetence = {
            'N1Prn': 40,
          };
          store.state.maxScoreNiveauEnCours = 2;

          expect(store.state.pourcentageDeReussiteGlobal).toEqual(0);

          store.commit('recalculePourcentageReussiteGlobal');

          expect(store.state.pourcentageDeReussiteGlobal).toEqual(50);
        });
      });
    });

    describe('#recupereQuestionsServeur', function() {
      it('met à jour les questions avec les questions serveur', function() {
        const questions = [{ nom_technique: 'N1Pse1' }, { nom_technique: 'N1Pse2' }];
        store.commit('recupereQuestionsServeur', questions);

        expect(store.state.questions).toEqual(questions);
      });
    });
  });

  describe('#questionServeur', function() {
    beforeEach(function() {
      store.state.questionActive = { nom_technique: 'N1Prn1', score: 0.5, metacompetence: 'calcul' };
    });

    describe("si la question active a une question serveur avec le même nom technique", function() {
      let question;

      beforeEach(function() {
        question = { nom_technique: 'N1Prn1' };
        store.state.questions = [question];
      });

      it("retourne la question serveur", function() {
        expect(store.getters.questionServeur.id).toEqual('N1Prn1');
      });

      it("recupere les attributs de la question client", function() {
        expect(store.getters.questionServeur.score).toEqual(0.5);
        expect(store.getters.questionServeur.metacompetence).toEqual('calcul');
      });
    });

    describe("si la question active n'a pas de question serveur avec le même nom technique", function() {
      it('ne retourne rien', function() {
        store.state.questions= [];
        expect(store.getters.questionServeur).toBeUndefined();
      });
    });
  });

  describe('Helper Functions', () => {
    const mockReponses = [
      { question: 'N1Pse1', score: 0.5 },
      { question: 'N1Pde1', score: 0 },
      { question: 'N1Pde2', score: 1 },
      { question: 'N1Rde1', score: 1 },
      { question: 'N1Rde2', score: 1 }
    ];

    describe('#additionneScores', function() {
      it('additionne les scores', () => {
        const result = additionneScores(mockReponses);
        expect(result).toBe(3.5);
      });
    });

    describe('#calculPourcentage', function() {
      it('calcul le pourcentage', () => {
        const result = calculPourcentage(4, 20);
        expect(result).toBe(20);
      });
    });

    describe('#calculeScoreParMetrique', function() {
      it('filtre les réponses avec les scores', () => {
        const result = calculeScoreParMetrique(mockReponses);
        expect(result).toEqual({
          "N1Pde": 1,
          "N1Pes": 0,
          "N1Poa": 0,
          "N1Pon": 0,
          "N1Pos": 0,
          "N1Prn": 0,
          "N1Pse": 0.5,
          "N1Pvn": 0,
          "N1Rde": 2,
          "N1Res": 0,
          "N1Roa": 0,
          "N1Ron": 0,
          "N1Ros": 0,
          "N1Rrn": 0});
      });
    });

    describe('#filtreMeilleursScores', function() {
      it('filtre les meilleurs scores', () => {
        const scoresParMetrique = {
          "N1Pde": 1,
          "N1Pes": 0,
          "N1Poa": 0,
          "N1Pon": 0,
          "N1Pos": 0,
          "N1Prn": 0,
          "N1Pse": 0.5,
          "N1Pvn": 0,
          "N1Rde": 2,
          "N1Res": 0,
          "N1Roa": 0,
          "N1Ron": 0,
          "N1Ros": 0,
          "N1Rrn": 0};
        const result = filtreMeilleursScores(scoresParMetrique);
        expect(result).toEqual(["N1Pse", "N1Rrn", "N1Rde", "N1Res", "N1Ron", "N1Roa", "N1Ros", "N1Pvn"]);
      });
    });

    describe('#recupereReponsesMeilleursScores', function() {
      it('recupère les réponses des meilleurs scores', () => {
        const meilleursScores = ["N1Pse", "N1Rrn", "N1Rde", "N1Res", "N1Ron", "N1Roa", "N1Ros", "N1Pvn"];
        const result = recupereReponsesMeilleursScores(meilleursScores, mockReponses);
        expect(result).toEqual([
          { question: 'N1Pse1', score: 0.5 },
          { question: 'N1Rde1', score: 1 },
          { question: 'N1Rde2', score: 1 }
        ]);
      });
    });

    describe('#reinitialiseRattrapagesAPasser', function() {
      it('réinitialise rattrapages à passer', () => {
        store.state.pourcentageDeReussiteCompetence = {
          'N1Pde': 70,
          'N1Pes': 100,
        };
        expect(store.getters.rattrapagesAPasser).toEqual(['N1Pde']);

        reinitialiseRattrapagesAPasser(store.state);

        expect(store.getters.rattrapagesAPasser).toEqual([]);
        expect(store.state.pourcentageDeReussiteCompetence).toEqual({
          'N1Pde': 100,
          'N1Pes': 100,
        });
      });
    });
  });
});
