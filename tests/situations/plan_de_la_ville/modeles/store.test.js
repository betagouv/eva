import { creeStore } from 'plan_de_la_ville/modeles/store';

describe('Le store de la situation plan de la ville', function () {
  describe('#questions', function () {
    it("permet la configuration d'un acte", function () {
      const store = creeStore();
      expect(store.state.questions).toEqual([]);
      store.commit('configureActe', { questions: [{ id: 'couleur' }] });
      expect(store.state.questions).toEqual([{ id: 'couleur' }]);
    });
  });
});
