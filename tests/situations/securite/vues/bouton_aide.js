import { shallowMount } from '@vue/test-utils';
import BoutonAide from 'securite/vues/bouton_aide';
import { creeStore } from 'securite/store/store';

describe("Le bouton d'aide", function () {
  let wrapper;
  let store;

  beforeEach(function () {
    store = creeStore();
    wrapper = shallowMount(BoutonAide, {
      store
    });
  });

  it("active l'aide au click", function (done) {
    store.commit = (mutation) => {
      expect(mutation).to.eql('activeAide');
      done();
    };
    wrapper.trigger('click');
  });

  it("le bouton est désactivé si l'aide est activé", function () {
    store.commit('activeAide');
    expect(wrapper.attributes('disabled')).to.equal('disabled');
  });
});
