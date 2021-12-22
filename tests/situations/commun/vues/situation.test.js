import { shallowMount, createLocalVue } from '@vue/test-utils';
import Situation from 'commun/vues/situation';
import ActeSecurite from 'securite/vues/acte';
import { creeStore } from 'commun/modeles/store';
import { ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI } from 'commun/modeles/situation';

describe('commun/vues/situation', function () {
  let wrapper;
  let store;
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$depotRessources = new class {
      fondSituation () {
        return { src: 'fond-situation' };
      }

      fondSituationEntrainement () {
        return { src: 'fond-situation-entrainement' };
      }
    }();
    store = creeStore({
      state: {
        zones: []
      },
      mutations: {
        configureActe (state, { zones }) {
          state.zones = zones;
        }
      }
    });
  });

  function vueSituation (configurationNormale, configurationEntrainement) {
    return shallowMount(Situation, {
      store,
      localVue,
      propsData: {
        composantActe: ActeSecurite,
        configurationNormale: configurationNormale,
        configurationEntrainement: configurationEntrainement
      }
    });
  }

  describe('à la création de la vue', function () {
    it("rend l'acte", function () {
      wrapper = vueSituation({ zones: [] }, { zones: [] });
      expect(wrapper.findComponent(ActeSecurite).exists()).toBe(true);
    });

    it("charge la configuration entrainement s'il y en a un", function () {
      wrapper = vueSituation({ zones: [] }, { zones: [1] });
      expect(store.state.zones).toEqual([1]);
      expect(wrapper.vm.acte.fondSituation).toEqual('fond-situation-entrainement');
    });

    it("charge la configuration normale s'il n'y a pas d'entrainement", function () {
      wrapper = vueSituation({ zones: [1] }, undefined);
      expect(store.state.zones).toEqual([1]);
      expect(wrapper.vm.acte.fondSituation).toEqual('fond-situation');
    });
  });

  describe("changement d'état", function () {
    beforeEach(function () {
      wrapper = vueSituation({ zones: [] }, { zones: [] });
    });

    it("pour l'état DEMARRE, rend le fond normal", function () {
      store.commit('modifieEtat', DEMARRE);
      expect(wrapper.vm.acte.fondSituation).toEqual('fond-situation');
    });

    it("pour l'état FINI, rend le fond normal", function () {
      store.commit('modifieEtat', FINI);
      expect(wrapper.vm.acte.fondSituation).toEqual('fond-situation');
    });

    it("pour l'état DEMARRE, charge la configuration normale", function (done) {
      wrapper.setProps({ configurationNormale: { zones: [1, 2] } });
      expect(store.state.zones.length).toEqual(0);
      store.commit('modifieEtat', DEMARRE);
      wrapper.vm.$nextTick(() => {
        expect(store.state.zones.length).toEqual(2);
        done();
      });
    });
  });

  describe("fin d'un acte", function () {
    beforeEach(function () {
      wrapper = vueSituation({ zones: [] }, { zones: [] });
    });

    it("change l'état en ENTRAINEMENT_FINI", function () {
      store.commit('modifieEtat', ENTRAINEMENT_DEMARRE);
      wrapper.vm.termineActe();
      expect(store.state.etat).toEqual(ENTRAINEMENT_FINI);
    });

    it("change l'état en FINI", function () {
      store.commit('modifieEtat', DEMARRE);
      wrapper.vm.termineActe();
      expect(store.state.etat).toEqual(FINI);
    });
  });
});
