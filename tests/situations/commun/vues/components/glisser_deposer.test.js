import glisserDeposer from 'commun/vues/components/glisser_deposer.vue';
import { config, mount } from '@vue/test-utils';

describe('Le composant Glisser Deposer', function () {
  let wrapper;
  const bonOrdre = [1, 2, 3, 4, 5, 6, 7];

  beforeAll(() => {
    config.global.renderStubDefaultSlot = true;
  });

  afterAll(() => {
    config.global.renderStubDefaultSlot = false;
  });

  function genereVue(reponsesNonClassees, type = 'tri', zonesDepot = null) {
    wrapper = mount(glisserDeposer, {
      global: {
        mocks: {
          $traduction: () => {}
        }
      },
      props: {
        question: {
          reponsesNonClassees,
          score: 8
        },
        type: type,
        ...(zonesDepot?.length && { zonesDepot })
      }
    });
  }

  function mockDragEvent(item, zone) {
    const mockItem = document.createElement('div');
    mockItem.setAttribute('class', `item--${item}`);
    mockItem.setAttribute('data-nom-technique', item);

    const mockZone = document.createElement('div');
    mockZone.setAttribute('class', `zone-depot--${zone}`);
    mockZone.setAttribute('data-nom-technique', zone);
    mockZone.setAttribute('data-index', 0);

    return {
      item: mockItem,
      to: mockZone
    };
  }

  describe("Affichage de l'aide dépot", function () {
    describe("quand il reste des élèments à placer", function () {
      beforeEach(function () {
        genereVue(bonOrdre);
        wrapper.vm.reponsesNonClassees = [1];
      });

      it("affiche l'aide dépot", function () {
        expect(wrapper.vm.afficheAideDepot).toEqual(true);
        expect(wrapper.find('.aide-depot').exists()).toBe(true);
      });
    });

    describe("quand il n'y a plus d'éléments à placer", function () {
      beforeEach(function () {
        genereVue(bonOrdre);
        wrapper.vm.reponsesNonClassees = [];
      });

      it("n'affiche plus l'aide dépot", function () {
        expect(wrapper.vm.afficheAideDepot).toEqual(false);
        expect(wrapper.find('.aide-depot').exists()).toBe(false);
      });
    });

    describe("quand le composant est pour le 'depot'", function () {
      beforeEach(function () {
        genereVue(bonOrdre, 'depot');
        wrapper.vm.reponsesNonClassees = [1];
      });

      it("n'affiche pas l'aide dépot", function () {
        expect(wrapper.vm.afficheAideDepot).toEqual(false);
        expect(wrapper.find('.aide-depot').exists()).toBe(false);
      });
    });
  });

  describe("Affichage des zones de dépôt", function () {
    beforeEach(function () {
      genereVue([2, 1]);
      wrapper.vm.envoiReponse();
    });

    it("affiche la zone de dépot de départ", function () {
      expect(wrapper.vm.afficheZoneDepotDepart).toEqual(true);
      expect(wrapper.find('.container-depart .zone-depot').exists()).toBe(true);
    });

    it("affiche une seule zone de dépot d'arrivée par défaut", function () {
      const zoneDeDepot = wrapper.find('.container-arrivee .zone-depot');
      expect(zoneDeDepot.exists()).toBe(true);
      expect(wrapper.findAll('.container-arrivee .zone-depot').length).toBe(1);
    });

    describe("quand il n'y a plus de réponses à classer", function () {
      beforeEach(function () {
        genereVue([2, 1]);
        wrapper.vm.reponsesNonClassees = [];
      });

      it("n'affiche plus la zone de dépot de départ par défaut", function (done) {
        wrapper.vm.envoiReponse();

        wrapper.vm.$nextTick(() => {
          expect(wrapper.vm.afficheZoneDepotDepart).toEqual(false);
          expect(wrapper.find('.container-depart .zone-depot').exists()).toBe(false);
          done();
        });
      });

      it("continue d'afficher la zone de dépot de départ quand le depot est multiple", function (done) {
        const mockEvent = mockDragEvent('1', '2');
        wrapper.vm.envoiReponseMultiple(mockEvent);
        wrapper.vm.$nextTick(() => {
          expect(wrapper.vm.afficheZoneDepotDepart).toEqual(true);
          expect(wrapper.find('.container-depart .zone-depot').exists()).toBe(true);
          done();
        });
      });
    });

    describe("lorsqu'il y a plusieurs zones de dépôt d'arrivée", function () {
      it("affiche plusieurs zones de dépot d'arrivée", function () {
        genereVue([], false, [{}, {}]);
        expect(wrapper.findAll('.container-arrivee .zone-depot').length).toBe(2);
      });
    });
  });

  describe("les composants draggable envoie une réponse à chaque fois qu'un élement est posé", function() {
    it("la zone de dépot d'arrivée emet ses réponses", function() {
      genereVue([1, 2]);
      wrapper.findComponent('.container-arrivee .zone-depot').vm.$emit('end');
      expect(wrapper.emitted('ordonne-item').length).toEqual(1);
    });

    it("la zone de dépot de départ emet ses réponses", function() {
      genereVue([1, 2]);
      wrapper.findComponent('.container-depart .zone-depot').vm.$emit('end');
      expect(wrapper.emitted('ordonne-item').length).toEqual(1);
    });
  });

  describe('Ordre des réponses non classés', function() {
    describe("lorsqu'elles ont un ordre prédéfini", function () {
      beforeEach(function () {
        genereVue([{ position_client: 3 }, { position_client: 1 }, { position_client: 2 }]);
      });

      it("trie les réponses dans l'ordre prédéfini", function () {
        const reponses = wrapper.findAll('.container-depart .glisser-deposer__item');
        expect(reponses.length).toEqual(3);
        expect(wrapper.vm.reponsesNonClassees[0]).toEqual({"position_client": 1});
        expect(wrapper.vm.reponsesNonClassees[1]).toEqual({"position_client": 2});
        expect(wrapper.vm.reponsesNonClassees[2]).toEqual({"position_client": 3});
      });
    });

    describe("lorsqu'elles n'ont pas d'ordre prédéfini", function () {
      beforeEach(function () {
        genereVue([2, 1]);
      });

      it("affiche les réponses telles qu'elles", function () {
        const reponses = wrapper.findAll('.container-depart .glisser-deposer__item');
        expect(reponses.length).toEqual(2);
        expect(wrapper.vm.reponsesNonClassees[0]).toEqual(2);
        expect(wrapper.vm.reponsesNonClassees[1]).toEqual(1);
      });
    });
  });

  describe("Avec une zone de dépôt simple", function() {
    it('envoie le succes et la réponse au parent', function () {
      genereVue([1, 0, 2, 3, 4, 5, 6]);
      for(const position of bonOrdre) {
        wrapper.vm.zonesDeClassement[0].push({ position });
      }
      wrapper.vm.envoiReponse();
      expect(wrapper.emitted('ordonne-item').length).toEqual(1);
      expect(wrapper.emitted('ordonne-item')[0][0]).toEqual({
        succes: true,
        reponse: bonOrdre
      });
    });

    describe('#succes', function() {
      it("quand tout est à la bonne place", function() {
        expect(wrapper.vm.succes(bonOrdre)).toBe(true);
      });

      it("quand ce n'est pas le bon ordre", function() {
        expect(wrapper.vm.succes([1, 2, 3, 4, 5, 7, 6])).toBe(false);
      });
    });

    it("ne remplace pas l'élément déjà présent à l'ajout", function() {
      genereVue([1, 2, 3]);
      wrapper.vm.reponsesNonClassees = [1];
      wrapper.vm.zonesDeClassement = [[2, 3]];
      wrapper.findComponent('.container-arrivee .zone-depot').vm.$emit('add', { newIndex: 0 });
      expect(wrapper.vm.reponsesNonClassees).toEqual([1]);
      expect(wrapper.vm.zonesDeClassement[0]).toEqual([2, 3]);
    });
  });

  describe("Avec des zones de dépôt multiples", function() {
    it('envoie le succes et la réponse correcte au parent', function () {
      genereVue([]);
      const mockEvent = mockDragEvent('reponse1', 'reponse1');

      wrapper.vm.envoiReponseMultiple(mockEvent);
      expect(wrapper.emitted('deplace-item').length).toEqual(1);
      expect(wrapper.emitted('deplace-item')[0][0]).toEqual([{
        succes: true,
        reponse: "reponse1"
      }]);
    });

    it('envoie l\'échec et la réponse', function () {
      genereVue([]);
      const mockEvent = mockDragEvent('reponse1', 'reponse2');

      wrapper.vm.envoiReponseMultiple(mockEvent);
      expect(wrapper.emitted('deplace-item').length).toEqual(1);
      expect(wrapper.emitted('deplace-item')[0][0][0]["succes"]).toEqual(false);
    });

    it("remplace l'élèment déjà présent à l'ajout", function() {
      genereVue([1, 2, 3]);
      wrapper.vm.zoneDepotMultiple = true;
      wrapper.vm.reponsesNonClassees = [1];
      wrapper.vm.zonesDeClassement = [[2, 3]];
      wrapper.findComponent('.container-arrivee .zone-depot').vm.$emit('add', { newIndex: 1 });
      expect(wrapper.vm.reponsesNonClassees).toEqual([1, 2]);
      expect(wrapper.vm.zonesDeClassement[0]).toEqual([3]);
    });
  });
});
