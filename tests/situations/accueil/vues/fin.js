import { mount } from '@vue/test-utils';
import Vuex from 'vuex';
import Fin from 'accueil/vues/fin';

describe('La vue de fin', function () {
  let wrapper;
  let store;

  beforeEach(function () {
    store = new Vuex.Store({
      actions: {
        deconnecte () {}
      }
    });
    wrapper = mount(Fin, { store });
  });

  it("sait s'afficher", function () {
    expect(wrapper.find('h2').text()).to.eql('accueil.fin.titre');
    expect(wrapper.find('button').text()).to.eql('accueil.fin.bouton');
  });

  it("se déconnecte a l'appui sur le bouton", function (done) {
    store.dispatch = () => {
      done();
      return Promise.resolve();
    };

    wrapper.find('button').trigger('click');
  });
});
