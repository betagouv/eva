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

  it('signale la demande de déconnexion au clic', async function () {
    await wrapper.find('.deconnexion').trigger('click');
    expect(wrapper.emitted('demande-deconnexion')).toHaveLength(1);
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
