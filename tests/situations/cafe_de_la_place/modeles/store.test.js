import { creeStore } from 'cafe_de_la_place/modeles/store';

describe('Le store de la situation café de la place', function () {
  describe('#questions', function () {
    it("permet la configuration d'un acte", function () {
      const store = creeStore();
      expect(store.state.questions).toEqual([]);
      store.commit('configureActe', { questions: [{ id: 'question1' }] });
      expect(store.state.questions).toEqual([{ id: 'question1' }]);
    });
  });
});
