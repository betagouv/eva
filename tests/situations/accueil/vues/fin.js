import { mount } from '@vue/test-utils';
import Vuex from 'vuex';
import Fin from 'accueil/vues/fin';

describe('La vue de fin', function () {
  let wrapper;
  let store;

  beforeEach(function () {
    store = new Vuex.Store({
      state: {
        competencesFortes: [{ rapidite: 4 }, { comprehension_consigne: 3 }]
      },
      actions: {
        deconnecte () {},
        recupereCompetencesFortes () {}
      }
    });
    wrapper = mount(Fin, { store });
  });

  it("sait s'afficher", function () {
    expect(wrapper.find('h2').text()).to.eql('accueil.fin.titre');
    expect(wrapper.find('button').text()).to.eql('accueil.fin.bouton');
  });

  it("se déconnecte a l'appui sur le bouton", function () {
    let deconnecte = 0;
    store.dispatch = (nom) => {
      deconnecte++;
    };

    wrapper.find('button').trigger('click');
    expect(deconnecte).to.equal(1);
  });

  it('récupère les compétences fortes', function () {
    expect(wrapper.find('li:first-of-type').text()).to.eql('accueil.fin.rapidite');
    expect(wrapper.find('li:last-of-type').text()).to.eql('accueil.fin.comprehension_consigne');
  });
});
