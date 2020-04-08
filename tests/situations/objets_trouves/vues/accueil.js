import { shallowMount, createLocalVue } from '@vue/test-utils';
import { traduction } from 'commun/infra/internationalisation';
import MockDepotRessources from '../aides/mock_depot_ressources_objets_trouves';
import { creeStore } from 'objets_trouves/modeles/store';
import Accueil from 'objets_trouves/vues/accueil';
import IconeApp from 'objets_trouves/vues/icone_app';
import { TRANSITION, DEVERROUILLAGE } from 'objets_trouves/modeles/situation';

describe("La vue de l'accueil", function () {
  let wrapper;
  let localVue;
  let store;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$depotRessources = new MockDepotRessources();
    localVue.prototype.$traduction = traduction;
    store = creeStore();
    wrapper = shallowMount(Accueil, {
      localVue,
      store
    });
  });

  it('affiche le fond', function () {
    expect(wrapper.attributes('style')).to.equal('background-image: url(fond);');
  });

  it('affiche les icones', function () {
    store.commit('configureActe', { apps: { photos: {}, agenda: {} } });
    expect(wrapper.findAll(IconeApp).length).to.eql(2);
    expect(wrapper.findAll('.ecran-verrouille-conteneur').length).to.eql(0);
  });

  it("affiche l'écran de verrouillage si il y a l'app deverrouillage", function () {
    store.commit('configureActe', { apps: { deverrouillage: {}, photos: {}, agenda: {} } });
    expect(wrapper.findAll(IconeApp).length).to.eql(1);
    expect(wrapper.findAll('.ecran-verrouille-conteneur').length).to.eql(1);
  });

  it('affiche la consigne', function () {
    store.commit('configureActe', { apps: { photos: {}, agenda: {} }, consigneEcranAccueil: 'Ma consigne' });
    expect(wrapper.find('.question-barre').text()).to.eql('Ma consigne');
  });

  it("affiche l'appli clické", function (done) {
    store.commit = (mutation, args) => {
      expect(mutation).to.eql('afficheApp');
      expect(args).to.eql('photos');
      done();
    };
    wrapper.vm.afficheApp('photos');
  });

  it("désactive l'application visitée", function () {
    store.commit('configureActe', { apps: { photos: {}, agenda: {} } });
    expect(wrapper.vm.appDesactivee('photos')).to.be(false);
    store.commit('ajouteAppVisitee', 'photos');
    expect(wrapper.vm.appDesactivee('photos')).to.be(true);
  });

  it('affiche la transition de fin une fois les apps terminées', function () {
    store.commit('configureActe', { apps: { photos: {}, agenda: {} }, questionsFin: [{}] });
    store.commit('modifieEtatTelephone', TRANSITION);
    expect(wrapper.findAll('.transition').length).to.eql(1);
  });

  it("affiche les questions de fin lorsque l'on clique sur suivant", function () {
    store.commit('configureActe', { apps: { photos: {} }, questionsFin: [{}] });
    store.commit('ajouteAppVisitee', 'photos');
    store.commit('modifieEtatTelephone', TRANSITION);
    wrapper.find('.bouton-arrondi--petit').trigger('click');
    expect(store.state.etatTelephone).to.eql('questionsFin');
  });

  it("affiche l'écran de dévérrouillage lorsque que l'état de l'app est DEVERROUILLAGE", function () {
    store.commit('modifieEtatTelephone', DEVERROUILLAGE);
    expect(wrapper.findAll('.icones-conteneur--deverrouiller').length).to.equal(1);
  });
});
