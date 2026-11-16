import { mount } from '@vue/test-utils';
import FenetreModale from 'commun/vues/fenetre_modale';

describe('La fenêtre modale', function () {
  function fenetre (props = {}) {
    return mount(FenetreModale, {
      props: { titre: 'titre', boutonOk: 'OK', ...props }
    });
  }

  it('affiche le titre et le bouton OK', function () {
    const wrapper = fenetre();
    expect(wrapper.find('h2').text()).toBe('titre');
    expect(wrapper.find('.bouton-ok').text()).toBe('OK');
  });

  it('interprète le HTML du titre et du message', function () {
    const wrapper = fenetre({ titre: 'ligne 1<br>ligne 2', message: '<strong>important</strong>' });
    expect(wrapper.find('h2 br').exists()).toBe(true);
    expect(wrapper.find('p strong').text()).toBe('important');
  });

  it("n'affiche ni message ni bouton annuler par défaut", function () {
    const wrapper = fenetre();
    expect(wrapper.find('p').exists()).toBe(false);
    expect(wrapper.find('.bouton-annuler').exists()).toBe(false);
  });

  it('émet ok au clic sur le bouton OK', async function () {
    const wrapper = fenetre();
    await wrapper.find('.bouton-ok').trigger('click');
    expect(wrapper.emitted('ok')).toHaveLength(1);
  });

  it('émet annule au clic sur le bouton annuler', async function () {
    const wrapper = fenetre({ boutonAnnuler: 'Annuler' });
    expect(wrapper.find('.bouton-annuler').text()).toBe('Annuler');
    await wrapper.find('.bouton-annuler').trigger('click');
    expect(wrapper.emitted('annule')).toHaveLength(1);
  });
});
