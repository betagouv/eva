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
    })();
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

    expect(wrapper.find('h2').text()).to.eql('accueil.fin.bravo.titre');
    expect(wrapper.find('button').text()).to.eql('accueil.fin.bravo.bouton');
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

    wrapper.find('button').trigger('click');

    expect(wrapper.findAll('.message-competences-fortes').length).to.equal(1);
    expect(wrapper.find('.message-competences-fortes').text()).to.eql('accueil.fin.resultat.competences');
    expect(wrapper.find('.competences-fortes-nom').text()).to.eql("vitesse d'execution");
    expect(wrapper.find('.competences-fortes-description').text()).to.contain('description rapidite');
  });

  it("n'affiche pas de bouton suivant", function () {
    store.state.competences = [];
    wrapper = mount(Fin, { store, localVue });

    expect(wrapper.findAll('.contenu').length).to.equal(0);
    expect(wrapper.findAll('.button').length).to.equal(0);
  });

  it('affiche le module de collecte des avis si compétences ainsi que le module de déconnexion', function () {
    store.state.competencesFortes = ['rapidite', 'comprehension_consigne'];
    wrapper = mount(Fin, { store, localVue });
    wrapper.find('button').trigger('click');

    expect(wrapper.findAll('.mon-avis').length).to.equal(1);

    wrapper.find('.actions-avis .bouton-arrondi-orange').trigger('click');
    expect(wrapper.find('.actions-fin .bouton-deconnexion').isVisible()).to.be(true);

    wrapper.find('.actions-fin .bouton-deconnexion').trigger('click');
    expect(wrapper.find('.actions-fin .confirmation-deconnexion').isVisible()).to.be(true);
  });
});
