import { creeStore } from 'objets_trouves/modeles/store';

describe('Le store de la situation objets trouvés', function () {
  it("permet de configurer l'acte", function () {
    const store = creeStore();
    expect(store.state.apps).to.eql({});
    expect(store.state.questionsFin).to.eql([]);
    store.commit('configureActe', {
      apps: {
        photos: {}
      },
      questionsFin: [{}]
    });
    expect(store.state.apps).to.eql({ photos: {} });
    expect(store.state.questionsFin).to.eql([{}]);
  });

  it("afficheApp change l'application active", function () {
    const store = creeStore();
    expect(store.state.appActive).to.be(null);
    store.commit('afficheApp', 'photos');
    expect(store.state.appActive).to.be('photos');
  });

  it("ajouteAppVisitee ajoute l'app dans un tableau", function () {
    const store = creeStore();
    expect(store.state.appsVisitees).to.eql([]);
    store.commit('ajouteAppVisitee', 'photos');
    expect(store.state.appsVisitees).to.eql(['photos']);
  });

  it('repondQuestionFin incrément indexQuestionsFin', function () {
    const store = creeStore();
    expect(store.state.indexQuestionsFin).to.eql(0);
    store.commit('repondQuestionFin');
    expect(store.state.indexQuestionsFin).to.eql(1);
  });

  it("nombreApps retourne le nombre d'apps", function () {
    const store = creeStore();
    store.commit('configureActe', { apps: { photos: {}, agenda: {} } });
    expect(store.getters.nombreApps).to.eql(2);
  });
});
