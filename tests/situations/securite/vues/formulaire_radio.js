import { shallowMount } from '@vue/test-utils';
import IdentificationDanger from 'securite/vues/identification_danger';

describe('Le composant IdentificationDanger', function () {
  let wrapper;

  beforeEach(function () {
    wrapper = shallowMount(IdentificationDanger);
  });

  it('affiche deux options', function () {
    expect(wrapper.findAll('input').length).to.equal(2);
  });

  it("desactive le bouton suivant tant qu'aucun choix n'a été fait", function () {
    expect(wrapper.vm.desactivee).to.be(true);
    wrapper.find('input[type="radio"]').setChecked();
    expect(wrapper.vm.desactivee).to.be(false);
  });
});
