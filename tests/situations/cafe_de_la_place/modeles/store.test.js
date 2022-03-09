import { creeStore } from 'cafe_de_la_place/modeles/store';

describe('Le store de la situation café de la place', function () {
  describe('#chapitreALrd', function () {
    it("permet la configuration d'un acte", function () {
      const store = creeStore();
      expect(store.state.chapitreALrd).toEqual({ questions: [], sousConsignes: [], texteCliquable: ''});
      store.commit('configureActe', { chapitreALrd: { sousConsignes: [{ id: 'sous-consigne'}], questions: [{ id: 'question1' }]} });
      expect(store.state.chapitreALrd).toEqual({ sousConsignes: [{ id: 'sous-consigne'}], questions: [{ id: 'question1' }]});
    });
  });
});
