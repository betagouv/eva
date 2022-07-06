import { shallowMount, createLocalVue } from '@vue/test-utils';

import Graphique from 'cafe_de_la_place/vues/components/graphique.vue';

describe('Le composant Graphique', function () {
  let question;
  let localVue;

  beforeEach(function () {
    question = { id: 1 };
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
          expect(wrapper.emitted().reponse[0][0]).toEqual({"reponse": ["allemagne"]});
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
});
