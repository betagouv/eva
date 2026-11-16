import { mount } from '@vue/test-utils';
import ConfirmationAbandon from 'accueil/vues/confirmation_abandon';

describe("La confirmation d'abandon", function () {
  let wrapper;

  beforeEach(function () {
    wrapper = mount(ConfirmationAbandon, {
      global: { mocks: { $traduction: (cle) => cle } }
    });
  });

  it("affiche le message d'abandon", function () {
    expect(wrapper.find('h2').html()).toContain('abandon.confirmation');
  });

  it('émet confirme au clic sur Oui', async function () {
    await wrapper.find('.confirme-bouton').trigger('click');
    expect(wrapper.emitted('confirme')).toHaveLength(1);
  });

  it('émet annule au clic sur Non', async function () {
    await wrapper.find('.annulation-bouton').trigger('click');
    expect(wrapper.emitted('annule')).toHaveLength(1);
  });
});
