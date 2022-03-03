import { shallowMount, createLocalVue } from '@vue/test-utils';

import ClicSurMots from 'cafe_de_la_place/vues/components/clic_sur_mots.vue';

describe('Le composant Clic Sur Mots', function () {
  let question;
  let wrapper;
  let localVue;

  beforeEach(function () {
    question = { id: 1, choix: [{ id: 'exercice', bonneReponse: true }], nom_technique: 'question1' };
    localVue = createLocalVue();
    wrapper = shallowMount(ClicSurMots, { localVue, propsData: { question } });
  });

  describe('#selectionneMot', function () {
    it('enregistre le mot sur lequel on clique', function () {
      const event = { target: { innerText: 'Mot' } };
      wrapper.vm.selectionneMot(event);
      expect(wrapper.vm.motSelectionne).toBe('Mot');
    });

    describe('quand je sélectionne le bon mot', function () {
      it('emet une réponse valide', function () {
        const event = { target: { innerText: 'exercice' } };
        wrapper.vm.selectionneMot(event);
        expect(wrapper.emitted().reponse.length).toEqual(1);
        expect(wrapper.emitted().reponse[0][0]).toEqual({ reponse: "exercice", succes: true });
      });
    });

    describe('quand je sélectionne un mot invalide', function () {
      it('emet une réponse invalide', function () {
        const event = { target: { innerText: 'invalide' } };
        wrapper.vm.selectionneMot(event);
        expect(wrapper.emitted().reponse.length).toEqual(1);
        expect(wrapper.emitted().reponse[0][0]).toEqual({ succes: false });
      });
    });
  });
});
