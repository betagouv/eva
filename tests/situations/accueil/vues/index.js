import { shallowMount, createLocalVue } from '@vue/test-utils';
import BoiteUtilisateur from 'commun/vues/boite_utilisateur';
import Index from 'accueil/vues/index';
import OverlayChargement from 'commun/vues/overlay_chargement';
import OverlayErreurChargement from 'commun/vues/overlay_erreur_chargement';
import Accueil from 'accueil/vues/accueil';

describe('La vue index', function () {
  let depotRessources;
  let promise;
  let localVue;

  beforeEach(function () {
    promise = Promise.resolve();
    depotRessources = new class {
      chargement () { return promise; }
    }();

    localVue = createLocalVue();
    localVue.prototype.$depotRessources = depotRessources;
  });

  it('affiche les composants en chargement', function () {
    const wrapper = shallowMount(Index, { localVue });
    expect(wrapper.contains(BoiteUtilisateur)).to.be(false);
    expect(wrapper.contains(Accueil)).to.be(false);
    expect(wrapper.contains(OverlayChargement)).to.be(true);
  });

  it('affiche les composants une fois chargé', function (done) {
    const wrapper = shallowMount(Index, { localVue });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.contains(BoiteUtilisateur)).to.be(true);
      expect(wrapper.contains(Accueil)).to.be(true);
      expect(wrapper.contains(OverlayChargement)).to.be(false);
      done();
    });
  });

  it('affiche les composants lorsque le chargement a échoué', function () {
    const wrapper = shallowMount(Index, { localVue });
    wrapper.vm.erreurChargement = true;
    expect(wrapper.contains(BoiteUtilisateur)).to.be(false);
    expect(wrapper.contains(Accueil)).to.be(false);
    expect(wrapper.contains(OverlayChargement)).to.be(false);
    expect(wrapper.contains(OverlayErreurChargement)).to.be(true);
  });
});
