import { shallowMount, createLocalVue } from '@vue/test-utils';
import FormulaireRadio from 'securite/vues/formulaire_radio';

describe('Le composant FormulaireRadio', function () {
  let wrapper;

  beforeEach(function () {
    const localVue = createLocalVue();
    wrapper = shallowMount(FormulaireRadio, {
      localVue,
      propsData: {
        question: {
          titre: 'question ?',
          options: [{ libelle: 'option1', valeur: '1' }, { libelle: 'option2', valeur: '2' }],
          bouton: 'Valider',
          click: () => {}
        }
      }
    });
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
