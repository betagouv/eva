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
    wrapper = shallowMount(ActeObjetsTrouves, { store });
  });

  it("affiche l'application accueil", function () {
    expect(wrapper.contains(AppAccueil)).to.be(true);
  });

  it('affiche une application', function () {
    store.commit('configureActe', { apps: { photos: {} } });
    store.commit('afficheApp', 'photos');
    expect(wrapper.contains(Qcm)).to.be(true);
  });

  it("repasse sur l'accueil une fois répondu a une question", function () {
    store.commit('configureActe', { apps: { photos: {} } });
    store.commit('afficheApp', 'photos');
    expect(wrapper.contains(Qcm)).to.be(true);
    wrapper.vm.reponseApp();
    expect(wrapper.contains(Qcm)).to.be(false);
    expect(wrapper.contains(AppAccueil)).to.be(true);
  });
});