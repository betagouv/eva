import { mount } from '@vue/test-utils';
import FenetreAide, { FERME } from 'commun/vues/fenetre_aide';
import { traduction } from 'commun/infra/internationalisation';

describe("La fenêtre d'aide", function () {
  let wrapper;

  beforeEach(function () {
    wrapper = mount(FenetreAide, {
      props: {
        contexte: ''
      },
      global: {
        mocks: {
          $traduction: traduction
        }
      }
    });
  });

  it('au click sur le bouton, envoi un événement', function () {
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted(FERME).length).toEqual(1);
  });
});
