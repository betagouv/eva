import { creeStore, synchroniseStoreEtModeleSituation, CHARGEMENT, FINI } from 'securite/store/store';
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

  it('permet de charger les zones et les dangers', function () {
    const store = creeStore();
    const zones = [{ x: 1, y: 2, r: 3 }];
    const dangers = { danger1: {} };
    store.commit('chargeZonesEtDangers', { zones, dangers });
    expect(store.state.zones).to.eql(zones);
    expect(store.state.dangers).to.eql(dangers);
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
    store.commit('chargeZonesEtDangers', { zones: [], dangers: {} });
    expect(situation.etat()).to.eql(CHARGEMENT);
  });

  it("synchronise l'état initial du modèle situation", function () {
    const store = creeStore();
    const situation = new Situation();
    situation.modifieEtat(FINI);
    synchroniseStoreEtModeleSituation(situation, store);
    expect(store.state.etat).to.eql(FINI);
  });
});
