import { NUMERATIE, creeStore } from 'place_du_marche/modeles/store';

describe('Le store de la situation place du marché', function () {
  let store;
  const questionNiveau1Question1 = { id: 'questionN1Q1', score: 0.5 };
  const questionNiveau1Question2 = { id: 'questionN1Q2', score: 1 };
  const questionNiveau2 = { id: 'questionN2'};
  const questionNiveau3 = { id: 'questionN3'};

  const configuration = {
    [NUMERATIE]: {
      series: [
        { cartes: [questionNiveau1Question1, questionNiveau1Question2]},
        { cartes: [questionNiveau2]},
        { cartes: [questionNiveau3]},
      ],
    },
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

    describe("#nombreCarte", function() {
      it('retourne le nombre de cartes dans la série en cours', function() {
        expect(store.getters.nombreCartes).toEqual(2);

        store.state.indexSerie = 2;
        expect(store.getters.nombreCartes).toEqual(1);
      });
    });

    describe('#carteSuivanteParcours', function () {
      it("passe à la question suivante", function() {
        store.commit('carteSuivanteParcours');

        expect(store.state.carteActive).toEqual(questionNiveau1Question2);
      });

      it("passe de la dernière question du jeu de cartes en cours à la première question du jeu suivant", function() {
        store.state.indexCarte = 1;
        store.state.pourcentageDeReussite = 75;
        store.carteActive = questionNiveau1Question2;
        store.commit('carteSuivanteParcours');

        expect(store.state.carteActive).toEqual(questionNiveau2);
      });

      it("termine le parcours après la dernière question", function() {
        store.state.indexCarte = 0;
        store.state.indexSerie = 2;
        store.state.carteActive = questionNiveau3;
        store.commit('carteSuivanteParcours');
        expect(store.state.parcoursTermine).toBe(true);
        expect(store.state.carteActive).toEqual(questionNiveau3);
        expect(store.getters.nombreCartes).toEqual(1);
      });

      describe("à la fin d'un niveau", function() {
        beforeEach(function() {
          store.state.indexCarte = 1;
          store.state.indexSerie = 0;
          store.state.carteActive = questionNiveau1Question2;
        });

        it("continue la situation si le pourcentage de réussite est supérieur à 70", function () {
          store.state.pourcentageDeReussite = 75;
          store.commit('carteSuivante');
          expect(store.state.carteActive).toEqual(questionNiveau2);
          expect(store.state.termine).toBe(false);
        });

        it("termine la situation si le pourcentage de réussite est inférieur à 70", function () {
          store.state.pourcentageDeReussite = 69;
          expect(store.state.termine).toBe(false);
          store.commit('carteSuivante');
          expect(store.state.carteActive).toEqual(questionNiveau1Question2);
          expect(store.state.termine).toBe(true);
        });
      });
    });

    describe("#carteSuivante", function() {
      describe('quand la série est terminée', function() {
        beforeEach(function() {
          store.state.indexCarte = 0;
          store.state.indexSerie = 2;
          store.state.carteActive = questionNiveau3;
        });

        it("termine la situation après la dernière question", function () {
          expect(store.state.carteActive).toEqual(questionNiveau3);
          expect(store.state.termine).toBe(false);
          store.commit('carteSuivante');
          expect(store.state.carteActive).toEqual(questionNiveau3);
          expect(store.state.termine).toBe(true);
        });
      });
    });

    describe("#maxScoreNiveauEnCours", function() {
      it('retourne le score maximum du niveau en cours', function() {
        store.state.indexSerie = 0;
        expect(store.getters.maxScoreNiveauEnCours).toEqual(1.5);
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
        store.state.series = configuration[NUMERATIE].series;
        store.state.indexSerie = 0;
        store.state.carteActive = questionNiveau1Question1;
      });

      describe("quand la réponse est bonne", function() {
        it("met à jour le pourcentage de réussite", function() {
          expect(store.state.pourcentageDeReussite).toEqual(0);
          store.commit('enregistreReponse', { succes: true });
          expect(store.state.pourcentageDeReussite).toEqual(33);
        });

        it("accumule les scores au fur et à mesure des reponses", function() {
          expect(store.getters.maxScoreNiveauEnCours).toEqual(1.5);
          store.commit('enregistreReponse', { succes: true });
          expect(store.state.pourcentageDeReussite).toEqual(33);

          store.state.carteActive = questionNiveau1Question2;

          store.commit('enregistreReponse', { succes: true });
          expect(store.state.pourcentageDeReussite).toEqual(100);
        });
      });

      describe("quand la réponse est fausse", function() {
        it("n'ajoute rien", function() {
          store.commit('enregistreReponse', { succes: false });
          expect(store.state.pourcentageDeReussite).toEqual(0);
        });
      });
    });
  });
});
