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

  function mockDragElement(zone, index) {
    const mockDragElement = document.createElement('div');
    mockDragElement.setAttribute('class', `zone-depot--${zone}`);
    mockDragElement.setAttribute('data-nom-technique', zone);
    mockDragElement.setAttribute('data-index', index);
    return mockDragElement;
  }

  function mockDragEvent(item, zone, from = undefined) {
    const mockItem = document.createElement('div');
    mockItem.setAttribute('class', `item--${item}`);
    mockItem.setAttribute('data-nom-technique', item);

    const to = mockDragElement(zone, 0);

    if (from === undefined) {
      from = mockDragElement(zone, 1);
    }

    return {
      item: mockItem,
      to: to,
      from: from
    };
  }

  describe("Affichage du placeholder pour la zone de dépot dans le cas du 'tri'", function () {
    describe("quand il reste des élèments à placer", function () {
      beforeEach(function () {
        genereVue(bonOrdre);
        wrapper.vm.reponsesNonClassees = [1];
      });

      it("affiche le placeholder", function () {
        expect(wrapper.vm.affichePlaceholderZoneTri).toEqual(true);
        expect(wrapper.find('.glisser-deposer__placeholder').exists()).toBe(true);
      });
    });

    describe("quand il n'y a plus d'éléments à placer", function () {
      beforeEach(function () {
        genereVue(bonOrdre);
        wrapper.vm.reponsesNonClassees = [];
      });

      it("n'affiche plus le placeholder", function () {
        expect(wrapper.vm.affichePlaceholderZoneTri).toEqual(false);
        expect(wrapper.find('.glisser-deposer__placeholder').exists()).toBe(false);
      });
    });

    describe("quand le composant est de type : 'depot'", function () {
      beforeEach(function () {
        genereVue(bonOrdre, 'depot');
        wrapper.vm.reponsesNonClassees = [1];
      });

      it("n'affiche pas le placeholder", function () {
        expect(wrapper.vm.affichePlaceholderZoneTri).toEqual(false);
        expect(wrapper.find('.glisser-deposer__placeholder').exists()).toBe(false);
      });

      it("affiche le composant GlisserDeposerOmbre", function () {
        expect(wrapper.find('svg.rectangle-bleu').exists()).toBe(true);
      });
    });

    describe("quand le composant est de type : 'tri'", function () {
      beforeEach(function () {
        genereVue(bonOrdre, 'tri');
        wrapper.vm.reponsesNonClassees = [1];
      });

      it("n'affiche pas le composant GlisserDeposerOmbre", function () {
        expect(wrapper.find('svg.rectangle-bleu').exists()).toBe(false);
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
        genereVue([], 'depot', [{}, {}]);
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
      wrapper.vm.reponsesNonClassees = [];
      wrapper.vm.envoiReponse();
      expect(wrapper.emitted('ordonne-item').length).toEqual(1);
      expect(wrapper.emitted('ordonne-item')[0][0]).toEqual({
        succes: true,
        reponse: bonOrdre
      });
    });

    describe('#succes', function() {
      beforeEach(function () {
        genereVue([1, 0, 2, 3, 4, 5, 6]);
      });

      describe("quand tous les éléments sont placés", function() {
        beforeEach(function () {
          wrapper.vm.reponsesNonClassees = [];
        });

        it("et dans le bon ordre", function() {
          expect(wrapper.vm.succes(bonOrdre)).toBe(true);
        });

        it("et dans le mauvais ordre", function() {
          expect(wrapper.vm.succes([1, 2, 3, 4, 5, 7, 6])).toBe(false);
        });
      });

      it("quand tous les éléments ne sont pas placés", function() {
        let dernierElement = bonOrdre[bonOrdre.length - 1];
        let reponsesIncompletes = bonOrdre.slice(0, -1);

        wrapper.vm.reponsesNonClassees = [dernierElement];
        expect(wrapper.vm.succes(reponsesIncompletes)).toBe(false);
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
      expect(wrapper.emitted('deplace-item')[0][0]).toEqual([
        {
          succes: true,
          reponse: "reponse1"
        },
        {
          reponse: null,
          succes: false,
        }
      ]);
    });

    it('envoie l\'échec et la réponse', function () {
      genereVue([]);
      const mockEvent = mockDragEvent('reponse1', 'reponse2');

      wrapper.vm.envoiReponseMultiple(mockEvent);
      expect(wrapper.emitted('deplace-item').length).toEqual(1);
      expect(wrapper.emitted('deplace-item')[0][0][0]["succes"]).toEqual(false);
    });

    it('déplace un element déjà présent', function () {
      const reponsesPlacees = [
        {reponse: null, succes: false},
        {reponse: null, succes: false},
        {reponse: 'reponse1', succes: false},
        {reponse: null, succes: false}
      ];
      genereVue([]);
      wrapper.vm.reponsesPlacees = reponsesPlacees;

      const fromElement = mockDragElement('reponse1', 2);
      const mockEvent = mockDragEvent('reponse1', 'reponse2', fromElement);

      wrapper.vm.envoiReponseMultiple(mockEvent);

      expect(wrapper.emitted('deplace-item')[0][0][0].reponse).toEqual('reponse1');
      expect(wrapper.emitted('deplace-item')[0][0][2].reponse).toEqual(null);
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
