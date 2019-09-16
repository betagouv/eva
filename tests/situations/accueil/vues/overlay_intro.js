import { shallowMount, createLocalVue } from '@vue/test-utils';
import OverlayIntro from 'accueil/vues/overlay_intro';

describe("La vue d'introduction", function () {
  let wrapper;

  beforeEach(function () {
    const depotRessources = new class {
      casque () {
        return { src: '' };
      }
    }();
    const localVue = createLocalVue();
    localVue.prototype.depotRessources = depotRessources;
    wrapper = shallowMount(OverlayIntro, { localVue });
  });

  it('affiche la vue contexte au clic et emet "passe" a la fin', function () {
    expect(wrapper.vm.ecran).to.eql('consigne');
    wrapper.find('button').trigger('click');
    expect(wrapper.vm.ecran).to.eql('contexte');
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted('passe').length).to.eql(1);
  });
});
