import {
  creeStore,
  ORIENTATION,
  PARCOURS_BAS,
  PARCOURS_HAUT_1,
  PARCOURS_HAUT_2
} from 'cafe_de_la_place/modeles/store';

describe('Le store de la situation café de la place', function () {
  let store;
  const premiereSousConsigne = { id: 'sous-consigne1', type: 'sous-consigne' };
  const deuxiemeSousConsigne = { id: 'sous-consigne2', type: 'sous-consigne' };
  const sousConsigne3 = { id: 'sous-consigne3', type: 'sous-consigne' };
  const premiereQuestion = { id: 'question1'};
  const question2 = { id: 'question2'};
  const question3 = { id: 'question3'};
  const question4 = { id: 'question4'};
  const question1Bas = { id: 'question1Bas'};
  const question2Bas = { id: 'question2Bas'};
  const question1Haut = { id: 'question1Haut'};
  const question1Haut2 = { id: 'question1Haut2'};

  const configuration = {
    questions: {
      [ORIENTATION]: {
        series: [
          {
            cartes: [premiereSousConsigne, deuxiemeSousConsigne],
            texte: 'un texte [cliquable]()'
          },
          {
            cartes: [premiereQuestion, question2],
            texte: 'un texte [cliquable]()',
            texteNonCliquable: true
          },
          { cartes: [sousConsigne3] },
          { cartes: [question3, question4] }
        ]
      },
      [PARCOURS_BAS]: {
        series: [
          { cartes: [question1Bas, question2Bas] }
        ]
      },
      [PARCOURS_HAUT_1]: {
        series: [
          { cartes: [question1Haut] }
        ]
      },
      [PARCOURS_HAUT_2]: {
        series: [
          { cartes: [question1Haut2] }
        ]
      }
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
      expect(store.state.carteActive).toEqual(premiereSousConsigne);
    });

    describe("#nombreCarte", function() {
      it('retourne le nombre de carte de la série en cours', function() {
        expect(store.getters.nombreCartes).toEqual(2);

        store.state.indexSerie = 2;
        expect(store.getters.nombreCartes).toEqual(1);
      });
    });

    describe("#texteCliquable", function() {
      it('retourne le texte cliquable de la série en cours', function() {
        expect(store.getters.texteCliquable).toEqual('un texte [cliquable]()');
      });

      it('rends le texte non cliquable à la demande', function() {
        store.state.indexSerie = 1;
        expect(store.getters.texteCliquable).toEqual('un texte cliquable');
      });
    });

    describe('#carteSuivanteParcours', function () {
      it("passe à la consigne suivante", function() {
        store.commit('carteSuivanteParcours');

        expect(store.state.carteActive).toEqual(deuxiemeSousConsigne);
      });

      it("passe de la dernière consigne à la première question", function() {
        store.state.indexCarte = 1;
        store.carteActive = deuxiemeSousConsigne;
        store.commit('carteSuivanteParcours');

        expect(store.state.carteActive).toEqual(premiereQuestion);
      });

      it("passe à la deuxième question", function () {
        store.state.indexCarte = 0;
        store.state.indexSerie = 1;
        store.state.carteActive = premiereQuestion;
        store.commit('carteSuivanteParcours');

        expect(store.state.carteActive).toEqual(question2);
      });

      it("termine le parcours après la dernière question", function() {
        store.state.indexCarte = 1;
        store.state.indexSerie = 3;
        store.state.carteActive = question4;
        store.commit('carteSuivanteParcours');
        expect(store.state.parcoursTermine).toBe(true);
        expect(store.state.carteActive).toEqual(question4);
        expect(store.getters.nombreCartes).toEqual(2);
      });
    });

    describe("#carteSuivante", function() {
      describe('quand orientation est terminée', function() {
        beforeEach(function() {
          store.state.indexCarte = 1;
          store.state.indexSerie = 3;
          store.state.carteActive = question4;
        });

        it("passe au parcours bas pour le score < 10", function() {
          store.state.scoreOrientation = 9;
          store.commit('carteSuivante');
          expect(store.state.parcours).toEqual(PARCOURS_BAS);
          expect(store.state.termine).toBe(false);
          expect(store.state.carteActive).toEqual(question1Bas);
        });

        it("passe au parcours haut si le score est >= 10", function() {
          store.state.scoreOrientation = 10;
          store.commit('carteSuivante');
          expect(store.state.parcours).toEqual(PARCOURS_HAUT_1);
          expect(store.state.termine).toBe(false);
          expect(store.state.carteActive).toEqual(question1Haut);
        });

        it("termine après la dernière question du parcours suivant orientation", function () {
          store.state.scoreOrientation = 9;
          store.commit('carteSuivante'); // dernière question d'orientation
          store.commit('carteSuivante'); // passe la première question
          expect(store.state.carteActive).toEqual(question2Bas);
          expect(store.state.termine).toBe(false);
          store.commit('carteSuivante');
          expect(store.state.carteActive).toEqual(question2Bas);
          expect(store.state.termine).toBe(true);
        });
      });

      describe('quand la première partie du parcours haut est terminé', function() {
        beforeEach(function() {
          store.commit('demarreParcours', PARCOURS_HAUT_1);
        });

        it("passe à la partie 2 si le score est supérieur à 5", function () {
          store.state.scoreHaut1 = 6;
          store.commit('carteSuivante'); // dernière question du parcours haut 1
          expect(store.state.termine).toBe(false);
          expect(store.state.carteActive).toEqual(question1Haut2);
        });

        it("démarre le parcours bas si le score est inférieur ou égal à 5", function () {
          store.state.scoreHaut1 = 5;
          store.commit('carteSuivante'); // dernière question du parcours haut 1
          expect(store.state.termine).toBe(false);
          expect(store.state.carteActive).toEqual(question1Bas);
        });
      });
    });

    describe("#sauteALaCarte", function () {
      it("peut sauter à une carte", function () {
        store.dispatch('sauteALaCarte', 'question2');
        expect(store.state.carteActive).toEqual(question2);
        expect(store.state.termine).toBe(false);
      });

      it("peut sauter à une carte de la première partie du parcours haut", function () {
        store.dispatch('sauteALaCarte', 'question1Haut');
        expect(store.state.carteActive).toEqual(question1Haut);
        expect(store.state.termine).toBe(false);
      });

      it("peut sauter à une carte de la deuxième partie du parcours haut", function () {
        store.dispatch('sauteALaCarte', 'question1Haut2');
        expect(store.state.carteActive).toEqual(question1Haut2);
        expect(store.state.termine).toBe(false);
      });

      it("saute jusqu'a la fin si la carte n'est pas connue", function () {
        store.dispatch('sauteALaCarte', 'inconnue' );
        expect(store.state.termine).toBe(true);
      });
    });
  });

  describe("#enregistreReponse", function() {
    it('peut enregistrer une réponse et la restituer', function() {
      const laReponse = { question: 'id1', reponse: 'ma reponse' };
      store.commit('enregistreReponse', laReponse);
      expect(store.getters.reponse('id1')).toEqual(laReponse);
    });

    describe("parcours orientation", function() {
      beforeEach(function() {
        store.state.parcours = ORIENTATION;
      });

      describe("quand la question n'a pas de score", function() {
        it("n'ajoute pas de score", function() {
          const laReponse = { succes: true };
          store.commit('enregistreReponse', laReponse);
          expect(store.state.scoreOrientation).toEqual(0);
        });
      });

      describe("quand la question a un score", function() {
        it("Ajoute le score d'une réponse en cas de succès", function() {
          const laReponse = { succes: true };
          store.state.carteActive = { score: 1 };
          store.commit('enregistreReponse', laReponse);
          expect(store.state.scoreOrientation).toEqual(1);
        });

        it("accumule les scores au fur et à mesure des reponses", function() {
          store.state.carteActive = { score: 2 };

          store.commit('enregistreReponse', { succes: true });
          expect(store.state.scoreOrientation).toEqual(2);

          store.commit('enregistreReponse', { succes: false });
          expect(store.state.scoreOrientation).toEqual(2);

          store.commit('enregistreReponse', { succes: true });
          expect(store.state.scoreOrientation).toEqual(4);
        });
      });
    });

    describe("pour le parcours haut", function() {
      beforeEach(function() {
        store.state.parcours = PARCOURS_HAUT_1;
      });

      describe("quand la question n'a pas de score", function() {
        it("n'ajoute rien", function() {
          const laReponse = { succes: true };
          store.commit('enregistreReponse', laReponse);
          expect(store.state.scoreHaut1).toEqual(0);
        });
      });

      describe("quand la question a un score", function() {
        beforeEach(function() {
          store.state.carteActive = { score: 1 };
        });

        it("Ajoute le score d'une réponse", function() {
          store.commit('enregistreReponse', { succes: true });
          expect(store.state.scoreHaut1).toEqual(1);
        });

        it("accumule les scores au fur et à mesure des reponses", function() {
          store.commit('enregistreReponse', { succes: true });
          expect(store.state.scoreHaut1).toEqual(1);

          store.state.carteActive = { score: 2 };

          store.commit('enregistreReponse', { succes: true });
          expect(store.state.scoreHaut1).toEqual(3);
        });
      });
    });
  });
});
