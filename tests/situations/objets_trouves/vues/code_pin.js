import { shallowMount, createLocalVue } from '@vue/test-utils';
import { traduction } from 'commun/infra/internationalisation';
import CodePin from 'objets_trouves/vues/code_pin';
import Heure from 'objets_trouves/vues/heure';
import IconeApp from 'objets_trouves/vues/icone_app';

describe('Le code pin', function () {
  let wrapper;
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$traduction = traduction;
    wrapper = shallowMount(CodePin, {
      localVue,
      propsData: {
        question: {
          intitule: 'Intitulé',
          question: 'Question ?'
        },
        desactivee: false
      }
    });
  });

  it("affiche l'heure et l'icone déverouiller", function () {
    expect(wrapper.contains(Heure)).to.be(true);
    expect(wrapper.contains(IconeApp)).to.be(true);
  });

  it('affiche la question', function () {
    expect(wrapper.find('.codepin-explication').text()).to.eql('Intitulé');
    expect(wrapper.find('.codepin-question').text()).to.eql('Question ?');
  });
});
