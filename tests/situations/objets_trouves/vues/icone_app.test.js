import { shallowMount } from '@vue/test-utils';
import { traduction } from 'commun/infra/internationalisation';
import { creeStore } from 'objets_trouves/modeles/store';
import IconeApp from 'objets_trouves/vues/icone_app';

describe("Les propriétés d'une app", function () {
  let wrapper;
  let store;

  beforeEach(function () {
    store = creeStore();
    store.commit('configureActe', { apps: { agenda: { 0: { icone: 'icon-agenda' } } } });
    wrapper = shallowMount(IconeApp, {
      global: {
        plugins: [store],
        mocks: {
          $traduction: traduction
        }
      },
      props: {
        app: 'agenda',
        desactivee: false
      }
    });
  });

  it("affiche la couleur et l'icone", function () {
    const icone = wrapper.find('.icone');
    expect(icone.classes('icone--agenda')).toBe(true);
    expect(icone.attributes('style')).toBe('background-image: url(icon-agenda);');
  });

  it("emet ouvrirApp quand on clique sur l'icone", function () {
    const icone = wrapper.find('.icone');
    icone.trigger('click');
    expect(wrapper.emitted('ouvrirApp').length).toBe(1);
  });
});
