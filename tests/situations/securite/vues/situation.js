import { shallowMount, createLocalVue } from '@vue/test-utils';
import Situation from 'securite/vues/situation.vue';
import SceneSecurite from 'securite/vues/scene';
import { creeStore, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI } from 'securite/store/store';

describe('La vue de la situation Sécurité', function () {
  let wrapper;
  let store;
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.depotRessources = new class {
      fondSituation () {
        return { src: 'fond-situation' };
      }

      fondSituationEntrainement () {
        return { src: 'fond-situation-entrainement' };
      }
    }();
    store = creeStore();
    wrapper = shallowMount(Situation, {
      store,
      localVue
    });
  });

  it("en mode entrainement, il rend le fond d'entrainement et cache l'aide", function () {
    store.commit('modifieEtat', ENTRAINEMENT_DEMARRE);
    expect(wrapper.vm.scene.fondSituation).to.eql('fond-situation-entrainement');
    expect(wrapper.vm.scene.afficheAide).to.be(false);
  });

  it("en mode normal, il rend le fond normal et affiche l'aide", function () {
    store.commit('modifieEtat', DEMARRE);
    expect(wrapper.vm.scene.fondSituation).to.eql('fond-situation');
    expect(wrapper.vm.scene.afficheAide).to.be(true);
  });

  it('rend la scene', function () {
    expect(wrapper.contains(SceneSecurite)).to.be(true);
  });

  it("charge les zones d'entrainement au chargement", function () {
    expect(store.state.zones.length).to.eql(2);
  });

  it('charge les autres zones de la situation une fois démarré', function () {
    expect(store.state.zones.length).to.eql(2);
    store.commit('modifieEtat', DEMARRE);
    expect(store.state.zones.length).to.eql(11);
  });

  it("change l'état de la situation en ENTRAINEMENT_FINI une fois la scene terminé", function () {
    store.commit('modifieEtat', ENTRAINEMENT_DEMARRE);
    wrapper.vm.changeEtatSituation();
    expect(store.state.etat).to.eql(ENTRAINEMENT_FINI);
  });

  it("change l'état de la situation en FINI une fois la scene terminé", function () {
    store.commit('modifieEtat', DEMARRE);
    wrapper.vm.changeEtatSituation();
    expect(store.state.etat).to.eql(FINI);
  });
});
