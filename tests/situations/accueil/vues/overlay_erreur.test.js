import OverlayErreur from 'accueil/vues/overlay_erreur';
import { mount } from '@vue/test-utils';
import { traduction } from 'commun/infra/internationalisation';

describe('Le composant overlay erreur', function () {

  function composant (props = {}) {
    return mount(OverlayErreur, {
      shallow: true,
      global: {
        mocks: {
          $traduction: traduction
        }
      },
      props: {
        titre: 'titre',
        description: 'description',
        action: 'action',
        ...props
      }
    });
  }

  describe('quand il peut être ignoré', function () {
    it("affiche le bouton et envoi l'évènement ignore erreur", function (done) {
      const wrapper = composant({ boutonIgnorer: true });
      expect(wrapper.find('button').exists()).toBe(true);
      wrapper.find('button').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.emitted()).toHaveProperty('ignoreErreur');
        done();
      });
    });
  });

  describe('quand il ne peut pas être ignoré', function () {
    it("n'affiche pas le bouton", function () {
      const wrapper = composant({ boutonIgnorer: false });
      expect(wrapper.find('button').exists()).toBe(false);
    });
  });
});
