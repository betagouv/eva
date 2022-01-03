import { shallowMount, createLocalVue } from '@vue/test-utils';

import GlisserDeposer from 'plan_de_la_ville/vues/components/drag_and_drop.vue';
import { CHANGEMENT_SELECTION } from 'commun/modeles/piece';
import { pourcentageX } from 'commun/data/scene.js';

describe('glisser déposer', function () {
  let wrapper;

  beforeEach(function () {
    const localVue = createLocalVue();
    localVue.prototype.$traduction = () => {};
    localVue.prototype.$depotRessources = {
      egliseMaisonAPlacer: () => { return { src: 'maison.jpg' }; }
    };
    wrapper = shallowMount(GlisserDeposer, { localVue });
  });

  describe('#positionMaison', function () {
    it('affiche la maison à déplacer', function () {
      wrapper.vm.piece.changePosition({ x: 10, y: 20 });
      expect(wrapper.vm.positionMaison).toEqual({ left: '10%', top: '20%' });
    });
  });

  describe("détecte la dépose sur l'emplacement cible", function () {
    it("n'émet pas d'évènement quand on dépose à côté", function () {
      wrapper.vm.piece.emit(CHANGEMENT_SELECTION, false);
      expect(wrapper.emitted()).toEqual({});
    });

    it("émet l'évènement 'action' quand on dépose dessus", function () {
      wrapper.vm.piece.changePosition(wrapper.vm.emplacementCible.position());
      wrapper.vm.piece.emit(CHANGEMENT_SELECTION, false);
      expect(wrapper.emitted()).toHaveProperty('action');
    });

    it("émet l'évènement 'action' même si on dépose un peu à coté", function () {
      const nouvellePosition = wrapper.vm.emplacementCible.position();
      nouvellePosition.x -= pourcentageX(25);
      wrapper.vm.piece.changePosition(nouvellePosition);
      wrapper.vm.piece.emit(CHANGEMENT_SELECTION, false);
      expect(wrapper.emitted()).toHaveProperty('action');
    });
  });
});
