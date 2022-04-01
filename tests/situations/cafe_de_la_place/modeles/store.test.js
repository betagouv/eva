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
  const chapitre1 = {
    series: [
      [premiereSousConsigne, deuxiemeSousConsigne],
      [premiereQuestion, question2]
    ]
  };
  const chapitre2 = {
    series: [
      [sousConsigne3],
      [question3, question4]
    ]
  };

  const configuration = {
    chapitres: [ chapitre1, chapitre2 ]
  };

  describe('quand un act est configuré', function() {
    beforeEach(function() {
      store = creeStore();
      store.commit('configureActe', configuration);
    });

    it("s'initialise avec le premier chapitre et la première carte du chapitre", function () {
      expect(store.state.chapitres[0]).toEqual(chapitre1);
      expect(store.state.indexCarte).toEqual(0);
      expect(store.state.chapitreEnCours).toEqual(chapitre1);
      expect(store.state.carteActive).toEqual(premiereSousConsigne);
    });

    describe("#nombreCarte", function() {
      it('retourne le nombre de carte du chapitre en cours de la série en cours', function() {
        store.state.chapitreEnCours = chapitre1;
        expect(store.getters.nombreCartes).toEqual(2);

        store.state.chapitreEnCours = chapitre2;
        expect(store.getters.nombreCartes).toEqual(1);

        store.state.indexSerie = 1;
        expect(store.getters.nombreCartes).toEqual(2);
      });
    });

    describe('#carteSuivante', function () {
      it("passe à la consigne suivante", function() {
        store.commit('carteSuivante');

        expect(store.state.carteActive).toEqual(deuxiemeSousConsigne);
      });

      it("passe de la dernière consigne à la première question", function() {
        store.state.indexCarte = 1;
        store.carteActive = deuxiemeSousConsigne;
        store.commit('carteSuivante');

        expect(store.state.carteActive).toEqual(premiereQuestion);
      });

      it("passe à la deuxième question", function () {
        store.state.indexCarte = 0;
        store.state.indexSerie = 1;
        store.state.carteActive = premiereQuestion;
        store.commit('carteSuivante');

        expect(store.state.carteActive).toEqual(question2);
      });

      it("passe au chapitre suivant", function() {
        store.state.indexCarte = 1;
        store.state.indexSerie = 1;
        store.state.carteActive = question2;
        store.commit('carteSuivante');

        expect(store.state.chapitreEnCours).toEqual(chapitre2);
        expect(store.state.carteActive).toEqual(sousConsigne3);
      });

      it("termine après la dernière question", function() {
        store.state.indexChapitre = 1;
        store.state.chapitreEnCours = chapitre2;
        store.state.indexCarte = 1;
        store.state.indexSerie = 1;
        store.state.carteActive = question3;
        store.commit('carteSuivante');

        expect(store.state.termine).toBe(true);
        expect(store.state.carteActive).toEqual(question3);
      });
    });
  });
});
