import { shallowMount } from '@vue/test-utils';
import FormulaireRadio from 'securite/vues/formulaire_radio';

describe('Le composant FormulaireRadio', function () {
  let wrapper;

  describe("à l'ouverture initiale", function () {
    beforeEach(function () {
      wrapper = shallowMount(FormulaireRadio, {
        propsData: {
          question: {
            titre: 'question ?',
            options: [{ libelle: 'option1', valeur: 'valeur1' }, { libelle: 'option2', valeur: 'valeur2' }],
            bouton: 'Valider',
            submit: () => {},
            choix: ''
          }
        }
      });
    });

    it('affiche deux options', function () {
      expect(wrapper.findAll('input').length).toBe(2);
    });

    it("desactive le bouton suivant tant qu'aucun choix n'a été fait", function () {
      expect(wrapper.vm.desactivee).toBe(true);
      wrapper.find('input[type="radio"]').setChecked();
      expect(wrapper.vm.desactivee).toBe(false);
    });

    it("appelle la callback submit lorsque l'on soumet le formulaire", function (done) {
      wrapper.vm.question.submit = (choix) => {
        expect(choix).toEqual('valeur1');
        done();
      };
      wrapper.find('input[type="radio"]').setChecked();
      wrapper.trigger('submit');
    });
  });

  it("affiche le choix précédement effectué s'il est présent", function () {
    wrapper = shallowMount(FormulaireRadio, {
      propsData: {
        question: {
          titre: 'question ?',
          options: [{ libelle: 'option1', valeur: 'valeur1' }, { libelle: 'option2', valeur: 'valeur2' }],
          bouton: 'Valider',
          submit: () => {},
          choix: 'valeur1'
        }
      }
    });
    expect(wrapper.vm.choix).toBe('valeur1');
  });
});
