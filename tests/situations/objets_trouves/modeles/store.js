import { creeStore } from 'objets_trouves/modeles/store';

describe('Le store de la situation objets trouvés', function () {
  it("afficheAppli change l'application active", function () {
    const store = creeStore();
    expect(store.state.appActive).to.be(null);
    store.commit('afficheAppli', 'photos');
    expect(store.state.appActive).to.be('photos');
  });
});
