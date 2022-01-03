import { mount, createLocalVue } from '@vue/test-utils';

import Vuex from 'vuex';
import BoiteUtilisateur from 'commun/vues/boite_utilisateur.vue';

describe('La boite utilisateur', function () {
  let wrapper;
  let store;

  beforeEach(function () {
    const localVue = createLocalVue();
    localVue.prototype.$traduction = () => {};
    localVue.prototype.$depotRessources = new class {
      iconeDeconnexion () {
        return { src: '' };
      }
    }();
    store = new Vuex.Store({
      state: { estConnecte: true, nom: '', situations: [1, 2], situationsFaites: [1] }
    });
    wrapper = mount(BoiteUtilisateur, { store, localVue });
  });

  it('affiche le bouton de déconnexion', function () {
    expect(wrapper.exists('.deconnexion')).toBe(true);
  });

  it('affiche une confirmation de déconnexion', function () {
    expect(wrapper.vm.confirmationDeconnexion).toBe(false);
    wrapper.find('.deconnexion').trigger('click');
    expect(wrapper.vm.confirmationDeconnexion).toBe(true);
  });

  it("permet d'annuler la demande de déconnexion", function (done) {
    wrapper.find('.deconnexion').trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.confirmationDeconnexion).toBe(true);
      wrapper.find('a').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.confirmationDeconnexion).toBe(false);
        done();
      });
    });
  });

  it('permet de se déconnecter', function (done) {
    store.dispatch = (nom) => {
      expect(nom).toEqual('deconnecte');
      expect(wrapper.vm.confirmationDeconnexion).toBe(false);
      done();
    };
    wrapper.find('.deconnexion').trigger('click');
    wrapper.vm.$nextTick(() => {
      wrapper.find('button').trigger('click');
    });
  });

  it("la boîte est cachée lorsque l'évalué·e est déconnecté·e", function (done) {
    store.state.estConnecte = false;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.boite-utilisateur').exists()).toBe(false);
      done();
    });
  });

  it("affiche la progression de l'évalué·e", function () {
    expect(wrapper.find('.progression-utilisateur').text()).toBe('1/2');
  });

  it('renvoit la progression en pourcentage', function () {
    expect(wrapper.vm.pourcentProgression).toBe('50%');
  });
});
