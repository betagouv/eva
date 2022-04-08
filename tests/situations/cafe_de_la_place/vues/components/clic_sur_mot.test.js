import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import ClicSurMots from 'cafe_de_la_place/vues/components/clic_sur_mots.vue';

const htmlAttendu = `<ul>
<li><a href="">invalide</a></li>
<li><a href="">exercice</a></li>
</ul>`;

describe('Le composant Clic Sur Mots', function () {
  let question;
  let wrapper;
  let localVue;
  let store;

  beforeEach(function () {
    store = new Vuex.Store({ getters: { texteCliquable () { return '* [invalide]()\n* [exercice]()';}}});
    question = { id: 1, reponse: { texte: 'exercice' }, nom_technique: 'question1' };
    localVue = createLocalVue();
    wrapper = shallowMount(ClicSurMots, { localVue, store, propsData: { question } });
  });

  describe('quand je clique sur un mot', function () {
    it("ajoute la classe mot-cliquable--selectionne", function (done) {
      const lien = wrapper.findAll('.mot-cliquable').at(0);
      const lien2 = wrapper.findAll('.mot-cliquable').at(1);
      expect(lien.classes('mot-cliquable--selectionne')).toBe(false);
      lien.trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(lien.classes('mot-cliquable--selectionne')).toBe(true);
        lien2.trigger('click');
        wrapper.vm.$nextTick(() => {
          expect(lien.classes('mot-cliquable--selectionne')).toBe(false);
          expect(lien2.classes('mot-cliquable--selectionne')).toBe(true);
          done();
        });
      });
    });
  });

  describe('#envoiReponse', function () {
    describe('quand je sélectionne le bon mot', function () {
      it('emet une réponse valide', function () {
        const lien = wrapper.findAll('.mot-cliquable').at(1);
        wrapper.vm.envoiReponse(lien.element);
        expect(wrapper.emitted().reponse.length).toEqual(1);
        expect(wrapper.emitted().reponse[0][0]).toEqual({ reponse: 'exercice', succes: true });
      });
    });

    describe('quand je sélectionne un mot invalide', function () {
      it('emet une réponse invalide', function () {
        const lien = wrapper.findAll('.mot-cliquable').at(0);
        wrapper.vm.envoiReponse(lien.element);
        expect(wrapper.emitted().reponse.length).toEqual(1);
        expect(wrapper.emitted().reponse[0][0]).toEqual({ reponse: 'invalide', succes: false });
      });
    });
  });

  describe('#htmlTexteCliquable', function () {
    it('construit le html pour le texte cliquable en markdown', function () {
      expect(wrapper.vm.htmlTexteCliquable.trim()).toEqual(htmlAttendu);
    });
  });
});
