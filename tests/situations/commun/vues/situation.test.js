import { markRaw } from 'vue';
import { mount } from '@vue/test-utils';
import { traduction } from 'commun/infra/internationalisation';
import Situation from 'commun/vues/situation';
import { creeStore } from 'commun/modeles/store';
import { ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI } from 'commun/modeles/situation';

describe('commun/vues/situation', function () {
  let wrapper;
  let depotRessources;
  let store;
  let ComposantAct;
  const configurationEntrainement = { config: 'entrainement' };
  const configurationNormale = { config: 'normale' };


  beforeEach(function () {
    ComposantAct = markRaw({
      template: '<h2>une vue act</h2>'
    });
    depotRessources = new class {
      fondSituation () {
        return { src: 'fond-situation' };
      }

      fondSituationEntrainement () {
        return { src: 'fond-situation-entrainement' };
      }
    }();
    store = creeStore({
      mutations: {
        configureActe (state, configuration) {
          state.configuration = configuration;
        }
      }
    });
  });

  function vueSituation (configurationNormale, configurationEntrainement) {
    return mount(Situation, {
      global: {
        plugins: [store],
        mocks: {
          $depotRessources: depotRessources,
          $traduction: traduction
        },
        stubs: {
          ComposantAct
        }
      },
      props: {
        composantActe: ComposantAct,
        configurationNormale: configurationNormale,
        configurationEntrainement: configurationEntrainement
      }
    });
  }

  describe('à la création de la vue', function () {
    it("rend l'acte", function () {
      wrapper = vueSituation({}, {});
      expect(wrapper.findComponent(ComposantAct).exists()).toBe(true);
    });

    it("charge la configuration entrainement s'il y en a un", function () {
      wrapper = vueSituation({}, configurationEntrainement);
      expect(store.state.configuration).toEqual({
        fondSituation: 'fond-situation-entrainement',
        ...configurationEntrainement
      });
    });

    it("charge la configuration normale s'il n'y a pas d'entrainement", function () {
      wrapper = vueSituation(configurationNormale, undefined);
      expect(store.state.configuration).toEqual({
        fondSituation: 'fond-situation',
        ...configurationNormale
      });
    });
  });

  describe("changement d'état", function () {
    beforeEach(function () {
      wrapper = vueSituation(configurationNormale, configurationEntrainement);
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
      expect(store.state.configuration.config).toEqual('entrainement');
      store.commit('modifieEtat', DEMARRE);
      wrapper.vm.$nextTick(() => {
        expect(store.state.configuration.config).toEqual('normale');
        done();
      });
    });
  });

  describe("fin d'un acte", function () {
    beforeEach(function () {
      wrapper = vueSituation(configurationNormale, configurationEntrainement);
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
