import { shallowMount } from '@vue/test-utils';

import ClicDansImage from 'commun/vues/components/clic_dans_image.vue';

const svgUneReponse = `<svg><circle class="bonne-reponse"></circle><path></path></svg>`;
const svgDeuxReponses = `<svg><path class="bonne-reponse"></path><path class="bonne-reponse"></path><path></path></svg>`;

describe('Le composant Clic Dans Image', function () {
  let question;
  let wrapper;
  let depotRessources = {
    questions: () => { return [question]; },
    zoneCliquable: () => { return svgDOMParser(svgUneReponse); },
    imageAuClic: () => { return; },
  };

  beforeEach(function () {
    question = {
      id: 1,
      score: 1,
      zone_cliquable_url: "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJB"
    };
  });

  function composant (question) {
    return shallowMount(ClicDansImage, {
      global: {
        mocks: {
          $depotRessources: depotRessources,
        }
      },
      props: { question }
    });
  }

  function svgDOMParser(svgContent) {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');

    return svgDoc.documentElement;
  }

  it("Affiche le svg", function () {
    const wrapper = composant(question);

    expect(wrapper.find('svg').exists()).toBe(true);
  });

  describe('sans cuseur', function () {
    beforeEach(function () {
      depotRessources = {
        questions: () => { return []; },
        zoneCliquable: () => { return svgDOMParser(svgUneReponse); },
        imageAuClic: () => { return; },
      };
      wrapper = composant(question);
    });

    describe('quand je clique sur le svg directement', function () {
      it("n'ajoute pas la classe reponse--selectionnee", function () {
        const svg = wrapper.find('svg');

        svg.trigger('click');
        expect(svg.classes()).not.toContain('reponse--selectionnee');
      });

      it("affiche la réponse sélectionnée en surbrillance", function () {
        expect(wrapper.find('.curseur').exists()).toBe(false);
        const zoneCliquable = wrapper.find('.zone-cliquable');
        expect(zoneCliquable.classes()).toContain('zone-cliquable--sans-curseur');
      });
    });
  });

  describe('avec curseur', function () {
    beforeEach(function () {
      question.image_au_clic_url = "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJB";
      depotRessources['imageAuClic'] = () => { return svgDOMParser(svgDeuxReponses); };
      wrapper = composant(question);
    });

    it('affiche le curseur sans mettre la réponse sélectionnée en surbrillance', function () {
      expect(wrapper.find('.curseur svg').exists()).toBe(true);
      const zoneCliquable = wrapper.find('.zone-cliquable');
      expect(zoneCliquable.classes()).not.toContain('zone-cliquable--sans-curseur');
    });
  });

  describe('quand je clique sur un element du svg', function () {
    it("selectionne l'élément", function () {
      const wrapper = composant(question);

      const reponse = wrapper.find('circle');
      reponse.trigger('click');
      expect(reponse.classes()).toContain('reponse--selectionnee');
    });
  });

  describe('pour une selection simple', function () {
    beforeEach(function () {
      wrapper = composant(question);
    });

    describe("#selectionMultiple", function () {
      it("est faux", function () {
        expect(wrapper.vm.selectionMultiple).toBe(false);
      });
    });

    describe('quand je clique sur un second element du svg', function () {
      it("désélectionne l'ancien élement et sélectionne le nouveau", function (done) {
        const circle = wrapper.find('circle');
        circle.trigger('click');

        wrapper.vm.$nextTick(() => {
          expect(circle.classes()).toContain('reponse--selectionnee');
          const path = wrapper.find('path');
          path.trigger('click');

          wrapper.vm.$nextTick(() => {
            expect(path.classes()).toContain('reponse--selectionnee');
            done();
          });
        });
      });
    });

    describe('quand je sélectionne une bonne réponse', function () {
      it('émet la bonne réponse et le score', function () {
        const reponse = wrapper.find('.bonne-reponse');
        reponse.trigger('click');
        expect(wrapper.emitted().reponse.length).toEqual(1);
        expect(wrapper.emitted().reponse[0][0].succes).toEqual(true);
        expect(wrapper.emitted().reponse[0][0].score).toEqual(1);
      });
    });

    describe('quand je sélectionne une mauvaise réponse', function () {
      it("émet la mauvaise réponse et le score", function () {
        const reponse = wrapper.find('path');
        reponse.trigger('click');
        expect(wrapper.emitted().reponse.length).toEqual(1);
        expect(wrapper.emitted().reponse[0][0].succes).toEqual(false);
        expect(wrapper.emitted().reponse[0][0].score).toEqual(0);
      });
    });
  });

  describe('pour une selection multiple', function () {
    beforeEach(function(){
      depotRessources = {
        questions: () => { return []; },
        zoneCliquable: () => { return svgDOMParser(svgDeuxReponses); },
        imageAuClic: () => { return svgDOMParser("svg"); },
      },
      wrapper = composant(question);
    });

    describe("#selectionMultiple", function () {
      it("est vrai", function () {
        expect(wrapper.vm.selectionMultiple).toBe(true);
      });
    });

    describe('quand je clique sur un second element du svg', function () {
      it("sélectionne le nouveau et laisse l'ancien élément sélectionné", function (done) {
        const path = wrapper.findAll('path');
        path[0].trigger('click');

        wrapper.vm.$nextTick(() => {
          expect(path[0].classes()).toContain('reponse--selectionnee');
          path[1].trigger('click');

          wrapper.vm.$nextTick(() => {
            expect(path[1].classes()).toContain('reponse--selectionnee');
            expect(path[0].classes()).toContain('reponse--selectionnee');
            done();
          });
        });
      });
    });

    describe('quand je déselectionne un element', function () {
      it("recalcule le score", function () {
        const reponses = wrapper.findAll('.bonne-reponse');
        reponses[0].trigger('click');
        expect(wrapper.emitted().reponse.length).toEqual(1);
        expect(wrapper.emitted().reponse[0][0].score).toEqual(0.5);

        reponses[0].trigger('click');
        expect(wrapper.emitted().reponse.length).toEqual(2);
        expect(wrapper.emitted().reponse[1][0].score).toEqual(0);
      });
    });

    describe('envoie des réponses', function () {
      it('émet une partie ou la totalité du score en fonction du nombre de bonnes réponses sélectionnées', function () {
        const reponses = wrapper.findAll('.bonne-reponse');
        expect(reponses.length).toBe(2);
        reponses[0].trigger('click');
        expect(wrapper.emitted().reponse.length).toEqual(1);
        expect(wrapper.emitted().reponse[0][0].succes).toEqual(false);
        expect(wrapper.emitted().reponse[0][0].score).toEqual(0.5);

        reponses[1].trigger('click');
        expect(wrapper.emitted().reponse[1][0].succes).toEqual(true);
        expect(wrapper.emitted().reponse[1][0].score).toEqual(1);
      });
    });
  });
});
