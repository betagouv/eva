import { mount, createLocalVue } from '@vue/test-utils';

import Vuex from 'vuex';
import BoiteUtilisateur from 'commun/vues/boite_utilisateur.vue';

describe('La boite utilisateur', function () {
  let wrapper;
  let store;

  beforeEach(function () {
    const localVue = createLocalVue();
    localVue.prototype.$traduction = () => {};
    store = new Vuex.Store({
      state: { estConnecte: true, nom: '', situations: [1, 2], situationsFaites: [1] }
    });
    wrapper = mount(BoiteUtilisateur, { store, localVue });
  });

  it('affiche le bouton de déconnexion', function () {
    expect(wrapper.exists('.deconnexion')).to.be(true);
  });

  it('affiche une confirmation de déconnexion', function () {
    expect(wrapper.vm.confirmationDeconnexion).to.be(false);
    wrapper.find('.deconnexion').trigger('click');
    expect(wrapper.vm.confirmationDeconnexion).to.be(true);
  });

  it("permet d'annuler la demande de déconnexion", function () {
    wrapper.find('.deconnexion').trigger('click');
    expect(wrapper.vm.confirmationDeconnexion).to.be(true);
    wrapper.find('a').trigger('click');
    expect(wrapper.vm.confirmationDeconnexion).to.be(false);
  });

  it('permet de se déconnecter', function (done) {
    store.dispatch = (nom) => {
      expect(nom).to.eql('deconnecte');
      expect(wrapper.vm.confirmationDeconnexion).to.be(false);
      done();
    };
    wrapper.find('.deconnexion').trigger('click');
    wrapper.find('button').trigger('click');
  });

  it("la boîte est cachée lorsque l'évalué·e est déconnecté·e", function () {
    store.state.estConnecte = false;
    expect(wrapper.isEmpty()).to.be(true);
  });

  it("affiche la progression de l'évalué·e", function () {
    expect(wrapper.find('.progression-utilisateur').text()).to.equal('1/2');
  });

  it('renvoit la progression en pourcentage', function () {
    expect(wrapper.vm.pourcentProgression).to.equal('50%');
  });
});
