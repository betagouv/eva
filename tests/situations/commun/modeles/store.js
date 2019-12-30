import { creeStore, synchroniseStoreEtModeleSituation } from 'commun/modeles/store';
import Situation, { CHARGEMENT, FINI } from 'commun/modeles/situation';

describe('Le store en commun pour les situations', function () {
  it("initialise l'état a CHARGEMENT", function () {
    const store = creeStore();
    expect(store.state.etat).to.eql(CHARGEMENT);
  });

  it("permet de changer l'état", function () {
    const store = creeStore();
    store.commit('modifieEtat', FINI);
    expect(store.state.etat).to.eql(FINI);
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
    store.commit('activeAide');
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

  it("permet de synchroniser l'aide entre le store et le modèle situation", function () {
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
