import { mount } from '@vue/test-utils';

import Vuex from 'vuex';
import BoiteUtilisateur from 'commun/vues/boite_utilisateur.vue';

describe('La boite utilisateur', function () {
  let wrapper;
  let store;

  beforeEach(function () {
    store = new Vuex.Store({
      state: { estConnecte: true, nom: '', situations: [1, 2], situationsFaites: [1] }
    });
    wrapper = mount(BoiteUtilisateur, { store });
  });

  it('affiche le bouton de déconnexion', function () {
    expect(wrapper.exists('.deconnexion')).to.be(true);
  });

  it('permet de se déconnecter', function (done) {
    store.dispatch = (nom) => {
      expect(nom).to.eql('deconnecte');
      done();
    };
    wrapper.find('.deconnexion').trigger('click');
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
