import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Fin from 'accueil/vues/fin';

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

      pictoCompetences () {
        return { src: '' };
      }
    }();
    store = new Vuex.Store({
      state: {
        competencesFortes: []
      },
      actions: {
        deconnecte () {},
        recupereCompetencesFortes () {}
      }
    });
    localVue = createLocalVue();
    localVue.prototype.depotRessources = depotRessources;
  });

  it("sait s'afficher", function () {
    store.state.competencesFortes = ['rapidite', 'comprehension_consigne'];
    wrapper = mount(Fin, { store, localVue });
    wrapper.vm.competencesFortesRecus = true;

    expect(wrapper.find('h2').text()).to.eql('accueil.fin.titre');
    expect(wrapper.find('button').text()).to.eql('accueil.fin.bouton');
  });

  it("se déconnecte a l'appui sur le bouton", function () {
    wrapper = mount(Fin, { store, localVue });
    wrapper.vm.competencesFortesRecus = true;

    let deconnecte = 0;
    store.dispatch = (nom) => {
      deconnecte++;
    };

    wrapper.find('button').trigger('click');
    expect(deconnecte).to.equal(1);
  });

  it('récupère les compétences fortes', function () {
    store.state.competencesFortes = ['rapidite', 'comprehension_consigne'];
    wrapper = mount(Fin, { store, localVue });
    wrapper.vm.competencesFortesRecus = true;

    expect(wrapper.findAll('.message-competences-fortes').length).to.equal(1);
    expect(wrapper.find('.message-competences-fortes').text()).to.eql('accueil.fin.competences');
    expect(wrapper.find('p:last-of-type').text()).to.eql('accueil.fin.comprehension_consigne');
  });

  it("n'afiche pas de message de détection de compétences fortes si l'évalué n'en a pas", function () {
    store.state.competences = [];
    wrapper = mount(Fin, { store, localVue });
    wrapper.vm.competencesFortesRecus = true;

    expect(wrapper.findAll('.competences-fortes-conteneur').length).to.equal(0);
  });
});
