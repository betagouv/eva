import { mount } from '@vue/test-utils';

import Vuex from 'vuex';
import BoiteUtilisateur from 'commun/vues/boite_utilisateur.vue';

describe('La boite utilisateur', function () {
  let wrapper;
  let store;

  beforeEach(function () {
    const depotRessources = new class {
      iconeDeconnexion () {
        return { src: '' };
      }
    }();
    store = new Vuex.Store({
      state: { estConnecte: true, nom: '', situations: [1, 2], situationsFaites: [1] }
    });
    wrapper = mount(BoiteUtilisateur, {
      global: {
        plugins: [store],
        stubs: { teleport: true },
        mocks: {
          $depotRessources: depotRessources,
          $traduction: (cle) => cle
        }
      }
    });
  });

  it('affiche le bouton de déconnexion', function () {
    expect(wrapper.find('.deconnexion').exists()).toBe(true);
  });

  it("n'affiche pas la modale de confirmation par défaut", function () {
    expect(wrapper.find('.confirmation-deconnexion').exists()).toBe(false);
  });

  it('affiche une modale de confirmation de déconnexion', async function () {
    await wrapper.find('.deconnexion').trigger('click');
    const modale = wrapper.find('.overlay.modale.confirmation-deconnexion');
    expect(modale.exists()).toBe(true);
    expect(modale.find('h2').html()).toContain('abandon.confirmation');
    expect(wrapper.find('.boite-utilisateur').exists()).toBe(true);
  });

  it("permet d'annuler la demande de déconnexion", async function () {
    await wrapper.find('.deconnexion').trigger('click');
    await wrapper.find('.annulation-deconnexion').trigger('click');
    expect(wrapper.find('.confirmation-deconnexion').exists()).toBe(false);
  });

  it('permet de se déconnecter', async function () {
    store.dispatch = jest.fn();
    await wrapper.find('.deconnexion').trigger('click');
    await wrapper.find('.confirme-bouton').trigger('click');
    expect(store.dispatch).toHaveBeenCalledWith('deconnecte');
    expect(wrapper.find('.confirmation-deconnexion').exists()).toBe(false);
  });

  it("la boîte est cachée lorsque l'évalué·e est déconnecté·e", async function () {
    store.state.estConnecte = false;
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.boite-utilisateur').exists()).toBe(false);
  });

  it("affiche la progression de l'évalué·e", function () {
    expect(wrapper.find('.progression-utilisateur').text()).toBe('1/2');
  });

  it('renvoit la progression en pourcentage', function () {
    expect(wrapper.vm.pourcentProgression).toBe('50%');
  });
});
