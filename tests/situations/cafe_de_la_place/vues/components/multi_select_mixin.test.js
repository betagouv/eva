import { shallowMount } from '@vue/test-utils';

import MultiSelectMixin from 'cafe_de_la_place/vues/components/multi_select_mixin';

describe('Le mixin multi-select', function () {
  describe('#emetReponseMultiple', function() {
    let wrapper;

    beforeEach(function () {
      const question = {
        reponse: {
          bonne_reponse: ['allemagne', 'france'],
        },
        score: 1
      };
      const Composant = {
        render() {},
        mixins: [MultiSelectMixin]
      };
      wrapper = shallowMount(Composant, {
        propsData: { question }
      });
    });

    it("quand la réponse est bonne", function() {
      wrapper.vm.emetReponseMultiple(['allemagne', 'france']);
      expect(wrapper.emitted().reponse[0][0]).toEqual({
        reponse: ['allemagne', 'france'],
        succes: true,
        score: 1
      });
    });

    it("quand la réponse est bonne dans le désodre", function() {
      wrapper.vm.emetReponseMultiple(['france', 'allemagne']);
      expect(wrapper.emitted().reponse[0][0]).toEqual({
        reponse: ['france', 'allemagne'],
        succes: true,
        score: 1
      });
    });


    it("quand la réponse est fausse", function() {
      wrapper.vm.emetReponseMultiple(['belgique']);
      expect(wrapper.emitted().reponse[0][0]).toEqual({
        reponse: ['belgique'],
        score: 0,
        succes: false
      });
    });

    it("quand la réponse est fausse sur le deuxième élément", function() {
      wrapper.vm.emetReponseMultiple(['allemagne', 'belgique']);
      expect(wrapper.emitted().reponse[0][0]).toEqual({
        reponse: ['allemagne', 'belgique'],
        score: 0,
        succes: false
      });
    });

    it("quand la réponse est fausse avec trop de réponse", function() {
      wrapper.vm.emetReponseMultiple(['allemagne', 'france', 'belgique']);
      expect(wrapper.emitted().reponse[0][0]).toEqual({
        reponse: ['allemagne', 'france', 'belgique'],
        score: 0,
        succes: false
      });
    });
  });
});
