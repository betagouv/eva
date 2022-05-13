import { creeStore } from 'cafe_de_la_place/modeles/store';

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

  const configuration = {
    orientation: {
      series: [
        {
          cartes: [premiereSousConsigne, deuxiemeSousConsigne],
          texteCliquable: 'un texte clicable'
        },
        { cartes: [premiereQuestion, question2] },
        { cartes: [sousConsigne3] },
        { cartes: [question3, question4] }
      ]
    },
    parcoursBas: {
      series: [
        { cartes: [question1Bas, question2Bas] }
      ]
    },
    parcoursHaut: {
      series: [
        { cartes: [question1Haut] }
      ]
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
        expect(store.getters.texteCliquable).toEqual('un texte clicable');
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
          store.state.score = 9;
          store.commit('carteSuivante');
          expect(store.state.parcours).toEqual('parcoursBas');
          expect(store.state.termine).toBe(false);
          expect(store.state.carteActive).toEqual(question1Bas);
        });

        it("passe au parcours haut si le score est >= 10", function() {
          store.state.score = 10;
          store.commit('carteSuivante');
          expect(store.state.parcours).toEqual('parcoursHaut');
          expect(store.state.termine).toBe(false);
          expect(store.state.carteActive).toEqual(question1Haut);
        });

        it("termine après la dernière question du parcours suivant orientation", function () {
          store.state.score = 9;
          store.commit('carteSuivante'); // dernière question d'orientation
          store.commit('carteSuivante'); // passe la première question
          expect(store.state.carteActive).toEqual(question2Bas);
          expect(store.state.termine).toBe(false);
          store.commit('carteSuivante');
          expect(store.state.carteActive).toEqual(question2Bas);
          expect(store.state.termine).toBe(true);
        });
      });
    });

    describe("#sauteALaCarte", function () {
      it("peut sauter à une carte", function () {
        store.commit('sauteALaCarte', 'question2');
        expect(store.state.carteActive).toEqual(question2);
      });

      it("peut sauter à une carte du parcours haut", function () {
        store.commit('sauteALaCarte', 'question1Haut');
        expect(store.state.carteActive).toEqual(question1Haut);
      });

      it("saute jusqu'a la fin si la carte n'est pas connue", function () {
        store.commit('sauteALaCarte', 'inconnue');
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

    it("quand une réponse correcte n'a pas de score", function() {
      const laReponse = { succes: true };
      store.commit('enregistreReponse', laReponse);
      expect(store.state.score).toEqual(0);
    });

    it("Ajoute le score d'une réponse correcte", function() {
      const laReponse = { score: 1, succes: true };
      store.commit('enregistreReponse', laReponse);
      expect(store.state.score).toEqual(1);
    });

    it("n'ajoute pas le score d'une réponse incorrecte", function() {
      const laReponse = { score: 1, succes: false };
      store.commit('enregistreReponse', laReponse);
      expect(store.state.score).toEqual(0);
    });

    it("accumule les scores au fur et a mesure des reponses", function() {
      const reponse1 = { score: 1, succes: true };
      store.commit('enregistreReponse', reponse1);
      const reponse2 = { score: 2, succes: true };
      store.commit('enregistreReponse', reponse2);
      expect(store.state.score).toEqual(3);
    });
  });
});
