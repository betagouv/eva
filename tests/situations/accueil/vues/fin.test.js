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
        competencesFortes: [],
        evaluationTerminee: false
      },
      actions: {
        deconnecte () {}
      }
    });
    localVue = createLocalVue();
    localVue.prototype.$depotRessources = depotRessources;
    localVue.prototype.$traduction = traduction;
  });

  it("sait s'afficher", function (done) {
    store.state.nom = 'Alexandre Legrand';
    store.dispatch = (evenement) => {
      expect(evenement).toEqual('termineEvaluation');
      store.state.competencesFortes = [rapidite, comprehensionConsigne];
      store.state.evaluationTerminee = true;
      return Promise.resolve();
    };
    wrapper = mount(Fin, { store, localVue });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('h2').text()).toEqual('accueil.fin.bravo.titre{"nom":"Alexandre Legrand"}');
      expect(wrapper.find('button').text()).toEqual('accueil.fin.bravo.bouton');
      done();
    });
  });

  it('récupère les compétences fortes', function (done) {
    store.dispatch = (evenement) => {
      store.state.competencesFortes = [rapidite, comprehensionConsigne];
      store.state.evaluationTerminee = true;
      return Promise.resolve();
    };
    wrapper = mount(Fin, { store, localVue });

    wrapper.vm.$nextTick(() => {
      wrapper.find('button').trigger('click');

      wrapper.vm.$nextTick(() => {
        expect(wrapper.findAll('.message-competences-fortes').length).toBe(1);
        expect(wrapper.find('.message-competences-fortes').text()).toEqual('accueil.fin.resultat.competences');
        expect(wrapper.find('.competences-fortes-nom').text()).toEqual("vitesse d'execution");
        expect(wrapper.find('.competences-fortes-description').text()).toContain('description rapidite');
        done();
      });
    });
  });

  it("affiche le bouton de deconnexion s'il n'y a pas de compétences fortes", function (done) {
    store.dispatch = (evenement) => {
      store.state.competencesFortes = [];
      store.state.evaluationTerminee = true;
      return Promise.resolve();
    };
    wrapper = mount(Fin, { store, localVue });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.contenu').length).toBe(0);
      expect(wrapper.findAll('button').length).toBe(0);
      expect(wrapper.findAll('.bouton-deconnexion').length).toBe(1);
      done();
    });
  });

  it("Attend que l'on sache s'il y a des compétences fortes avant d'afficher les boutons", function () {
    store.dispatch = (evenement) => {
      return Promise.resolve();
    };
    wrapper = mount(Fin, { store, localVue });

    expect(wrapper.findAll('.contenu').length).toBe(0);
    expect(wrapper.findAll('button').length).toBe(0);
    expect(wrapper.findAll('.bouton-deconnexion').length).toBe(0);
  });

  it('affiche le module de collecte des avis si compétences ainsi que le module de déconnexion', function (done) {
    store.dispatch = (evenement) => {
      store.state.competencesFortes = [rapidite, comprehensionConsigne];
      store.state.evaluationTerminee = true;
      return Promise.resolve();
    };
    wrapper = mount(Fin, { store, localVue });
    wrapper.vm.$nextTick(() => {
      wrapper.find('button').trigger('click');

      wrapper.vm.$nextTick(() => {
        var boutonDeconnexion = wrapper.find('.actions-fin .bouton-deconnexion');
        expect(boutonDeconnexion.isVisible()).toBe(true);
        boutonDeconnexion.trigger('click');

        wrapper.vm.$nextTick(() => {
          expect(wrapper.findAll('.mon-avis').length).toBe(1);
          wrapper.find('.actions-avis .bouton-arrondi-orange').trigger('click');

          wrapper.vm.$nextTick(() => {
            expect(wrapper.find('.actions-fin .confirmation-deconnexion').isVisible()).toBe(true);
            done();
          });
        });
      });
    });
  });
});
