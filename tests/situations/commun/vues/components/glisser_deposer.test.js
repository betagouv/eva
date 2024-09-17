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

  function genereVue(reponsesNonClassees) {
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
        }
      }
    });
  }

  it("affiche la zone de dépot d'arrivée", function () {
    genereVue([]);
    expect(wrapper.find('.container-arrivee .zone-depot').exists()).toBe(true);
  });

  describe('ordre des réponses non classés', function() {
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

  describe("les composants draggable envoie une réponse à chaque fois qu'on pose un fragement", function() {
    it("la zone de dépot d'arrivée emet ses réponses", function() {
      genereVue([1, 2]);
      wrapper.findComponent('.container-arrivee .zone-depot').vm.$emit('end');
      expect(wrapper.emitted('deplace-item').length).toEqual(1);
    });

    it("la zone de dépot de départ emet ses réponses", function() {
      genereVue([1, 2]);
      wrapper.findComponent('.container-depart .zone-depot').vm.$emit('end');
      expect(wrapper.emitted('deplace-item').length).toEqual(1);
    });
  });

  describe("quand on a pas encore envoyé un ensemble de reponse complet", function () {
    beforeEach(function () {
      genereVue([2, 1]);
      wrapper.vm.fragmentsClasses.push({ id: 1 });
      wrapper.vm.envoiReponse();
    });

    it("affiche la zone de dépot de départ", function () {
      expect(wrapper.vm.afficheZoneDepotDepart).toEqual(true);
      expect(wrapper.find('.container-depart .zone-depot').exists()).toBe(true);
    });

    it("affiche la zone de dépot d'arrivée", function () {
      const zoneDeDepot = wrapper.find('.container-arrivee .zone-depot');
      expect(zoneDeDepot.exists()).toBe(true);
    });
  });

  describe("quand on a envoyé un ensemble de réponse complet", function () {
    beforeEach(function () {
      genereVue([2, 1]);
      wrapper.vm.fragmentsClasses.push({ position: 1 });
      wrapper.vm.fragmentsClasses.push({ position: 2 });
      wrapper.vm.envoiReponse();
    });

    it("n'affiche plus la zone de dépot de départ", function () {
      expect(wrapper.vm.afficheZoneDepotDepart).toEqual(false);
      expect(wrapper.find('.container-depart .zone-depot').exists()).toBe(false);
    });
  });

  describe("envoie la réponse au parent", function() {
    it('envoie le score, le sucess et la réponse', function () {
      genereVue([1, 0, 2, 3, 4, 5, 6]);
      for(const position of bonOrdre) {
        wrapper.vm.fragmentsClasses.push({ position });
      }
      wrapper.vm.envoiReponse();
      expect(wrapper.emitted('deplace-item').length).toEqual(1);
      expect(wrapper.emitted('deplace-item')[0][0]).toEqual({
        scoreMax: 8,
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
  });

  describe("quand on a pas encore envoyé un ensemble de reponse complet", function () {
    beforeEach(function () {
      genereVue(bonOrdre);
      wrapper.vm.envoiReponse({ reponse: [1, 2, 3, 4, 5, 6] });
    });

    it("affiche l'aide dépot", function () {
      expect(wrapper.vm.afficheAideDepot).toEqual(true);
      expect(wrapper.find('.aide-depot').exists()).toBe(true);
    });
  });

  describe("quand on a envoyé un ensemble de reponse complet", function () {
    beforeEach(function () {
      genereVue(bonOrdre);
      for(const position of bonOrdre) {
        wrapper.vm.fragmentsClasses.push({ position });
      }
      wrapper.vm.envoiReponse();
    });

    it("n'affiche plus l'aide dépot", function () {
      expect(wrapper.vm.afficheAideDepot).toEqual(false);
      expect(wrapper.find('.aide-depot').exists()).toBe(false);
    });
  });
});
