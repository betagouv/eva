import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import BoutonDeconnexion from 'accueil/vues/bouton_deconnexion';
import { traduction } from 'commun/infra/internationalisation';

describe('Les boutons de déconnexion', function () {
  let wrapper;
  let store;
  let depotRessources;
  let localVue;

  beforeEach(function () {
    depotRessources = new (class {
      comprehensionConsigne () {
        return { src: '' };
      }

      avatarFin () {
        return { src: '' };
      }

      avatarAvis () {
        return { src: '' };
      }

      avatarDeconnexion () {
        return { src: '' };
      }

      boutonAvis () {
        return { src: '' };
      }
    })();
    store = new Vuex.Store({
      actions: {
        deconnecte () {}
      }
    });
    localVue = createLocalVue();
    localVue.prototype.$depotRessources = depotRessources;
    localVue.prototype.$traduction = traduction;
  });

  it("sait s'afficher en mode standard", function () {
    wrapper = mount(BoutonDeconnexion, { store, localVue });

    expect(wrapper.find('.bouton-deconnexion').text()).toEqual('deconnexion.titre');
  });

  describe('en mode deconnexion directe', function () {
    let deconnecte = false;

    beforeEach(function () {
      store = new Vuex.Store({
        actions: {
          deconnecte () { deconnecte = true; }
        }
      });

      wrapper = mount(BoutonDeconnexion, { store, localVue, propsData: { deconnexionDirecte: true } });
    });

    it("sait s'afficher", function () {
      expect(wrapper.find('.actions-fin').findAll('a').length).toBe(2);
      expect(wrapper.find('.bouton-deconnexion').text()).toEqual('deconnexion.titre');
    });

    it('le bouton deconnexion deconnecte directement', function (done) {
      wrapper.find('.bouton-deconnexion').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(deconnecte).toBe(true);
        done();
      });
    });

    it('le bouton "je donne mon avis" deconnecte directement', function (done) {
      const jeDonneMonAvis = wrapper.find('.actions-fin').find('a');
      expect(jeDonneMonAvis.find('img').exists()).toBe(true);
      jeDonneMonAvis.trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(deconnecte).toBe(true);
        done();
      });
    });
  });
});
