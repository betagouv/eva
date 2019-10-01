import { shallowMount } from '@vue/test-utils';
import FormulaireRadio from 'securite/vues/formulaire_radio';

describe('Le composant FormulaireRadio', function () {
  let wrapper;

  beforeEach(function () {
    wrapper = shallowMount(FormulaireRadio, {
      propsData: {
        question: {
          titre: 'question ?',
          options: [{ libelle: 'option1', valeur: 'valeur1' }, { libelle: 'option2', valeur: 'valeur2' }],
          bouton: 'Valider',
          submit: () => {}
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

  it("appelle la callback submit lorsque l'on soumet le formulaire", function (done) {
    wrapper.vm.question.submit = (choix) => {
      expect(choix).to.eql('valeur1');
      done();
    };
    wrapper.find('input[type="radio"]').setChecked();
    wrapper.trigger('submit');
  });
});
