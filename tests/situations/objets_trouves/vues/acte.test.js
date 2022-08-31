import { mount } from '@vue/test-utils';
import { creeStore } from 'objets_trouves/modeles/store';
import ActeObjetsTrouves from 'objets_trouves/vues/acte';
import AppAccueil from 'objets_trouves/vues/accueil';
import QuestionsApp from 'objets_trouves/vues/questions_app';
import { ACCUEIL, QUESTIONS_FIN } from 'objets_trouves/modeles/situation';

describe("La vue de l'acte d'objets trouvés", function () {
  let wrapper;
  let store;

  beforeEach(function () {
    store = creeStore();
    store.commit('configureActe', { apps: { photos: [{}], agenda: [{}] }, questionsFin: [{}] });
    wrapper = mount(ActeObjetsTrouves, {
      shallow: true,
      global: {
        plugins: [store]
      }
    });
  });

  it("affiche l'application accueil", function () {
    expect(wrapper.findComponent(AppAccueil).exists()).toBe(true);
  });

  it('affiche une application', function (done) {
    store.commit('afficheApp', 'photos');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findComponent(QuestionsApp).exists()).toBe(true);
      done();
    });
  });

  it("repasse sur l'accueil une fois répondu a toute les questions d'une app", function (done) {
    store.commit('afficheApp', 'photos');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findComponent(QuestionsApp).exists()).toBe(true);
      store.commit('modifieEtatTelephone', ACCUEIL);
      wrapper.vm.$nextTick(() => {
        expect(wrapper.findComponent(QuestionsApp).exists()).toBe(false);
        expect(wrapper.findComponent(AppAccueil).exists()).toBe(true);
        done();
      });
    });
  });

  it("affiche les questions de fin lorsque l'état du téléphone passe à questionsFin", function (done) {
    store.commit('ajouteAppVisitee', 'photos');
    store.commit('ajouteAppVisitee', 'agenda');
    store.commit('modifieEtatTelephone', QUESTIONS_FIN);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findComponent(QuestionsApp).exists()).toBe(true);
      done();
    });
  });

  it("envois l'évenement terminé si il n'y a pas de questions de fin", function (done) {
    store.commit('configureActe', { apps: { agenda: [{}] } });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('terminer')).toBe(undefined);
      store.commit('ajouteAppVisitee', 'agenda');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.emitted('terminer').length).toEqual(1);
        done();
      });
    });
  });

  it("une fois toutes les questions de fin sont passés, envoi l'événement terminer", function () {
    expect(wrapper.emitted('terminer')).toBe(undefined);
    wrapper.vm.finDeLaFin();
    expect(wrapper.emitted('terminer').length).toEqual(1);
  });

  it("passe à la transition après avoir déverrouillé l'écran et fait toutes les apps", function () {
    store.commit('configureActe', {
      appsAccueilVerrouille: { deverrouillage: [{}] },
      apps: { photos: [{}], agenda: [{}] },
      questionsFin: [{}]
    });

    store.commit('afficheApp', 'deverrouillage');
    wrapper.vm.finApp();
    store.commit('afficheApp', 'photos');
    wrapper.vm.finApp();
    store.commit('afficheApp', 'agenda');
    wrapper.vm.finApp();

    expect(wrapper.vm.passeALaTransition).toBe(true);
  });
});
