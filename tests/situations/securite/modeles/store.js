import { creeStore, synchroniseStoreEtModeleSituation, CHARGEMENT, FINI } from 'securite/modeles/store';
import Situation from 'commun/modeles/situation';

describe('Le store de la situation sécurité', function () {
  it("initialise l'état a CHARGEMENT", function () {
    const store = creeStore();
    expect(store.state.etat).to.eql(CHARGEMENT);
  });

  it("permet de changer l'état", function () {
    const store = creeStore();
    store.commit('modifieEtat', FINI);
    expect(store.state.etat).to.eql(FINI);
  });

  it("permet la configuration d'un acte", function () {
    const store = creeStore();
    const zones = [{ x: 1, y: 2, r: 3 }];
    const dangers = { danger1: {} };
    store.commit('configureActe', { zones, dangers, fondSituation: 'fond' });
    expect(store.state.zones).to.eql(zones);
    expect(store.state.dangers).to.eql(dangers);
    expect(store.state.fondSituation).to.eql('fond');
  });

  it("réinitialise les dangers qualifiés et l'aide a la configuration de l'acte", function () {
    const store = creeStore();
    const zones = [{ x: 1, y: 2, r: 3 }];
    const dangers = { danger1: {} };
    store.commit('configureActe', { zones, dangers });
    const qualification = { nom: 'danger1', choix: 'bonne' };
    store.commit('ajouteDangerQualifie', qualification);
    store.commit('ajouteNonDangerIdentifie', 'zone1');
    store.commit('activeAide');
    store.commit('configureActe', { zones, dangers });
    expect(store.state.dangersQualifies).to.eql({});
    expect(store.state.aide).to.be(false);
    expect(store.state.nonDangersIdentifies).to.eql([]);
  });

  it('permet de stocker les dangers qualifiés', function () {
    const store = creeStore();
    expect(store.state.dangersQualifies).to.eql({});
    const qualification = { nom: 'danger1', choix: 'bonne' };
    store.commit('ajouteDangerQualifie', qualification);
    expect(store.state.dangersQualifies).to.eql({ danger1: 'bonne' });
  });

  it('permet de stocker une seule fois un danger qualifié', function () {
    const store = creeStore();
    expect(store.state.dangersQualifies).to.eql([]);
    const qualification = { nom: 'danger1', choix: 'mauvaise' };
    const qualification2 = { nom: 'danger1', choix: 'bonne' };
    store.commit('ajouteDangerQualifie', qualification);
    store.commit('ajouteDangerQualifie', qualification2);
    expect(store.state.dangersQualifies).to.eql({ danger1: 'bonne' });
  });

  it("peut donner la qualification d'un danger", function () {
    const store = creeStore();
    expect(store.getters.qualification('danger1')).to.eql(undefined);
    const qualification = { nom: 'danger1', choix: 'mauvaise' };
    store.commit('ajouteDangerQualifie', qualification);
    expect(store.getters.qualification('danger1')).to.eql('mauvaise');
  });

  it('peut donner le nombre de danger qualifiés', function () {
    const store = creeStore();
    expect(store.getters.nombreDangersQualifies).to.eql(0);
    const qualification = { nom: 'danger1', choix: 'mauvaise' };
    store.commit('ajouteDangerQualifie', qualification);
    expect(store.getters.nombreDangersQualifies).to.eql(1);
  });

  it('permet de stocker les non dangers identifiés', function () {
    const store = creeStore();
    expect(store.state.nonDangersIdentifies).to.eql([]);
    store.commit('ajouteNonDangerIdentifie', 'zone1');
    expect(store.state.nonDangersIdentifies).to.eql(['zone1']);
    store.commit('ajouteNonDangerIdentifie', 'zone1');
    expect(store.state.nonDangersIdentifies).to.eql(['zone1']);
  });

  it("permet de synchroniser l'état du modèle situation avec le store", function () {
    const store = creeStore();
    const situation = new Situation();
    synchroniseStoreEtModeleSituation(situation, store);
    situation.modifieEtat(FINI);
    expect(store.state.etat).to.eql(FINI);
  });

  it('permet de synchroniser le store avec le modèle situation', function () {
    const store = creeStore();
    const situation = new Situation();
    synchroniseStoreEtModeleSituation(situation, store);
    store.commit('modifieEtat', FINI);
    expect(situation.etat()).to.eql(FINI);
  });

  it("synchronise seulement les changements d'état du store avec le modèle situation", function () {
    const store = creeStore();
    const situation = new Situation();
    synchroniseStoreEtModeleSituation(situation, store);
    store.commit('configureActe', { zones: [], dangers: {} });
    expect(situation.etat()).to.eql(CHARGEMENT);
  });

  it("synchronise l'état initial du modèle situation", function () {
    const store = creeStore();
    const situation = new Situation();
    situation.modifieEtat(FINI);
    synchroniseStoreEtModeleSituation(situation, store);
    expect(store.state.etat).to.eql(FINI);
  });

  it("permet de synchroniser l'aide entre le modèle situation et le store", function () {
    const store = creeStore();
    const situation = new Situation();
    synchroniseStoreEtModeleSituation(situation, store);
    situation.activeAide();
    expect(store.state.aide).to.be(true);
  });

  it("permet de synchroniser l'aide entre le  store et le modèle situation", function () {
    const store = creeStore();
    const situation = new Situation();
    synchroniseStoreEtModeleSituation(situation, store);
    store.commit('activeAide');
    expect(situation.aideActivee).to.be(true);
  });

  it("active l'aide", function () {
    const store = creeStore();
    expect(store.state.aide).to.be(false);
    store.commit('activeAide');
    expect(store.state.aide).to.be(true);
  });
});
