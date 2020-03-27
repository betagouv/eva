import { creeStore } from 'objets_trouves/modeles/store';

describe('Le store de la situation objets trouvés', function () {
  it("permet de configurer l'acte", function () {
    const store = creeStore();
    expect(store.state.apps).to.eql({});
    expect(store.state.consigneEcranAccueil).to.eql(null);
    expect(store.state.questionsFin).to.eql([]);
    store.commit('configureActe', {
      apps: {
        photos: {}
      },
      consigneEcranAccueil: 'Consigne',
      questionsFin: [{}]
    });
    expect(store.state.apps).to.eql({ photos: {} });
    expect(store.state.consigneEcranAccueil).to.eql('Consigne');
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

  it("nombreApps retourne le nombre d'apps", function () {
    const store = creeStore();
    store.commit('configureActe', { apps: { photos: {}, agenda: {} } });
    expect(store.getters.nombreApps).to.eql(2);
  });

  it("deverrouillageTelephone affiche l'accueil du téléphone", function () {
    const store = creeStore();
    store.commit('configureActe', { apps: { deverrouillage: {}, photos: {}, agenda: {} }, questionsFin: [{ question1: 'libelle' }] });
    expect(store.state.afficheEcranVerrouillage).to.eql(true);

    store.commit('deverrouillageTelephone', 'deverrouillage');
    expect(store.state.afficheEcranVerrouillage).to.eql(false);
  });

  it("deverrouillageTelephone supprime l'application déverrouillage du téléphone lorsque l'on est sur l'accueil", function () {
    const store = creeStore();
    store.commit('configureActe', { apps: { deverrouillage: {}, photos: {}, agenda: {} }, questionsFin: [{ question1: 'libelle' }] });
    expect(store.state.apps.deverrouillage).to.eql({});

    store.commit('deverrouillageTelephone', 'deverrouillage');
    expect(store.state.apps.deverrouillage).to.eql(undefined);
  });

  it("réinitialise les apps visitées, les apps actives et l'index des questions fin", function () {
    const store = creeStore();
    const apps = { apps: { photos: {} } };
    const questionsFin = { questionFin: {} };

    store.commit('configureActe', { apps, questionsFin });
    store.commit('ajouteAppVisitee', 'photos');
    store.commit('afficheApp', 'photos');

    store.commit('configureActe', { apps, questionsFin });
    expect(store.state.appsVisitees).to.eql([]);
    expect(store.state.appActive).to.eql(null);
  });
});
