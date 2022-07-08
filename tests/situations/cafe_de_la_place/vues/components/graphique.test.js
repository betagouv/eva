import { shallowMount, createLocalVue } from '@vue/test-utils';

import Graphique from 'cafe_de_la_place/vues/components/graphique.vue';

describe('Le composant Graphique', function () {
  let question;
  let localVue;

  beforeEach(function () {
    question = {
      id: 1,
      reponse: {
        bonne_reponse: ['allemagne'],
        score: 1
      }
    };
    localVue = createLocalVue();
  });

  function composant (question) {
    return shallowMount(Graphique, {
      localVue,
      propsData: { question }
    });
  }

  it("Affiche les barres des pays", function () {
    const wrapper = composant(question);
    expect(wrapper.findAll('.graphique-barre--selectionnable').length).toEqual(7);
  });

  describe('quand je clique sur une barre du graphique', function () {
    it("ajoute la classe graphique-barre--selectionnee", function (done) {
      const wrapper = composant(question);
      expect(wrapper.find('.graphique-barre--selectionnee').exists()).toBe(false);
      const premiereBarre = wrapper.findAll('.graphique-barre--selectionnable').at(0);
      premiereBarre.find('input').setChecked();
      wrapper.vm.$nextTick(() => {
        expect(premiereBarre.classes()).toContain('graphique-barre--selectionnee');
        done();
      });
    });
  });

  describe("l'envoi de la réponse", function() {
    let wrapper;

    beforeEach(function () {
      wrapper = composant(question);
    });

    describe('quand je sélectionne un pays', function () {
      it('emet une réponse avec la sélection en cours', function (done) {
        const premiereBarre = wrapper.findAll('.graphique-barre--selectionnable').at(0);
        premiereBarre.find('input').setChecked();
        wrapper.vm.$nextTick(() => {
          expect(wrapper.emitted().reponse[0][0].reponse).toEqual(["allemagne"]);
          done();
        });
      });
    });

    describe('quand je déselectionne le dernier pays', function () {
      it("emet l'absence de réponse", function (done) {
        const premiereBarre = wrapper.findAll('.graphique-barre--selectionnable').at(0);
        premiereBarre.find('input').setChecked(true);
        premiereBarre.find('input').setChecked(false);
        wrapper.vm.$nextTick(() => {
          expect(wrapper.emitted().reponse[0][0]).toEqual(undefined);
          done();
        });
      });
    });
  });

  describe('#emetReponse', function() {
    let wrapper;

    beforeEach(function () {
      question = {
        id: 1,
        reponse: {
          bonne_reponse: ['allemagne', 'france'],
          score: 1
        }
      };
      wrapper = composant(question);
    });

    it("quand la réponse est bonne", function() {
      wrapper.vm.emetReponse(['allemagne', 'france']);
      expect(wrapper.emitted().reponse[0][0]).toEqual({
        reponse: ['allemagne', 'france'],
        succes: true,
        score: 1
      });
    });

    it("quand la réponse est bonne dans le désodre", function() {
      wrapper.vm.emetReponse(['france', 'allemagne']);
      expect(wrapper.emitted().reponse[0][0]).toEqual({
        reponse: ['france', 'allemagne'],
        succes: true,
        score: 1
      });
    });


    it("quand la réponse est fausse", function() {
      wrapper.vm.emetReponse(['belgique']);
      expect(wrapper.emitted().reponse[0][0]).toEqual({
        reponse: ['belgique'],
        succes: false
      });
    });

    it("quand la réponse est fausse sur le deuxième élément", function() {
      wrapper.vm.emetReponse(['allemagne', 'belgique']);
      expect(wrapper.emitted().reponse[0][0]).toEqual({
        reponse: ['allemagne', 'belgique'],
        succes: false
      });
    });

    it("quand la réponse est fausse avec trop de réponse", function() {
      wrapper.vm.emetReponse(['allemagne', 'france', 'belgique']);
      expect(wrapper.emitted().reponse[0][0]).toEqual({
        reponse: ['allemagne', 'france', 'belgique'],
        succes: false
      });
    });
  });
});
