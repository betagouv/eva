import { shallowMount, createLocalVue } from '@vue/test-utils';
import { traduction } from 'commun/infra/internationalisation';
import { creeStore } from 'objets_trouves/modeles/store';
import IconeApp from 'objets_trouves/vues/icone_app';

describe("Les propriétés d'une app", function () {
  let wrapper;
  let localVue;
  let store;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$traduction = traduction;
    store = creeStore();
    store.commit('configureActe', { apps: { agenda: { 0: { icone: 'icon-agenda' } } } });
    wrapper = shallowMount(IconeApp, {
      store,
      localVue,
      propsData: {
        app: 'agenda',
        desactivee: false
      }
    });
  });

  it("affiche la couleur et l'icone", function () {
    const icone = wrapper.find('.icone');
    expect(icone.classes('icone--agenda')).to.be(true);
    expect(icone.attributes('style')).to.equal('background-image: url(icon-agenda);');
  });
});
