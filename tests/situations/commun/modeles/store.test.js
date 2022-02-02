import { creeStore, synchroniseStoreEtModeleSituation } from 'commun/modeles/store';
import Situation, {
  CHARGEMENT,
  FINI,
  DEMARRE,
  ENTRAINEMENT_DEMARRE
} from 'commun/modeles/situation';

describe('Le store en commun pour les situations', function () {
  it("initialise l'état a CHARGEMENT", function () {
    const store = creeStore();
    expect(store.state.etat).toEqual(CHARGEMENT);
  });

  it("permet de changer l'état", function () {
    const store = creeStore();
    store.commit('modifieEtat', FINI);
    expect(store.state.etat).toEqual(FINI);
  });

  it("permet de synchroniser l'état du modèle situation avec le store", function () {
    const store = creeStore();
    const situation = new Situation();
    synchroniseStoreEtModeleSituation(situation, store);
    situation.modifieEtat(FINI);
    expect(store.state.etat).toEqual(FINI);
  });

  it('permet de synchroniser le store avec le modèle situation', function () {
    const store = creeStore();
    const situation = new Situation();
    synchroniseStoreEtModeleSituation(situation, store);
    store.commit('modifieEtat', FINI);
    expect(situation.etat()).toEqual(FINI);
  });

  it("synchronise seulement les changements d'état du store avec le modèle situation", function () {
    const store = creeStore();
    const situation = new Situation();
    synchroniseStoreEtModeleSituation(situation, store);
    store.commit('activeAide');
    expect(situation.etat()).toEqual(CHARGEMENT);
  });

  it("synchronise l'état initial du modèle situation", function () {
    const store = creeStore();
    const situation = new Situation();
    situation.modifieEtat(FINI);
    synchroniseStoreEtModeleSituation(situation, store);
    expect(store.state.etat).toEqual(FINI);
  });

  it("permet de synchroniser l'aide entre le modèle situation et le store", function () {
    const store = creeStore();
    const situation = new Situation();
    synchroniseStoreEtModeleSituation(situation, store);
    situation.activeAide();
    expect(store.state.aide).toBe(true);
  });

  it("permet de synchroniser l'aide entre le store et le modèle situation", function () {
    const store = creeStore();
    const situation = new Situation();
    synchroniseStoreEtModeleSituation(situation, store);
    store.commit('activeAide');
    expect(situation.aideActivee).toBe(true);
  });

  it("active l'aide", function () {
    const store = creeStore();
    expect(store.state.aide).toBe(false);
    store.commit('activeAide');
    expect(store.state.aide).toBe(true);
  });

  describe('#acteEnCours', function () {
    let store;

    beforeEach(function () {
      store = creeStore();
    });

    it("Quand l'acte n'est pas demarré", function () {
      expect(store.getters.acteEnCours).toBe(false);
    });

    it("Quand l'acte principal est demarré", function () {
      store.state.etat = DEMARRE;
      expect(store.getters.acteEnCours).toBe(true);
    });

    it("Quand l'acte d'entrainement est demarré", function () {
      store.state.etat = ENTRAINEMENT_DEMARRE;
      expect(store.getters.acteEnCours).toBe(true);
    });
  });
});
