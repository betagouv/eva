import { mount } from '@vue/test-utils';
import Vuex from 'vuex';
import Fin from 'accueil/vues/fin';

describe('La vue de fin', function () {
  let wrapper;
  let store;

  beforeEach(function () {
    store = new Vuex.Store({
      state: {
        competencesFortes: []
      },
      actions: {
        deconnecte () {},
        recupereCompetencesFortes () {}
      }
    });
  });

  it("sait s'afficher", function () {
    wrapper = mount(Fin, { store });
    expect(wrapper.find('h2').text()).to.eql('accueil.fin.titre');
    expect(wrapper.find('button').text()).to.eql('accueil.fin.bouton');
  });

  it("se déconnecte a l'appui sur le bouton", function () {
    wrapper = mount(Fin, { store });
    let deconnecte = 0;
    store.dispatch = (nom) => {
      deconnecte++;
    };

    wrapper.find('button').trigger('click');
    expect(deconnecte).to.equal(1);
  });

  it('récupère les compétences fortes', function () {
    store.state.competencesFortes = [{ rapidite: 4 }, { comprehension_consigne: 3 }];
    wrapper = mount(Fin, { store });

    expect(wrapper.findAll('.competences-fortes-conteneur').length).to.equal(1);
    expect(wrapper.find('li:first-of-type').text()).to.eql('accueil.fin.rapidite');
    expect(wrapper.find('li:last-of-type').text()).to.eql('accueil.fin.comprehension_consigne');
  });

  it("n'afiche pas de message de détection de compétences fortes si l'évalué n'en a pas", function () {
    store.state.competences = [];
    wrapper = mount(Fin, { store });

    expect(wrapper.findAll('.competences-fortes-conteneur').length).to.equal(0);
  });
});
