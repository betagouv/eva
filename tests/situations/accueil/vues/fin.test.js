import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Fin from 'accueil/vues/fin';
import { traduction } from 'commun/infra/internationalisation';

describe('La vue de fin', function () {
  let wrapper;
  let store;
  let depotRessources;
  let localVue;
  const rapidite = {
    nom_technique: 'rapidite',
    nom: "vitesse d'execution",
    description: 'description rapidite'
  };
  const comprehensionConsigne = {
    nom_technique: 'comprehension_consigne',
    nom: 'comprehension de la consigne',
    description: 'description comprehentsion consigne'
  };

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
      state: {
        nom: 'Alexandre Legrand',
        competencesFortes: [rapidite, comprehensionConsigne],
        evaluationTerminee: true
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
    wrapper = mount(Fin, { store, localVue });
    expect(wrapper.find('h2').text()).toEqual('accueil.fin.bravo.titre{"nom":"Alexandre Legrand"}');
    expect(wrapper.find('button').text()).toEqual('accueil.fin.bravo.bouton');
  });

  it("affiche le bouton de deconnexion s'il n'y a pas de compétences fortes", function () {
    store.state.competencesFortes = [];
    store.state.evaluationTerminee = true;
    wrapper = mount(Fin, { store, localVue });
    expect(wrapper.findAll('.contenu').length).toBe(0);
    expect(wrapper.findAll('button').length).toBe(0);
    expect(wrapper.findAll('.bouton-deconnexion').length).toBe(1);
  });

  it("Attend que l'on sache s'il y a des compétences fortes avant d'afficher les boutons", function () {
    store.state.evaluationTerminee = false;
    wrapper = mount(Fin, { store, localVue });

    expect(wrapper.findAll('.contenu').length).toBe(0);
    expect(wrapper.findAll('button').length).toBe(0);
    expect(wrapper.findAll('.bouton-deconnexion').length).toBe(0);
  });


  it('affiche les compétences fortes', function (done) {
    wrapper = mount(Fin, { store, localVue });

    wrapper.find('button').trigger('click');

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.message-competences-fortes').length).toBe(1);
      expect(wrapper.find('.message-competences-fortes').text()).toEqual('accueil.fin.resultat.competences');
      expect(wrapper.find('.competences-fortes-nom').text()).toEqual("vitesse d'execution");
      expect(wrapper.find('.competences-fortes-description').text()).toContain('description rapidite');
      done();
    });
  });

  it('affiche le module de collecte des avis si compétences ainsi que le module de déconnexion', function (done) {
    wrapper = mount(Fin, { store, localVue });
    wrapper.find('button').trigger('click');
    wrapper.vm.$nextTick(() => {
      var boutonDeconnexion = wrapper.find('.actions-fin .bouton-deconnexion');
      expect(boutonDeconnexion.isVisible()).toBe(true);
      boutonDeconnexion.trigger('click');

      wrapper.vm.$nextTick(() => {
        expect(wrapper.findAll('.mon-avis').length).toBe(1);
        wrapper.find('.actions-avis .bouton-arrondi--orange').trigger('click');

        wrapper.vm.$nextTick(() => {
          expect(wrapper.find('.actions-fin .confirmation-deconnexion').isVisible()).toBe(true);
          done();
        });
      });
    });
  });
});
