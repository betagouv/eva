import { shallowMount } from '@vue/test-utils';
import ActePrevention from 'prevention/vues/acte';
import { creeStore } from 'prevention/modeles/store';
import MockDepotRessources from '../aides/mock_depot_ressources_prevention';
import EvenementOuvertureZone from 'commun/modeles/evenement_ouverture_zone';
import EvenementEvaluationDanger from 'prevention/modeles/evenement_evaluation_danger';
import EvenementPreventionDanger from 'prevention/modeles/evenement_prevention_danger';

describe("La vue de l'acte prévention", function () {
  let wrapper;
  let store;
  let journal;

  beforeEach(function () {
    const depotRessources = new MockDepotRessources();
    journal = { enregistre () {} };
    store = creeStore();
    wrapper = shallowMount(ActePrevention, {
      global: {
        plugins: [store],
        mocks: {
          $depotRessources: depotRessources,
          $journal: journal
        }
      },
    });
  });

  it('affiche le fond', function (done) {
    store.commit('configureActe', { fondSituation: 'fondSituation', zones: [] });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('image').attributes('href')).toEqual('fondSituation');
      done();
    });
  });

  it('affiche les zones', function (done) {
    store.commit('configureActe', { zones: [{ }] });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.zone').length).toEqual(1);
      done();
    });
  });

  it('affiche la vignette du danger', function () {
    store.commit('configureActe', { zones: [] });
    expect(wrapper.findAll('.vignette-danger').length).toEqual(1);
  });

  describe('avec 2 zones', function () {
    let zone1;
    let zone2;
    beforeEach(function () {
      zone1 = { id: 'zone1', x: 1, y: 2, r: 3 };
      zone2 = { id: 'zone2', x: 4, y: 5, r: 6 };
      store.commit('configureActe', { zones: [zone1, zone2] });
      zone1 = store.state.zones[0];
      zone2 = store.state.zones[1];
    });

    it('une zone survolé devient active', function () {
      expect(wrapper.vm.zonesNonActive).toEqual([zone1, zone2]);
      wrapper.vm.survoleZone(zone1);
      expect(wrapper.vm.zoneActive).toEqual(zone1);
      expect(wrapper.vm.zonesNonActive).toEqual([zone2]);
    });

    it('une zone évalué devient active', function () {
      expect(wrapper.vm.zonesNonActive).toEqual([zone1, zone2]);
      wrapper.vm.survoleZone(zone1);
      wrapper.vm.evalueZone(zone1);
      expect(wrapper.vm.zoneActive).toEqual(zone1);
      expect(wrapper.vm.zonesNonActive).toEqual([zone2]);
    });

    it('une zone évaluée déselectionne celle ci', function () {
      wrapper.vm.survoleZone(zone1);
      expect(wrapper.vm.zoneSurvolee).toEqual(zone1);
      wrapper.vm.evalueZone(zone1);
      expect(wrapper.vm.zoneSurvolee).toEqual(null);
      expect(wrapper.vm.zoneEvaluee).toEqual(zone1);
    });

    it('une zone de prévention devient active', function () {
      wrapper.vm.survoleZone(zone1);
      wrapper.vm.previentZone(zone1);
      expect(wrapper.vm.zoneActive).toEqual(zone1);
    });

    it('ne réouvre pas la zone en mode évaluation si celle ci est en mode prévention', function () {
      wrapper.vm.survoleZone(zone1);
      wrapper.vm.evalueZone(zone1);
      wrapper.vm.previentZone(zone1);
      wrapper.vm.evalueZone(zone1);
      expect(wrapper.vm.zoneEvaluee).toEqual(null);
    });

    it("une fois toutes les zones évaluées, envoie l'événement terminer", function (done) {
      wrapper.vm.survoleZone(zone1);
      wrapper.vm.selectionPrevention();
      expect(wrapper.emitted('terminer')).toBe(undefined);
      wrapper.vm.survoleZone(zone2);
      wrapper.vm.selectionPrevention();
      wrapper.vm.$nextTick(() => {
        expect(wrapper.emitted('terminer').length).toBe(1);
        done();
      });
    });

    it("envoie l'événement ouverture zone à l'ouverture d'une zone", function (done) {
      journal.enregistre = (evenement) => {
        expect(evenement).toBeInstanceOf(EvenementOuvertureZone);
        expect(evenement.donnees()).toEqual({ zone: zone1.id });
        done();
      };
      wrapper.vm.evalueZone(zone1);
    });

    it("envoie l'événement evaluation danger à l'évaluation d'une zone", function (done) {
      wrapper.vm.survoleZone(zone1);
      journal.enregistre = (evenement) => {
        expect(evenement).toBeInstanceOf(EvenementEvaluationDanger);
        expect(evenement.donnees()).toEqual({ zone: zone1.id, panneau: 'danger' });
        done();
      };
      wrapper.vm.previentZone('danger');
    });

    it("envoie l'événement prevention danger à la sélection de l'action de prévention", function (done) {
      wrapper.vm.survoleZone(zone1);
      journal.enregistre = (evenement) => {
        expect(evenement).toBeInstanceOf(EvenementPreventionDanger);
        expect(evenement.donnees()).toEqual({ zone: zone1.id, reponse: 'correct' });
        done();
      };
      wrapper.vm.selectionPrevention('correct');
    });
  });
});
