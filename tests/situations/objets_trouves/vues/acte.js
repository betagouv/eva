import { shallowMount } from '@vue/test-utils';
import { creeStore } from 'objets_trouves/modeles/store';
import ActeObjetsTrouves from 'objets_trouves/vues/acte';
import AppAccueil from 'objets_trouves/vues/accueil';
import Qcm from 'commun/vues/qcm';

describe("La vue de l'acte d'objets trouvés", function () {
  let wrapper;
  let store;

  beforeEach(function () {
    store = creeStore();
    store.commit('configureActe', { apps: { photos: {}, agenda: {} }, questionsFin: [{}] });
    wrapper = shallowMount(ActeObjetsTrouves, { store });
  });

  it("affiche l'application accueil", function () {
    expect(wrapper.contains(AppAccueil)).to.be(true);
  });

  it('affiche une application', function () {
    store.commit('afficheApp', 'photos');
    expect(wrapper.contains(Qcm)).to.be(true);
  });

  it("repasse sur l'accueil une fois répondu a une question", function () {
    store.commit('afficheApp', 'photos');
    expect(wrapper.contains(Qcm)).to.be(true);
    wrapper.vm.reponseApp();
    expect(wrapper.contains(Qcm)).to.be(false);
    expect(wrapper.contains(AppAccueil)).to.be(true);
  });

  it('affiche les questions de fin une fois toute les apps terminées', function () {
    store.commit('ajouteAppVisitee', 'photos');
    store.commit('ajouteAppVisitee', 'agenda');
    expect(wrapper.vm.afficheQuestionsFin).to.be(true);
    expect(wrapper.contains(Qcm)).to.be(true);
  });

  it("n'affiche pas les questions de fin si elles sont vide", function () {
    store.commit('configureActe', { apps: { agenda: {} }, questionsFin: [] });
    store.commit('ajouteAppVisitee', 'agenda');
    expect(wrapper.vm.afficheQuestionsFin).to.be(false);
  });

  it('défile les différentes questions de fin', function () {
    store.commit('configureActe', { apps: { agenda: {} }, questionsFin: [{ id: 1 }, { id: 2 }] });
    store.commit('ajouteAppVisitee', 'agenda');
    expect(wrapper.vm.questionFin.id).to.eql(1);
    wrapper.vm.reponseQuestionFin();
    expect(wrapper.vm.questionFin.id).to.eql(2);
  });

  it("une fois toutes les questions de fin sont passés, envoi l'événement terminer", function () {
    store.commit('configureActe', { apps: { agenda: {} }, questionsFin: [{ id: 1 }, { id: 2 }] });
    store.commit('ajouteAppVisitee', 'agenda');
    wrapper.vm.reponseQuestionFin();
    expect(wrapper.emitted('terminer')).to.be(undefined);
    wrapper.vm.reponseQuestionFin();
    expect(wrapper.emitted('terminer').length).to.eql(1);
  });
});
