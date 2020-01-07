import { shallowMount } from '@vue/test-utils';
import ActePrevention from 'prevention/vues/acte';
import { creeStore } from 'securite/modeles/store';

describe("La vue de l'acte prévention", function () {
  let wrapper;
  let store;

  beforeEach(function () {
    store = creeStore();
    wrapper = shallowMount(ActePrevention, {
      store
    });
  });

  it('affiche le fond', function () {
    store.commit('configureActe', { fondSituation: 'fondSituation', zones: [] });
    expect(wrapper.attributes('style')).to.eql('background-image: url(fondSituation);');
  });

  it('affiche les zones', function () {
    store.commit('configureActe', { zones: [{ }] });
    expect(wrapper.findAll('.zone').length).to.eql(1);
  });

  describe('avec 2 zones', function () {
    let zone1;
    let zone2;
    beforeEach(function () {
      zone1 = {};
      zone2 = {};
      store.commit('configureActe', { zones: [zone1, zone2] });
    });

    it('une zone survolé devient active ', function () {
      expect(wrapper.vm.zonesNonActive).to.eql([zone1, zone2]);
      wrapper.vm.survoleZone(zone1);
      expect(wrapper.vm.zoneActive).to.eql(zone1);
      expect(wrapper.vm.zonesNonActive).to.eql([zone2]);
    });

    it('une zone évalué devient active ', function () {
      expect(wrapper.vm.zonesNonActive).to.eql([zone1, zone2]);
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
  });
});
