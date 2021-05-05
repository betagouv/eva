import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueIconeAppActive from 'objets_trouves/vues/icone-app-active.vue';
import { creeStore } from 'objets_trouves/modeles/store';
import { traduction } from 'commun/infra/internationalisation';
import IconeApp from 'objets_trouves/vues/icone_app';

describe("L'icone de l'application active", function () {
  let question;
  let store;
  let wrapper;
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$traduction = traduction;
    question = { choix: [] };
    store = creeStore();
    question.illustration = 'palette';
    wrapper = shallowMount(VueIconeAppActive, {
      propsData: {
        question
      },
      store,
      localVue
    });
  });

  it("ne s'affiche pas si aucune app n'est affichée", function () {
    expect(wrapper.find('.icone-conteneur').exists()).toBe(false);
  });

  it("s'affiche quand on affiche une app", function (done) {
    store.commit('configureActe', { apps: { agenda: { 0: { icone: 'icone-agenda' } } } });
    store.commit('afficheApp', 'agenda');

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.icone-conteneur').exists()).toBe(true);
      expect(wrapper.findComponent(IconeApp).exists()).toBe(true);
      done();
    });
  });

  it("n'affiche pas d'icône si l'app active est deverrouillage", function () {
    store.commit('configureActe', {
      appsAccueilVerrouille: { deverrouillage: { 0: { icone: 'icone-deverrouillage' } } },
      apps: { agenda: { } }
    });
    store.commit('afficheApp', 'deverrouillage');

    expect(wrapper.find('.icone-conteneur').exists()).toBe(false);
  });
});
