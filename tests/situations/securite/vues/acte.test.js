import { shallowMount, createLocalVue } from '@vue/test-utils';
import ActeSecurite from 'securite/vues/acte';
import EvenementClickHorsZone from 'securite/modeles/evenement_click_hors_zone';
import { creeStore } from 'securite/modeles/store';

describe("La vue de l'acte Sécurité", function () {
  let wrapper;
  let store;
  let localVue;

  beforeEach(function () {
    store = creeStore();
    localVue = createLocalVue();
    localVue.prototype.$traduction = () => {};
    wrapper = shallowMount(ActeSecurite, {
      store,
      localVue
    });
  });

  it('affiche les zones', function (done) {
    expect(wrapper.findAll('.zone').length).toEqual(0);
    store.commit('configureActe', { zones: [{ x: 1, y: 2, r: 3 }, { x: 4, y: 5, r: 6 }], dangers: {} });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.zone').length).toEqual(2);
      done();
    });
  });

  it('selectionne une zone au clic', function (done) {
    store.commit('configureActe', { zones: [{ x: 1, y: 2, r: 3 }, { x: 4, y: 5, r: 6 }], dangers: {} });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.zone-selectionnee').length).toEqual(0);
      wrapper.find('.zone').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.findAll('.zone-selectionnee').length).toEqual(1);
        done();
      });
    });
  });

  it("une fois une zone ouverte, ne permet pas d'en ouvrir une autre", function (done) {
    store.commit('configureActe', { zones: [{ x: 1, y: 2, r: 3 }, { x: 4, y: 5, r: 6 }], dangers: {} });
    wrapper.vm.$nextTick(() => {
      wrapper.find('.zone').trigger('click');
      wrapper.vm.$nextTick(() => {
        const zoneSelectionnee = wrapper.vm.zoneSelectionnee;
        wrapper.findAll('.zone').at(1).trigger('click');
        wrapper.vm.$nextTick(() => {
          expect(zoneSelectionnee).toEqual(wrapper.vm.zoneSelectionnee);
          done();
        });
      });
    });
  });

  it('une fois le danger qualifié, rajoute une classe sur la zone', function (done) {
    store.commit('configureActe', { zones: [{ x: 4, y: 5, r: 6, danger: 'test' }], dangers: { test: {} } });
    store.commit('ajouteDangerQualifie', { nom: 'test', choix: 'bon' });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.zone-qualifiee').length).toEqual(1);
      done();
    });
  });

  it('calcule le nombre de danger à qualifier', function () {
    expect(wrapper.vm.nombreDangersAQualifies).toBe(0);
    store.commit('configureActe', {
      dangers: { danger1: {}, danger2: {} }
    });
    expect(wrapper.vm.nombreDangersAQualifies).toBe(2);
  });

  it('déselectionne la zone courante', function (done) {
    store.commit('configureActe', { zones: [{ x: 1, y: 2, r: 3 }, { x: 4, y: 5, r: 6 }], dangers: {} });
    wrapper.vm.$nextTick(() => {
      wrapper.find('.zone').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.findAll('.zone-selectionnee').length).toEqual(1);
        wrapper.vm.deselectionneZone();
        wrapper.vm.$nextTick(() => {
          expect(wrapper.findAll('.zone-selectionnee').length).toEqual(0);
          done();
        });
      });
    });
  });

  it("avec le niveau d'aide activé, ajoute la classe aide sur la zone", function (done) {
    store.commit('configureActe', { zones: [{ x: 1, y: 2, r: 3 }], dangers: {} });
    store.commit('activeAide');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.zone.zone-aide').length).toEqual(1);
      done();
    });
  });

  it('émet un événement terminer lorsque tout les dangers ont été identifiés', function (done) {
    store.commit('configureActe', {
      zones: [{ x: 1, y: 2, r: 3, danger: 'danger1' }, { x: 4, y: 5, r: 6, danger: 'danger2' }],
      dangers: { danger1: {}, danger2: {} }
    });
    store.commit('ajouteDangerQualifie', { nom: 'danger1', choix: 'bon' });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('terminer')).toBe(undefined);
      store.commit('ajouteDangerQualifie', { nom: 'danger2', choix: 'mauvais' });
      wrapper.vm.$nextTick(() => {
        expect(wrapper.emitted('terminer').length).toEqual(1);
        done();
      });
    });
  });

  it('un click sur le fond de la situation enregistre un événement click hors zone', function (done) {
    localVue.prototype.$journal = {
      enregistre (evenement) {
        expect(evenement).toBeInstanceOf(EvenementClickHorsZone);
        expect(evenement.donnees()).toEqual({ x: 50, y: 10 });
        done();
      }
    };
    wrapper.trigger('click', {
      layerX: 504,
      layerY: 56.6
    });
  });

  it("un click hors zone alors qu'une zone est sélectionné n'enregistre pas un événement click hors zone", function (done) {
    store.commit('configureActe', { zones: [{ x: 1, y: 2, r: 3 }], dangers: {} });
    let enregistre = 0;
    localVue.prototype.$journal = {
      enregistre (evenement) {
        enregistre++;
      }
    };
    wrapper.vm.$nextTick(() => {
      wrapper.find('circle').trigger('click');
      wrapper.vm.$nextTick(() => {
        wrapper.trigger('click', {
          layerX: 504,
          layerY: 56.6
        });
        wrapper.vm.$nextTick(() => {
          expect(enregistre).toEqual(0);
          done();
        });
      });
    });
  });

  it("un click sur une zone n'enregistre pas d'événement click hors zone", function (done) {
    store.commit('configureActe', { zones: [{ x: 1, y: 2, r: 3 }], dangers: {} });
    let enregistre = 0;
    localVue.prototype.$journal = {
      enregistre (evenement) {
        enregistre++;
      }
    };
    wrapper.vm.$nextTick(() => {
      wrapper.find('circle').trigger('click');
      expect(enregistre).toEqual(0);
      done();
    });
  });

  it("un click sur le compteur n'enregistre pas d'événement click hors zone", function (done) {
    store.commit('configureActe', { zones: [{ x: 1, y: 2, r: 3 }], dangers: {} });
    let enregistre = 0;
    localVue.prototype.$journal = {
      enregistre (evenement) {
        enregistre++;
      }
    };
    wrapper.vm.$nextTick(() => {
      wrapper.find('.compteur-statut').trigger('click');
      expect(enregistre).toEqual(0);
      done();
    });
  });
});
