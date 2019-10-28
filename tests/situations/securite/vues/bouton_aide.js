import { shallowMount, createLocalVue } from '@vue/test-utils';
import BoutonAide from 'securite/vues/bouton_aide';
import { creeStore } from 'securite/modeles/store';
import EvenementActivationAide from 'securite/modeles/evenement_activation_aide';

describe("Le bouton d'aide", function () {
  let wrapper;
  let store;
  let localVue;

  beforeEach(function () {
    store = creeStore();
    localVue = createLocalVue();
    localVue.prototype.$journal = { enregistre () {} };
    wrapper = shallowMount(BoutonAide, {
      store,
      localVue
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

  it("rapporte l'activation de l'aide au journal", function (done) {
    localVue.prototype.$journal.enregistre = (evenement) => {
      expect(evenement).to.be.a(EvenementActivationAide);
      done();
    };
    wrapper.trigger('click');
  });
});
