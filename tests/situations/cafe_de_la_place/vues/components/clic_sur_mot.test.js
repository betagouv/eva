import { mount } from '@vue/test-utils';
import Vuex from 'vuex';

import ClicSurMots from 'cafe_de_la_place/vues/components/clic_sur_mots.vue';

const htmlAttendu = `<ul>
<li><a href="">invalide</a></li>
<li><a href="">exercice</a></li>
</ul>`;

describe('Le composant Clic Sur Mots', function () {
  let question;
  let wrapper;
  let store;

  function composant (props = {}) {
    return mount(ClicSurMots, {
      shallow: true,
      global: {
        plugins: [store]
      },
      props: props
    });
  }

  describe('#htmlTexteCliquable', function () {
    beforeEach(function () {
      store = new Vuex.Store({ getters: { texteCliquable () { return '* [invalide]()\n* [exercice]()';}}});
      question = { id: 1 };
      wrapper = composant({ question });
    });

    it('construit le html pour le texte cliquable en markdown', function () {
      expect(wrapper.vm.htmlTexteCliquable.trim()).toEqual(htmlAttendu);
    });
  });

  describe("quand il n'y a qu'une seule réponse possible", function () {
    beforeEach(function () {
      store = new Vuex.Store({ getters: { texteCliquable () { return '* [invalide]()\n* [exercice]()';}}});
      question = { id: 1, reponse: { texte: 'exercice' }, score: 1, nom_technique: 'question1' };
      wrapper = composant({ question });
    });

    describe('#metAJourSelection', function () {
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
          expect(wrapper.emitted().reponse[0][0]).toEqual({ reponse: 'exercice', succes: true, score: 1, scoreMax: 1 });
        });
      });

      describe('quand je sélectionne un mot invalide', function () {
        it('emet une réponse invalide', function () {
          const lien = wrapper.findAll('.mot-cliquable').at(0);
          wrapper.vm.envoiReponse(lien.element);
          expect(wrapper.emitted().reponse.length).toEqual(1);
          expect(wrapper.emitted().reponse[0][0]).toEqual({ reponse: 'invalide', succes: false, score: 0, scoreMax: 1 });
        });
      });
    });
  });

  describe("quand il y a plusieurs réponses possibles", function () {
    beforeEach(function () {
      store = new Vuex.Store({ getters: { texteCliquable () { return '* [reponse1]()\n* [reponse2]()';}}});
      question = {
        id: 1,
        reponses_multiples: true,
        reponse: { bonne_reponse: ['reponse2']},
        nom_technique: 'question1',
        score: 1
      };
      wrapper = composant({ question });
    });

    describe('#metAJourSelectionMultiple', function () {
      it("ajoute la classe mot-cliquable--selectionne", function (done) {
        const lien = wrapper.findAll('.mot-cliquable').at(0);
        const lien2 = wrapper.findAll('.mot-cliquable').at(1);
        expect(lien.classes('mot-cliquable--selectionne')).toBe(false);
        lien.trigger('click');
        wrapper.vm.$nextTick(() => {
          expect(lien.classes('mot-cliquable--selectionne')).toBe(true);
          lien2.trigger('click');
          wrapper.vm.$nextTick(() => {
            expect(lien.classes('mot-cliquable--selectionne')).toBe(true);
            expect(lien2.classes('mot-cliquable--selectionne')).toBe(true);
            lien2.trigger('click');
            wrapper.vm.$nextTick(() => {
              expect(lien.classes('mot-cliquable--selectionne')).toBe(true);
              expect(lien2.classes('mot-cliquable--selectionne')).toBe(false);
              done();
            });
          });
        });
      });
    });

    describe('#envoiReponse', function () {
      describe('quand je sélectionne les bons mots', function () {
        it('emet une réponse valide', function (done) {
          const liens = wrapper.findAll('.mot-cliquable');
          liens.at(1).trigger('click');
          wrapper.vm.$nextTick(() => {
            expect(wrapper.emitted().reponse.length).toEqual(1);
            expect(wrapper.emitted().reponse[0][0]).toEqual({ reponse: ['reponse2'], succes: true, score: 1, scoreMax: 1 });
            done();
          });
        });
      });

      describe('quand je sélectionne un mot invalide', function () {
        it('emet une réponse invalide', function (done) {
          const liens = wrapper.findAll('.mot-cliquable');
          liens.at(0).trigger('click');
          wrapper.vm.$nextTick(() => {
            expect(wrapper.emitted().reponse.length).toEqual(1);
            expect(wrapper.emitted().reponse[0][0]).toEqual({ reponse: ['reponse1'], succes: false, score: 0, scoreMax: 1 });
            done();
          });
        });
      });

      describe("quand je de-sélectionne et que je n'ai plus aucun mot selectionné", function () {
        it('emet une réponse invalide', function () {
          const liens = wrapper.findAll('.mot-cliquable');
          wrapper.vm.envoiReponseMultiple(liens.map(lien => lien.element));
          expect(wrapper.emitted().reponse.length).toEqual(1);
          expect(wrapper.emitted().reponse[0][0]).toEqual(undefined);
        });
      });
    });

  });
});
