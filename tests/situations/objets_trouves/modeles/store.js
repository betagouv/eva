import { creeStore } from 'objets_trouves/modeles/store';
import { ACCUEIL_VERROUILLE, ACCUEIL } from 'objets_trouves/modeles/situation';

describe('Le store de la situation objets trouvés', function () {
  it("permet de configurer l'acte", function () {
    const store = creeStore();
    expect(store.state.apps).to.eql({});
    expect(store.state.questionsFin).to.eql([]);
    store.commit('configureActe', {
      apps: {
        photos: {}
      },
      consignesEcranAccueil: ['Consigne 1', 'Consigne 2'],
      questionsFin: [{}]
    });
    expect(store.state.apps).to.eql({ photos: {} });
    expect(store.state.consignesEcranAccueil).to.eql(['Consigne 1', 'Consigne 2']);
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
    store.commit('configureActe', {
      appsAccueilVerrouille: { deverrouillage: {} },
      apps: { photos: {}, agenda: {} }
    });
    expect(store.getters.nombreApps).to.eql(3);
  });

  it("affiche l'accueil si pas d'app deverrouillage", function () {
    const store = creeStore();
    store.commit('configureActe', { });
    expect(store.state.etatTelephone).to.eql(ACCUEIL);
  });

  it("affiche l'écran de dévérrouillage s'il y a des apps deverrouillage", function () {
    const store = creeStore();
    store.commit('configureActe', { appsAccueilVerrouille: { deverrouillage: {} } });
    expect(store.state.etatTelephone).to.eql(ACCUEIL_VERROUILLE);
  });

  it("réinitialise les apps visitées, les apps actives et l'index des questions fin", function () {
    const store = creeStore();
    const apps = { photos: {} };
    const questionsFin = { questionFin: {} };

    store.commit('configureActe', { apps, questionsFin });
    store.commit('ajouteAppVisitee', 'photos');
    store.commit('afficheApp', 'photos');

    store.commit('configureActe', { apps, questionsFin });
    expect(store.state.appsVisitees).to.eql([]);
    expect(store.state.appActive).to.eql(null);
  });

  it("sait retourner l'icone d'une app de l'accueil", function () {
    const store = creeStore();
    const configuration = { apps: { photos: [{ icone: 'url de mon icone' }] } };
    store.commit('configureActe', configuration);
    expect(store.getters.urlIcone('photos')).to.eql('url de mon icone');
  });

  it("sait retourner l'icone d'une app de l'accueil verrouillé", function () {
    const store = creeStore();
    const configuration = { appsAccueilVerrouille: { deverrouillage: [{ icone: 'url de mon icone' }] } };
    store.commit('configureActe', configuration);
    expect(store.getters.urlIcone('deverrouillage')).to.eql('url de mon icone');
  });

  it("Sait retourner les questions de l'application active", function () {
    const store = creeStore();
    const questions = [{ id: 'une question' }];
    const questions2 = [{ id: 'une autre question' }];
    const configuration = {
      appsAccueilVerrouille: { deverrouillage: questions },
      apps: { photos: questions2 }
    };
    store.commit('configureActe', configuration);
    store.commit('afficheApp', 'deverrouillage');
    expect(store.getters.questionsAppActive).to.eql(questions);
    store.commit('afficheApp', 'photos');
    expect(store.getters.questionsAppActive).to.eql(questions2);
  });

  it("retourne les consignes de l'accueil dans l'ordre puis reste sur la dernière consigne", function () {
    const store = creeStore();
    store.commit('configureActe', {
      consignesEcranAccueil: ['Consigne 1', 'Consigne 2']
    });
    expect(store.getters.consigneEcranAccueil()).to.eql('Consigne 1');
    expect(store.getters.consigneEcranAccueil()).to.eql('Consigne 2');
    expect(store.getters.consigneEcranAccueil()).to.eql('Consigne 2');
  });

  it("Ne renvoie pas de consigne s'il n'y a pas de consigne pour l'écran d'accueil", function () {
    const store = creeStore();
    store.commit('configureActe', { });
    expect(store.getters.consigneEcranAccueil()).to.be(undefined);
  });
});
