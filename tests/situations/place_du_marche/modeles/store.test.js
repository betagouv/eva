import {
  NIVEAU1,
  NIVEAU2,
  NIVEAU3,
  creeStore,
  additionneScores,
  calculPourcentage,
  recupereReponsesMeilleursScores,
  reinitialiseRattrapagesAPasser,
  retrouveQuestionConfiguration,
  calculeScoreParMetrique,
  filtreMeilleursScores
} from 'place_du_marche/modeles/store';
import {
  DEMARRE,
} from 'commun/modeles/situation';

describe('Le store de la situation place du marché', function () {
  let store;
  const questionNiveau1Question1 = { nom_technique: 'N1Pse1', score: 0.5 };
  const questionNiveau1Question2 = { nom_technique: 'N1Pse2', score: 1 };
  const questionNiveau1Question3 = { nom_technique: 'N1Pse3', score: 1 };
  const N1PrnSousConsigne = { nom_technique: 'Sous-consigne-sans-score' };
  const questionNiveau2 = { nom_technique: 'N2Pse1'};
  const questionNiveau3 = { nom_technique: 'N3Pse1', score: 1.5};
  const questionAvecRattrapage = { score: 1 };
  const questionRattrapage = { nom_technique: 'N1Rrn1' };

  let configuration = {
    questions: {
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
          { cartes: [ N1PrnSousConsigne ] },
        ],
      },
      ['N1Prn']: {
        series: [
          { cartes: [questionRattrapage] },
        ],
      },
      ['N1Roa']: {
        series: [
          { cartes: [{ nom_technique: 'N1Roa1' }, { nom_technique: 'N1Roa2' }] },
        ],
      }
    }
  };

  beforeEach(function() {
    store = creeStore();
  });

  describe('quand un acte est configuré', function() {
    beforeEach(function() {
      store.state.etat = DEMARRE;
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
      beforeEach(function() {
        store.state.parcours = 'N1Rrn';
        store.state.pourcentageDeReussiteCompetence['N1Prn'] = 50;
        store.state.pourcentageDeReussiteCompetence['N1Poa'] = 50;
      });

      it("retourne true si c'est la derniere question du rattrapage", function() {
        store.state.questionActive = { nom_technique: 'N1Roa2' };
        expect(store.getters.estDerniereQuestionRattrapage).toEqual(true);
      });

      it("retourne false si ce n'est pas la derniere question du rattrapage", function() {
        store.state.questionActive = { nom_technique: 'N1Roa1' };
        expect(store.getters.estDerniereQuestionRattrapage).toEqual(false);
      });
    });

    describe("#derniereQuestionRattrapage", function() {
      it("retourne le nom technique de la dernière question du rattrapage", function() {
        store.state.pourcentageDeReussiteCompetence['N1Prn'] = 50;
        store.state.pourcentageDeReussiteCompetence['N1Poa'] = 50;
        expect(store.getters.derniereQuestionRattrapage).toEqual('N1Roa2');
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
      it("reinitialise l'activation de l'aide", function() {
        store.state.aide = true;
        store.commit('carteSuivante');
        expect(store.state.aide).toBe(false);
      });

      describe("si le parcours n'est pas terminé", function() {
        beforeEach(function() {
          store.state.parcoursTermine = false;
        });

        it("ne change pas de niveau", function() {
          expect(store.state.indexNiveau).toEqual(0);
        });
      });

      describe("si le parcours est terminé", function() {
        beforeEach(function() {
          store.state.parcoursTermine = true;
        });

        describe('quand le pourcentage de réussite est supérieur à 70', function() {
          beforeEach(function() {
            store.state.pourcentageDeReussiteGlobal = 71;
          });

          describe("et que ce n'est pas le dernier niveau", function(){
            it("démarre le niveau suivant", function () {
              expect(store.state.parcours).toBe(NIVEAU1);

              store.commit('carteSuivante');
              expect(store.state.parcours).toBe(NIVEAU2);
              expect(store.state.indexNiveau).toEqual(1);
              expect(store.state.termine).toBe(false);
            });

            it("réinitialise les rattrapages à passer", function () {
              store.state.pourcentageDeReussiteCompetence['N1Prn'] = 50;
              store.commit('carteSuivante');
              expect(store.state.pourcentageDeReussiteCompetence['N1Prn']).toEqual(100);
              expect(store.getters.rattrapagesAPasser).toEqual([]);
            });
          });

          describe("et que c'est le dernier niveau", function(){
            it("termine la situation", function () {
              store.state.parcours = NIVEAU3;
              expect(store.getters.estDernierNiveau).toBe(true);

              store.commit('carteSuivante');
              expect(store.state.termine).toBe(true);
            });
          });
        });

        describe('quand le pourcentage de réussite est inférieur à 70', function() {
          beforeEach(function() {
            store.state.pourcentageDeReussiteGlobal = 69;
          });

          describe('si il y a des compétences à rattraper', function() {
            beforeEach(function() {
              store.state.pourcentageDeReussiteCompetence['N1Prn'] = 50;
            });

            it("termine si ils ont déjà été passés", function () {
              store.state.indexRattrapage = 1;
              store.commit('carteSuivante');
              expect(store.state.termine).toEqual(true);
            });

            it("démarre le parcours de rattrapage", function () {
              expect(store.getters.rattrapagesAPasser).toEqual(['N1Prn']);
              expect(store.state.indexRattrapage).toEqual(0);
              store.commit('carteSuivante');
              expect(store.state.parcours).toEqual('N1Prn');
              expect(store.state.indexRattrapage).toEqual(1);
            });
          });

          describe("si il n'y a pas des compétences à rattraper", function() {
            it("termine la situation", function () {
              store.state.pourcentageDeReussiteCompetence['N1Prn'] = 100;
              store.commit('carteSuivante');
              expect(store.state.termine).toBe(true);
            });
          });
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
        store.state.series = configuration.questions[NIVEAU3].series;
        expect(store.getters.maxScoreSerieEnCours).toEqual(1.5);
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

        store.state.parcours = NIVEAU3;

        expect(store.getters.estDernierNiveau).toEqual(true);
      });
    });

    describe('#tousLesParcours', function() {
      it('retourne tous les parcours', function() {
        expect(store.getters.tousLesParcours).toEqual([NIVEAU1, NIVEAU2, NIVEAU3, 'N1Prn', 'N1Roa']);
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
      beforeEach(function() {
        store.state.questionActive = questionNiveau1Question2;
      });

      it('restitue une réponse avec score, question id et succes', function() {
        store.commit('enregistreReponse', { question: 'id1', reponse: 'ma reponse', succes: true });
        const reponse = {"question": "id1", "reponse": "ma reponse", "score": 1, "succes": true};
        expect(store.getters.reponse('id1')).toEqual(reponse);
      });

      describe("quand le succes est false", function() {
        it("envoie un score de 0 si la réponse n'a pas de score", function() {
          store.commit('enregistreReponse', { question: 'id1', succes: false });
          expect(store.getters.reponse('id1').score).toEqual(0);
        });

        it("envoie le score de la réponse", function() {
          store.commit('enregistreReponse', { question: 'id1', succes: false, score: 0.5 });

          expect(store.state.questionActive.score).toEqual(1);
          expect(store.getters.reponse('id1').score).toEqual(0.5);
        });
      });

      describe("quand le succes est true", function() {
        it("envoie le score de la question", function() {
          store.commit('enregistreReponse', { question: 'id1', succes: true });

          expect(store.state.questionActive.score).toEqual(1);
          expect(store.getters.reponse('id1').score).toEqual(1);
        });
      });

      describe("mise à jour du poucentage de réussite d'un niveau", function() {
        beforeEach(function() {
          store.state.parcours = NIVEAU1;
          store.state.series = configuration.questions[NIVEAU1].series;
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
        beforeEach(function() {
          store.state.parcours = NIVEAU1;
          store.state.questionActive = questionNiveau1Question1;
          store.state.pourcentageDeReussiteGlobal = 60;
        });

        it("ne change rien", function() {
          store.commit('recalculePourcentageReussiteGlobal');
          expect(store.state.pourcentageDeReussiteGlobal).toEqual(60);
        });
      });

      describe("si c'est la dernière question du rattrapage", function() {
        beforeEach(function() {
          store.state.configuration = configuration.questions;
          store.state.parcours = 'N1Rrn';
          store.state.reponses = {
            'N1Prn1': { question: 'N1Prn1', score: 0 },
            'N1Rrn1': { question: 'N1Rrn1', score: 1 },
          };
          store.state.questionActive = { nom_technique: 'N1Rrn1' };
          store.state.pourcentageDeReussiteCompetence = { 'N1Prn': 40 };
          store.state.maxScoreNiveauEnCours = 2;
        });

        it('retourne le nouveau pourcentage de réussite global', function() {
          expect(store.state.pourcentageDeReussiteGlobal).toEqual(0);
          store.commit('recalculePourcentageReussiteGlobal');
          expect(store.state.pourcentageDeReussiteGlobal).toEqual(50);
        });
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
        const result = calculeScoreParMetrique(mockReponses, NIVEAU1);
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
        const result = filtreMeilleursScores(scoresParMetrique, NIVEAU1);
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

    describe('#retrouveQuestionConfiguration', function() {
      it('retrouve la question dans la configuration', () => {
        store.state.configuration = configuration.questions;
        expect(retrouveQuestionConfiguration(store.state.configuration, 'N1Roa')).toEqual("N1Roa2");
      });
    });
  });
});
