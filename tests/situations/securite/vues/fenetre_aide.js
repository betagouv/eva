import { shallowMount } from '@vue/test-utils';
import FenetreAide from 'securite/vues/fenetre_aide';
import { creeStore } from 'securite/store/store';

describe("La fenêtre d'aide", function () {
  let wrapper;
  let store;

  beforeEach(function () {
    store = creeStore();
    wrapper = shallowMount(FenetreAide, {
      store
    });
  });

  it("est caché lorsque l'aide est désactivé", function () {
    expect(wrapper.vm.etat).to.eql('cachee');
  });

  it("s'affiche lorsque l'aide est activé", function () {
    store.commit('activeAide');
    expect(wrapper.vm.etat).to.be('presentation');
  });

  it('au click sur le bouton, la présentation se transforme en indicateur', function () {
    store.commit('activeAide');
    wrapper.find('button').trigger('click');
    expect(wrapper.vm.etat).to.be('activee');
    expect(wrapper.find('div').classes('aide-activee')).to.be(true);
  });
});
