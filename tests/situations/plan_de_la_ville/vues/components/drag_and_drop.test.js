import { mount } from '@vue/test-utils';

import GlisserDeposer from 'plan_de_la_ville/vues/components/drag_and_drop.vue';
import { CHANGEMENT_SELECTION } from 'commun/modeles/piece';
import { pourcentageX, pourcentageY } from 'commun/data/scene.js';

describe('glisser déposer', function () {
  let wrapper;
  let depotRessources;

  function composant () {
    return mount(GlisserDeposer, {
      shallow: true,
      global: {
        mocks: {
          $depotRessources: depotRessources,
          $traduction: () => {}
        }
      }
    });
  }

  beforeEach(function () {
    depotRessources = {
      egliseMaisonAPlacer: () => { return { src: 'maison.jpg' }; },
      emplacementEglise: () => { return { src: 'emplacement.jpg' }; }
    };
    wrapper = composant();
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

    describe('peut sélectionnée/dé-sélectionner la maison et la déplacer', function () {
      let deplaceSouris;

      beforeEach(function () {
        deplaceSouris = jest.spyOn(GlisserDeposer.methods, 'deplaceSouris');
        wrapper = composant();
      });

      afterEach(function () {
        deplaceSouris.mockReset();
      });

      it('à la souris', function () {
        expect(wrapper.vm.piece.estSelectionnee()).toBe(false);
        wrapper.find('.eglise-maison--a-placer').trigger('mousedown', { clientX: 95, clientY: 55 });
        expect(wrapper.vm.piece.estSelectionnee()).toBe(true);
        wrapper.find('.zone-deplacement').trigger('mousemove', { clientX: 0, clientY: 55 });
        expect(deplaceSouris).toHaveBeenCalledTimes(1);
        wrapper.find('.eglise-maison--a-placer').trigger('mouseup');
        expect(wrapper.vm.piece.estSelectionnee()).toBe(false);
      });

      it('au doight', function () {
        expect(wrapper.vm.piece.estSelectionnee()).toBe(false);
        wrapper.find('.eglise-maison--a-placer').trigger('touchstart', { changedTouches: [{ clientX: 95, clientY: 55 }] });
        expect(wrapper.vm.piece.estSelectionnee()).toBe(true);
        wrapper.find('.zone-deplacement').trigger('touchmove', { clientX: 0, clientY: 55 });
        expect(deplaceSouris).toHaveBeenCalledTimes(1);
        wrapper.find('.eglise-maison--a-placer').trigger('touchend');
        expect(wrapper.vm.piece.estSelectionnee()).toBe(false);
      });

      it("entoure d'un cercle bleu l'emplacement de l'église lorsque la maison est selectionnée", function () {
        const cercleBleu = wrapper.find('.cercle-bleu');
        expect(cercleBleu.classes('cercle-bleu--cache')).toBe(true);
        expect(cercleBleu.classes('cercle-bleu--visible')).toBe(false);
        wrapper.find('.eglise-maison--a-placer').trigger('mousedown', { clientX: 95, clientY: 55 });
        expect(wrapper.vm.piece.estSelectionnee()).toBe(true);
        expect(cercleBleu.classes('cercle-bleu--cache')).toBe(false);
        expect(cercleBleu.classes('cercle-bleu--visible')).toBe(true);
      });

      it("replace la pièce à sa position initiale", function () {
        expect(wrapper.vm.positionMaison).toEqual({ left: `${pourcentageX(480)}%`, top: `${pourcentageY(355)}%` });
        wrapper.vm.piece.changePosition({ x: 10, y: 20 });
        wrapper.find('.eglise-maison--a-placer').trigger('mouseup');
        expect(wrapper.vm.positionMaison).toEqual({ left: `${pourcentageX(480)}%`, top: `${pourcentageY(355)}%` });
      });
    });
  });
});
