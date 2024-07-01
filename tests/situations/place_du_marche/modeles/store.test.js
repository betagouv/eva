import {
  NIVEAU1,
  NIVEAU2,
  NIVEAU3,
  creeStore
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
      expect(store.state.carteActive).toEqual(questionNiveau1Question1);
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

    describe('#carteSuivanteParcours', function () {
      it("passe à la question suivante", function() {
        store.commit('carteSuivanteParcours');

        expect(store.state.carteActive).toEqual(questionNiveau1Question2);
      });

      it("passe de la dernière question du jeu de cartes en cours à la première question du jeu suivant", function() {
        store.state.indexCarte = 1;
        store.commit('carteSuivanteParcours');

        expect(store.state.carteActive).toEqual(questionNiveau1Question3);
      });

      it("termine le parcours après la dernière question", function() {
        store.state.indexCarte = 0;
        store.state.indexSerie = 1;
        store.state.carteActive = questionNiveau2;
        store.commit('carteSuivanteParcours');
        expect(store.state.parcoursTermine).toBe(true);
        expect(store.state.carteActive).toEqual(questionNiveau2);
        expect(store.getters.nombreCartes).toEqual(1);
      });
    });

    describe("#carteSuivante", function() {
      describe('quand la série est terminée', function() {
        beforeEach(function() {
          store.state.indexCarte = 0;
          store.state.indexSerie = 1;
          store.state.carteActive = questionNiveau2;
        });

        it("termine la situation après la dernière question du dernier niveau", function () {
          expect(store.state.carteActive).toEqual(questionNiveau2);
          expect(store.state.termine).toBe(false);
          store.commit('carteSuivante');
          expect(store.state.carteActive).toEqual(questionNiveau2);
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

    describe("#maxScoreNiveauEnCours", function() {
      it('retourne le score maximum du niveau en cours', function() {
        store.state.parcours = NIVEAU1;
        expect(store.getters.maxScoreNiveauEnCours).toEqual(2.5);
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
        store.state.carteActive = questionAvecRattrapage;
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
  });

  describe("#enregistreReponse", function() {
    it('peut enregistrer une réponse et la restituer', function() {
      store.state.carteActive = questionNiveau1Question1;
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
        store.state.carteActive = questionNiveau1Question1;
      });

      describe("quand la réponse est bonne et qu'aucun rattrapage n'est en cours", function() {
        it("met à jour le pourcentage de réussite globale", function() {
          expect(store.state.pourcentageDeReussiteGlobal).toEqual(0);
          store.commit('enregistreReponse', { succes: true });
          expect(store.state.pourcentageDeReussiteGlobal).toEqual(20);
        });

        it("accumule le pourcentage au fur et à mesure des reponses", function() {
          expect(store.getters.maxScoreNiveauEnCours).toEqual(2.5);
          store.commit('enregistreReponse', { succes: true });
          expect(store.state.pourcentageDeReussiteGlobal).toEqual(20);

          store.state.carteActive = questionNiveau1Question2;
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

      describe("quand la réponse estfausse et fait partie d'une compétence à rattraper", function() {
        it("décompte du pourcentage de réussite de la compétence", function() {
          questionAvecRattrapage.nom_technique = 'N1Prn1';
          store.state.carteActive = questionAvecRattrapage;
          store.commit('enregistreReponse', { succes: true });
          expect(store.state.pourcentageDeReussiteCompetence['N1Prn']).toEqual(100);

          store.commit('enregistreReponse', { succes: false });
          expect(store.state.pourcentageDeReussiteCompetence['N1Prn']).toEqual(50);
        });
      });
    });
  });
});
