import { shallowMount, createLocalVue } from '@vue/test-utils';
import Situation from 'securite/vues/situation.vue';
import SceneSecurite from 'securite/vues/scene';
import { creeStore, ENTRAINEMENT_DEMARRE, DEMARRE } from 'securite/store/store';

describe('La vue de la situation Sécurité', function () {
  let wrapper;
  let store;
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.depotRessources = new class {
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
      localVue
    });
  });

  it("en mode entrainement, il rend le fond d'entrainement", function () {
    store.commit('modifieEtat', ENTRAINEMENT_DEMARRE);
    expect(wrapper.vm.fondSituation).to.eql('fond-situation-entrainement');
  });

  it('en mode normal, il rend le fond normal', function () {
    store.commit('modifieEtat', DEMARRE);
    expect(wrapper.vm.fondSituation).to.eql('fond-situation');
  });

  it('rend la scene', function () {
    expect(wrapper.contains(SceneSecurite)).to.be(true);
  });
});
