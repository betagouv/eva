import { shallowMount } from '@vue/test-utils';

import ClicDansImage from 'commun/vues/components/clic_dans_image.vue';

describe('Le composant Clic Dans Image', function () {
  let question;
  let wrapper;

  beforeEach(function () {
    question = {
      id: 1,
      zone_cliquable: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGNsYXNzPSJib25uZS1yZXBvbnNlIiBjeD0iMjU2IiBjeT0iNTYiIHI9IjQwIi8+PHBhdGggZD0ibTIwNC4yMyAyNzQuNDRjMi45LTE4LjA2IDQuMi0zNS41Mi0uNS00Ny41OS00LTEwLjM4LTEyLjctMTYuMTktMjMuMi0yMC4xNWwtOTIuNTMtMjkuOTRjLTEyLTQtMjMuMjEtMTAuNy0yNC0yMy45NC0xLTE3IDE0LTI4IDI5LTI0IDAgMCA4OCAzMS4xNCAxNjMgMzEuMTRzMTYyLTMxIDE2Mi0zMWMxOC01IDMwIDkgMzAgMjMuNzkgMCAxNC4yMS0xMSAxOS4yMS0yNCAyMy45NGwtODggMzEuOTFjLTggMy0yMSA5LTI2IDE4LjE4LTYgMTAuNzUtNSAyOS41My0yLjEgNDcuNTlsNS45IDI5LjYzIDM3LjQxIDE2My45YzIuOCAxMy4xNS02LjMgMjUuNDQtMTkuNCAyNy43NHMtMjMuODEtNi42NC0yNy42OS0xOS4zNmwtMzcuNTYtMTE1LjkzcS0yLjcxLTguMzQtNC44LTE2Ljg3bC01Ljc2LTIzLjQ4LTUuMyAyMS42NXEtMi41MiAxMC4zNS01LjggMjAuNDhsLTM2LjkgMTE0LjA1Yy00IDEyLjg1LTE0LjUgMjEuNzUtMjcuNiAxOS40NnMtMjIuNC0xNS41OS0xOS40Ni0yNy43NGwzNy4zOS0xNjMuODN6Ii8+PC9zdmc+Cg==",
      reponse: {
        score: 1
      }
    };
    wrapper = composant(question);
  });

  function composant (question) {
    return shallowMount(ClicDansImage, {
      props: { question }
    });
  }

  it("Affiche le svg", function () {
    const wrapper = composant(question);

    expect(wrapper.find('svg').exists()).toBe(true);
  });

  describe('quand je clique sur un element du svg', function () {
    it("ajoute la classe reponse--selectionnee", function () {
      const wrapper = composant(question);

      const reponse = wrapper.find('circle');
      reponse.trigger('click');
      expect(reponse.classes()).toContain('reponse--selectionnee');
    });
  });

  describe("l'envoi de la réponse", function() {
    describe('quand je sélectionne une bonne réponse', function () {
      it('émet la bonne réponse', function () {
        const reponse = wrapper.find('.bonne-reponse');
        reponse.trigger('click');
        expect(wrapper.emitted().reponse.length).toEqual(1);
        expect(wrapper.emitted().reponse[0][0].succes).toEqual(true);
      });
    });

    describe('quand je sélectionne une mauvaise réponse', function () {
      it("émet la mauvaise réponse", function () {
        const reponse = wrapper.find('path');
        reponse.trigger('click');
        expect(wrapper.emitted().reponse.length).toEqual(1);
        expect(wrapper.emitted().reponse[0][0].succes).toEqual(false);
      });
    });
  });
});
