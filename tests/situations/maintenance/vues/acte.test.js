import { shallowMount } from '@vue/test-utils';
import Acte from 'maintenance/vues/acte';
import Lexique from 'maintenance/vues/lexique';
import { creeStore, ENTRAINEMENT_DEMARRE, DEMARRE } from 'maintenance/modeles/store';

describe("La vue de l'acte", function () {
  let wrapper;
  let store;

  beforeEach(function () {
    store = creeStore();
    wrapper = shallowMount(Acte, {
      global: {
        plugins: [store]
      }
    });
  });

  it('affiche le fond', function (done) {
    store.commit('configureActe', { fondSituation: 'test', zones: [] });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.attributes('style')).toBe('background-image: url(test);');
      done();
    });
  });

  it("Affiche le Lexique une fois l'entrainement démarré", function (done) {
    expect(wrapper.vm.afficheLexique).toEqual(false);
    expect(wrapper.findComponent(Lexique).exists()).toBe(false);
    store.commit('configureActe', { lexique: [] });
    store.commit('modifieEtat', ENTRAINEMENT_DEMARRE);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.afficheLexique).toEqual(true);
      expect(wrapper.findComponent(Lexique).exists()).toBe(true);
      done();
    });
  });

  it('Affiche le Lexique une fois la situation démarré', function (done) {
    expect(wrapper.vm.afficheLexique).toEqual(false);
    expect(wrapper.findComponent(Lexique).exists()).toBe(false);
    store.commit('configureActe', { lexique: [] });
    store.commit('modifieEtat', DEMARRE);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.afficheLexique).toEqual(true);
      expect(wrapper.findComponent(Lexique).exists()).toBe(true);
      done();
    });
  });
});
