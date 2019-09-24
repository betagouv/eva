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

  it('permet de charger les zones', function () {
    const store = creeStore();
    const zones = [{ x: 1, y: 2, r: 3 }];
    store.commit('chargeZones', zones);
    expect(store.state.zones).to.eql(zones);
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

  it("synchronise l'état initial du modèle situation", function () {
    const store = creeStore();
    const situation = new Situation();
    situation.modifieEtat(FINI);
    synchroniseStoreEtModeleSituation(situation, store);
    expect(store.state.etat).to.eql(FINI);
  });
});
