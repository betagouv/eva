import { shallowMount, createLocalVue } from '@vue/test-utils';
import ActePrevention from 'prevention/vues/acte';
import { creeStore } from 'prevention/modeles/store';
import MockDepotRessources from '../aides/mock_depot_ressources_prevention';

describe("La vue de l'acte prévention", function () {
  let wrapper;
  let store;
  let depotRessources;

  beforeEach(function () {
    const localVue = createLocalVue();
    depotRessources = new MockDepotRessources();
    localVue.prototype.$depotRessources = depotRessources;
    store = creeStore();
    wrapper = shallowMount(ActePrevention, {
      store,
      localVue
    });
  });

  it('affiche le fond', function () {
    store.commit('configureActe', { fondSituation: 'fondSituation', zones: [] });
    expect(wrapper.find('image').attributes('href')).to.eql('fondSituation');
  });

  it('affiche les zones', function () {
    store.commit('configureActe', { zones: [{ }] });
    expect(wrapper.findAll('.zone').length).to.eql(1);
  });

  describe('avec 2 zones', function () {
    let zone1;
    let zone2;
    beforeEach(function () {
      zone1 = { x: 1, y: 2, r: 3 };
      zone2 = { x: 4, y: 5, r: 6 };
      store.commit('configureActe', { zones: [zone1, zone2] });
      zone1 = store.state.zones[0];
      zone2 = store.state.zones[1];
    });

    it('une zone survolé devient active ', function () {
      expect(wrapper.vm.zonesNonActive).to.eql([zone1, zone2]);
      wrapper.vm.survoleZone(zone1);
      expect(wrapper.vm.zoneActive).to.eql(zone1);
      expect(wrapper.vm.zonesNonActive).to.eql([zone2]);
    });

    it('une zone évalué devient active ', function () {
      expect(wrapper.vm.zonesNonActive).to.eql([zone1, zone2]);
      wrapper.vm.survoleZone(zone1);
      wrapper.vm.evalueZone(zone1);
      expect(wrapper.vm.zoneActive).to.eql(zone1);
      expect(wrapper.vm.zonesNonActive).to.eql([zone2]);
    });

    it('une zone évaluée déselectionne celle ci', function () {
      wrapper.vm.survoleZone(zone1);
      expect(wrapper.vm.zoneSurvolee).to.eql(zone1);
      wrapper.vm.evalueZone(zone1);
      expect(wrapper.vm.zoneSurvolee).to.eql(null);
      expect(wrapper.vm.zoneEvaluee).to.eql(zone1);
    });

    it('une zone de prévention devient active', function () {
      wrapper.vm.survoleZone(zone1);
      wrapper.vm.previentZone(zone1);
      expect(wrapper.vm.zoneActive).to.eql(zone1);
    });

    it('ne réouvre pas la zone en mode évaluation si celle ci est en mode prévention', function () {
      wrapper.vm.survoleZone(zone1);
      wrapper.vm.evalueZone(zone1);
      wrapper.vm.previentZone(zone1);
      wrapper.vm.evalueZone(zone1);
      expect(wrapper.vm.zoneEvaluee).to.eql(null);
    });
  });
});
