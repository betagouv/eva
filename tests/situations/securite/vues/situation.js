import { shallowMount, createLocalVue } from '@vue/test-utils';
import Situation from 'securite/vues/situation.vue';
import { creeStore, CHARGEMENT, FINI } from 'securite/store/store';
import EvenementClickHorsZone from 'securite/modeles/evenement_click_hors_zone';

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

  it('mets a jour le compteur de dangers identifié', function () {
    store.commit('chargeZonesEtDangers', { zones: [{ x: 4, y: 5, r: 6, danger: 'test' }], dangers: { test: {}, test2: {} } });
    expect(wrapper.findAll('.panneau-danger').length).to.eql(2);
    expect(wrapper.findAll('.panneau-danger-trouve').length).to.eql(0);
    store.commit('ajouteDangerQualifie', { nom: 'test', choix: 'bon' });
    expect(wrapper.findAll('.panneau-danger-trouve').length).to.eql(1);
  });

  it('calcule le nombre de danger à qualifier', function () {
    expect(wrapper.vm.nombreDangersAQualifies).to.equal(0);
    store.commit('chargeZonesEtDangers', {
      dangers: { danger1: {}, danger2: {} }
    });
    expect(wrapper.vm.nombreDangersAQualifies).to.equal(2);
  });

  it('déselectionne la zone courante', function () {
    store.commit('chargeZonesEtDangers', { zones: [{ x: 1, y: 2, r: 3 }, { x: 4, y: 5, r: 6 }], dangers: {} });
    wrapper.find('.zone').trigger('click');
    expect(wrapper.findAll('.zone-selectionnee').length).to.eql(1);
    wrapper.vm.deselectionneZone();
    expect(wrapper.findAll('.zone-selectionnee').length).to.eql(0);
  });

  it("avec le niveau d'aide activé, ajoute la classe aide sur la zone", function () {
    store.commit('chargeZonesEtDangers', { zones: [{ x: 1, y: 2, r: 3 }], dangers: {} });
    store.commit('activeAide');
    expect(wrapper.findAll('.zone.zone-aide').length).to.eql(1);
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

  it('un click sur le fond de la situation enregistre un événement click hors zone', function (done) {
    localVue.prototype.journal = {
      enregistre (evenement) {
        expect(evenement).to.be.a(EvenementClickHorsZone);
        expect(evenement.donnees()).to.be.eql({ x: 50, y: 10 });
        done();
      }
    };
    wrapper.trigger('click', {
      layerX: 504,
      layerY: 56.6
    });
  });

  it("un click sur une zone n'enregistre pas d'événement click hors zone", function () {
    store.commit('chargeZonesEtDangers', { zones: [{ x: 1, y: 2, r: 3 }], dangers: {} });
    let enregistre = 0;
    localVue.prototype.journal = {
      enregistre (evenement) {
        enregistre++;
      }
    };
    wrapper.find('circle').trigger('click');
    expect(enregistre).to.eql(0);
  });

  it("un click sur le compteur n'enregistre pas d'événement click hors zone", function () {
    store.commit('chargeZonesEtDangers', { zones: [{ x: 1, y: 2, r: 3 }], dangers: {} });
    let enregistre = 0;
    localVue.prototype.journal = {
      enregistre (evenement) {
        enregistre++;
      }
    };
    wrapper.find('.compteur-statut').trigger('click');
    expect(enregistre).to.eql(0);
  });
});
