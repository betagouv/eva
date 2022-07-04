import { shallowMount, createLocalVue } from '@vue/test-utils';

import Graphique from 'cafe_de_la_place/vues/components/graphique.vue';

describe('Le composant Graphique', function () {
  let question;
  let localVue;

  beforeEach(function () {
    question = { id: 1 };
    localVue = createLocalVue();
  });

  function composant (question, paysSelectionnes) {
    return shallowMount(Graphique, {
      localVue,
      data() {
        return {
          paysSelectionnes: paysSelectionnes,
          pays: [
            {
              id: 'allemagne',
              pourcentage: 23
            },
            {
              id: 'pologne',
              pourcentage: 18
            }
          ]
        };
      },
      propsData: { question }
    });
  }

  describe('quand je clique sur une barre du graphique', function () {
    it("ajoute la classe graphique-barre--selectionnee", function (done) {
      const wrapper = composant(question, []);
      expect(wrapper.find('.graphique-barre--selectionnee').exists()).toBe(false);
      wrapper.vm.paysSelectionnes.push('allemagne');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('.graphique-barre--selectionnee').exists()).toBe(true);
        done();
      });
    });
  });

  describe("l'envoi de la réponse", function() {
    let wrapper;

    beforeEach(function () {
      wrapper = composant(question, ['allemagne']);
    });

    describe('quand je sélectionne un pays', function () {
      it('emet une réponse avec la sélection en cours', function (done) {
        wrapper.vm.paysSelectionnes.push('pologne');
        wrapper.vm.$nextTick(() => {
          expect(wrapper.emitted().reponse[0][0]).toEqual({"reponse": ["allemagne", "pologne"]});
          done();
        });
      });
    });

    describe('quand je ne selectionne aucun pays', function () {
      it("emet l'absence de réponse", function (done) {
        wrapper.vm.paysSelectionnes = [];
        wrapper.vm.$nextTick(() => {
          expect(wrapper.emitted().reponse[0][0]).toEqual(undefined);
          done();
        });
      });
    });
  });
});
