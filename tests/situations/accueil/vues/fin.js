import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Fin from 'accueil/vues/fin';
import { traduction } from 'commun/infra/internationalisation';

describe('La vue de fin', function () {
  let wrapper;
  let store;
  let depotRessources;
  let localVue;

  beforeEach(function () {
    depotRessources = new class {
      comprehensionConsigne () {
        return { src: '' };
      }
    }();
    store = new Vuex.Store({
      state: {
        competencesFortes: []
      },
      actions: {
        deconnecte () {}
      }
    });
    localVue = createLocalVue();
    localVue.prototype.$depotRessources = depotRessources;
    localVue.prototype.$traduction = traduction;
  });

  it("sait s'afficher", function () {
    store.state.competencesFortes = ['rapidite', 'comprehension_consigne'];
    wrapper = mount(Fin, { store, localVue });

    expect(wrapper.find('h2').text()).to.eql('accueil.fin.titre');
    expect(wrapper.find('button').text()).to.eql('accueil.fin.bouton');
  });

  it("se déconnecte a l'appui sur le bouton", function () {
    wrapper = mount(Fin, { store, localVue });

    let deconnecte = 0;
    store.dispatch = (nom) => {
      deconnecte++;
    };

    wrapper.find('button').trigger('click');
    expect(deconnecte).to.equal(1);
  });

  it('récupère les compétences fortes', function () {
    store.state.competencesFortes = [{
      id: 'rapidite',
      nom: "vitesse d'execution",
      description: 'description rapidite'
    }, {
      id: 'comprehension_consigne',
      nom: 'comprehension de la consigne',
      description: 'description comprehentsion consigne'
    }];
    wrapper = mount(Fin, { store, localVue });

    expect(wrapper.findAll('.message-competences-fortes').length).to.equal(1);
    expect(wrapper.find('.message-competences-fortes').text()).to.eql('accueil.fin.competences');
    expect(wrapper.find('.competences-fortes-nom').text()).to.eql("vitesse d'execution");
    expect(wrapper.find('.competences-fortes-description').text()).to.contain('description rapidite');
  });

  it("n'afiche pas de message de détection de compétences fortes si l'évalué n'en a pas", function () {
    store.state.competences = [];
    wrapper = mount(Fin, { store, localVue });

    expect(wrapper.findAll('.competences-fortes-conteneur').length).to.equal(0);
  });
});
