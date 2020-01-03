import { shallowMount, createLocalVue } from '@vue/test-utils';
import Situation from 'securite/vues/situation.vue';
import ActeSecurite from 'securite/vues/acte';
import { creeStore, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI } from 'securite/modeles/store';

describe('La vue de la situation Sécurité', function () {
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
    store = creeStore();
    wrapper = shallowMount(Situation, {
      store,
      localVue,
      propsData: {
        composantActe: ActeSecurite,
        configurationNormale: { zones: [] },
        configurationEntrainement: { zones: [] }
      }
    });
  });

  it("en mode entrainement, il rend le fond d'entrainement", function () {
    store.commit('modifieEtat', ENTRAINEMENT_DEMARRE);
    expect(wrapper.vm.acte.fondSituation).to.eql('fond-situation-entrainement');
  });

  it('en mode normal, il rend le fond normal', function () {
    store.commit('modifieEtat', DEMARRE);
    expect(wrapper.vm.acte.fondSituation).to.eql('fond-situation');
  });

  it("rend l'acte", function () {
    expect(wrapper.contains(ActeSecurite)).to.be(true);
  });

  it("charge les zones d'entrainement au chargement", function () {
    expect(store.state.zones.length).to.eql(0);
  });

  it('charge les autres zones de la situation une fois démarré', function () {
    wrapper.setProps({ configurationNormale: { zones: [1, 2] } });
    expect(store.state.zones.length).to.eql(0);
    store.commit('modifieEtat', DEMARRE);
    expect(store.state.zones.length).to.eql(2);
  });

  it("change l'état de la situation en ENTRAINEMENT_FINI une fois l'acte terminé", function () {
    store.commit('modifieEtat', ENTRAINEMENT_DEMARRE);
    wrapper.vm.changeEtatSituation();
    expect(store.state.etat).to.eql(ENTRAINEMENT_FINI);
  });

  it("change l'état de la situation en FINI une fois l'acte terminé", function () {
    store.commit('modifieEtat', DEMARRE);
    wrapper.vm.changeEtatSituation();
    expect(store.state.etat).to.eql(FINI);
  });
});
