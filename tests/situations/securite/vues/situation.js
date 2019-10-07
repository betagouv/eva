import { shallowMount, createLocalVue } from '@vue/test-utils';
import Situation from 'securite/vues/situation.vue';
import { creeStore, CHARGEMENT, FINI } from 'securite/store/store';

describe('La vue de la situation Sécurité', function () {
  let wrapper;
  let store;

  beforeEach(function () {
    const localVue = createLocalVue();
    localVue.prototype.depotRessources = new class {
      fondSituation () {
        return { src: 'fond-situation' };
      }
    }();
    store = creeStore();
    wrapper = shallowMount(Situation, {
      store,
      localVue
    });
  });

  it('affiche le fond de situation', function () {
    expect(wrapper.vm.fondSituation).to.eql('url(fond-situation)');
  });

  it('affiche les zones', function () {
    expect(wrapper.findAll('.zone').length).to.eql(0);
    store.commit('chargeZonesEtDangers', { zones: [{ x: 1, y: 2, r: 3 }, { x: 4, y: 5, r: 6 }], dangers: {} });
    expect(wrapper.findAll('.zone').length).to.eql(2);
  });

  it('selectionne une zone au clic', function () {
    store.commit('chargeZonesEtDangers', { zones: [{ x: 1, y: 2, r: 3 }, { x: 4, y: 5, r: 6 }], dangers: {} });
    expect(wrapper.findAll('.zone-selectionnee').length).to.eql(0);
    wrapper.find('.zone').trigger('click');
    expect(wrapper.findAll('.zone-selectionnee').length).to.eql(1);
  });

  it('une fois le danger qualifié, rajoute une classe sur la zone', function () {
    store.commit('chargeZonesEtDangers', { zones: [{ x: 4, y: 5, r: 6, danger: 'test' }], dangers: { test: {} } });
    store.commit('ajouteDangerQualifie', { nom: 'test', choix: 'bon' });
    expect(wrapper.findAll('.zone-qualifiee').length).to.eql(1);
  });

  it('calcule le nombre de danger à qualifier', function () {
    expect(wrapper.vm.nombreDangersAQualifies).to.equal(0);
    store.commit('chargeZonesEtDangers', {
      dangers: { danger1: {}, danger2: {} }
    });
    expect(wrapper.vm.nombreDangersAQualifies).to.equal(2);
  });

  it('passe la situation en FINI lorsque tout les dangers ont été identifiés', function () {
    store.commit('chargeZonesEtDangers', {
      zones: [{ x: 1, y: 2, r: 3, danger: 'danger1' }, { x: 4, y: 5, r: 6, danger: 'danger2' }],
      dangers: { danger1: {}, danger2: {} }
    });
    store.commit('ajouteDangerQualifie', { nom: 'danger1', choix: 'bon' });
    expect(store.state.etat).to.equal(CHARGEMENT);
    store.commit('ajouteDangerQualifie', { nom: 'danger2', choix: 'mauvais' });
    expect(store.state.etat).to.equal(FINI);
  });
});
