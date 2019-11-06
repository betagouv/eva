import { shallowMount } from '@vue/test-utils';
import FenetreAide, { FERME } from 'commun/vues/fenetre_aide';

describe("La fenêtre d'aide", function () {
  let wrapper;

  beforeEach(function () {
    wrapper = shallowMount(FenetreAide, {
      propsData: {
        contexte: ''
      }
    });
  });

  it('au click sur le bouton, envoi un événement', function () {
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted(FERME).length).to.eql(1);
  });
});
