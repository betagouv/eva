import OverlayErreurEnregistrement from 'commun/vues/overlay_erreur_enregistrement';
import { mount } from '@vue/test-utils';

describe("Le composant overlay d'erreur d'enregistrement", function () {
  function composant () {
    return mount(OverlayErreurEnregistrement, {
      global: {
        mocks: {
          $traduction: (cle) => cle
        }
      },
      props: {
        relance: () => {}
      }
    });
  }

  it("affiche l'icône d'alerte du DSFR dans le titre", function () {
    const icone = composant().find('.titre-erreur-enregistrement .fr-icon-error-warning-fill');
    expect(icone.exists()).toBe(true);
    expect(icone.attributes('aria-hidden')).toBe('true');
  });
});
