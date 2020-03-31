import { shallowMount } from '@vue/test-utils';
import { creeStore } from 'objets_trouves/modeles/store';
import ActeObjetsTrouves from 'objets_trouves/vues/acte';
import AppAccueil from 'objets_trouves/vues/accueil';
import QuestionsApp from 'objets_trouves/vues/questions_app';
describe("La vue de l'acte d'objets trouvés", function () {
  let wrapper;
  let store;

  beforeEach(function () {
    store = creeStore();
    store.commit('configureActe', { apps: { photos: [{}], agenda: [{}] }, questionsFin: [{}] });
    wrapper = shallowMount(ActeObjetsTrouves, { store });
  });

  it("affiche l'application accueil", function () {
    expect(wrapper.contains(AppAccueil)).to.be(true);
  });

  it('affiche une application', function () {
    store.commit('afficheApp', 'photos');
    expect(wrapper.contains(QuestionsApp)).to.be(true);
  });

  it("repasse sur l'accueil une fois répondu a toute les questions d'une app", function () {
    store.commit('afficheApp', 'photos');
    expect(wrapper.contains(QuestionsApp)).to.be(true);
    wrapper.vm.finApp();
    expect(wrapper.contains(QuestionsApp)).to.be(false);
    expect(wrapper.contains(AppAccueil)).to.be(true);
  });

  it('affiche les questions de fin une fois la transition de fin terminée', function () {
    store.commit('ajouteAppVisitee', 'photos');
    store.commit('ajouteAppVisitee', 'agenda');
    store.commit('termineTransitionFin');
    expect(wrapper.vm.afficheQuestionsFin).to.be(true);
    expect(wrapper.contains(QuestionsApp)).to.be(true);
  });

  it("n'affiche pas les questions de fin si elles sont vide", function () {
    store.commit('configureActe', { apps: { agenda: [{}] } });
    store.commit('ajouteAppVisitee', 'agenda');
    expect(wrapper.vm.afficheQuestionsFin).to.be(false);
  });

  it("une fois toutes les questions de fin sont passés, envoi l'événement terminer", function () {
    expect(wrapper.emitted('terminer')).to.be(undefined);
    wrapper.vm.finDeLaFin();
    expect(wrapper.emitted('terminer').length).to.eql(1);
  });

  it("lorsqu'il n'y a pas de questions fin et que l'on a visité toute les applications on envoit l'événement terminé", function () {
    store.commit('configureActe', { apps: { agenda: [{}] } });
    expect(wrapper.emitted('terminer')).to.be(undefined);
    store.commit('ajouteAppVisitee', 'agenda');
    expect(wrapper.emitted('terminer').length).to.eql(1);
  });
});
