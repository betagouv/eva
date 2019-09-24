import { shallowMount, createLocalVue } from '@vue/test-utils';
import Situation from 'securite/vues/situation.vue';

describe('La vue de la situation Sécurité', function () {
  it('affiche le fond de situation', function () {
    const localVue = createLocalVue();
    localVue.prototype.depotRessources = new class {
      fondSituation () {
        return { src: 'fond-situation' };
      }
    }();
    const wrapper = shallowMount(Situation, {
      localVue
    });
    expect(wrapper.vm.fondSituation).to.eql('url(fond-situation)');
  });
});
