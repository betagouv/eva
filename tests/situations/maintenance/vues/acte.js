import { shallowMount, createLocalVue } from '@vue/test-utils';
import Acte from 'maintenance/vues/acte';
import Lexique from 'maintenance/vues/lexique';
import { creeStore, ENTRAINEMENT_DEMARRE, DEMARRE } from 'maintenance/modeles/store';

describe("La vue de l'acte", function () {
  let wrapper;
  let localVue;
  let store;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$depotRessources = new class {
      fondSituation () {
        return { src: 'fond' };
      }
    }();
    store = creeStore();
    wrapper = shallowMount(Acte, {
      store,
      localVue
    });
  });

  it('affiche le fond', function () {
    expect(wrapper.attributes('style')).to.equal('background-image: url(fond);');
  });

  it("Affiche le Lexique une fois l'entrainement démarré", function () {
    expect(wrapper.vm.afficheLexique).to.eql(false);
    expect(wrapper.contains(Lexique)).to.be(false);
    store.commit('configureActe', { lexique: [] });
    store.commit('modifieEtat', ENTRAINEMENT_DEMARRE);
    expect(wrapper.vm.afficheLexique).to.eql(true);
    expect(wrapper.contains(Lexique)).to.be(true);
  });

  it('Affiche le Lexique une fois la situation démarré', function () {
    expect(wrapper.vm.afficheLexique).to.eql(false);
    expect(wrapper.contains(Lexique)).to.be(false);
    store.commit('configureActe', { lexique: [] });
    store.commit('modifieEtat', DEMARRE);
    expect(wrapper.vm.afficheLexique).to.eql(true);
    expect(wrapper.contains(Lexique)).to.be(true);
  });
});
