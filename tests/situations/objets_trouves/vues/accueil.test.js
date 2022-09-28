import { shallowMount } from '@vue/test-utils';
import { traduction } from 'commun/infra/internationalisation';
import MockDepotRessources from '../aides/mock_depot_ressources_objets_trouves';
import { creeStore } from 'objets_trouves/modeles/store';
import Accueil from 'objets_trouves/vues/accueil';
import IconeApp from 'objets_trouves/vues/icone_app';
import { TRANSITION, ACCUEIL_VERROUILLE } from 'objets_trouves/modeles/situation';

describe("La vue de l'accueil", function () {
  let wrapper;
  let store;

  beforeEach(function () {
    store = creeStore();
    wrapper = shallowMount(Accueil, {
      global: {
        plugins: [store],
        mocks: {
          $depotRessources: new MockDepotRessources(),
          $traduction: traduction
        }
      }
    });
  });

  it('affiche le fond', function () {
    expect(wrapper.attributes('style')).toBe('background-image: url(fond);');
  });

  describe("permet d'ouvrir une app", function () {
    beforeEach(function () {
      store.commit('configureActe', { apps: { photos: {}, agenda: {} } });
    });

    it('affiche les icones', function () {
      expect(wrapper.findAllComponents(IconeApp).length).toEqual(2);
      expect(wrapper.findAll('.ecran-verrouille-conteneur').length).toEqual(0);
    });

    it("ouvre une app quand on clique sur l'icone", function () {
      const premiereApp = wrapper.findComponent(IconeApp);
      premiereApp.vm.$emit('ouvrirApp');
      expect(store.state.appActive).toEqual('photos');
    });
  });

  it("affiche l'écran de dévérrouillage lorsque que l'état de l'app est ACCUEIL_VERROUILLE", function (done) {
    store.commit('modifieEtatTelephone', ACCUEIL_VERROUILLE);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAllComponents(IconeApp).length).toEqual(1);
      expect(wrapper.findAll('.ecran-verrouille-conteneur').length).toEqual(1);
      expect(wrapper.findAll('.icones-conteneur--deverrouiller').length).toBe(1);
      done();
    });
  });

  it('affiche la consigne', function (done) {
    store.commit('configureActe', { apps: { photos: {}, agenda: {} }, consignesEcranAccueil: ['Ma consigne'] });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.question-barre').text()).toEqual('Ma consigne');
      done();
    });
  });

  it("affiche l'appli clické", function (done) {
    store.commit = (mutation, args) => {
      expect(mutation).toEqual('afficheApp');
      expect(args).toEqual('photos');
      done();
    };
    wrapper.vm.afficheApp('photos');
  });

  it("désactive l'application visitée", function () {
    store.commit('configureActe', { apps: { photos: {}, agenda: {} } });
    expect(wrapper.vm.appDesactivee('photos')).toBe(false);
    store.commit('ajouteAppVisitee', 'photos');
    expect(wrapper.vm.appDesactivee('photos')).toBe(true);
  });

  it('affiche la transition de fin une fois les apps terminées', function (done) {
    store.commit('configureActe', { apps: { photos: {}, agenda: {} }, questionsFin: [{}] });
    store.commit('modifieEtatTelephone', TRANSITION);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.transition').length).toEqual(1);
      done();
    });
  });

  it("affiche les questions de fin lorsque l'on clique sur suivant", function (done) {
    store.commit('configureActe', { apps: { photos: {} }, questionsFin: [{}] });
    store.commit('ajouteAppVisitee', 'photos');
    store.commit('modifieEtatTelephone', TRANSITION);
    wrapper.vm.$nextTick(() => {
      wrapper.find('.bouton-arrondi--petit').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(store.state.etatTelephone).toEqual('questionsFin');
        done();
      });
    });
  });
});
