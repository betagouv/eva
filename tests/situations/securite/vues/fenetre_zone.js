import { shallowMount, createLocalVue } from '@vue/test-utils';
import FenetreZone from 'securite/vues/fenetre_zone';
import FormulaireRadio from 'securite/vues/formulaire_radio';

describe('Le composant FenetreZone', function () {
  let wrapper;

  beforeEach(function () {
    const localVue = createLocalVue();
    wrapper = shallowMount(FenetreZone, {
      localVue,
      propsData: {
        zone: {}
      }
    });
  });

  it("affiche le formulaire pour dire si c'est un danger ou non", function () {
    expect(wrapper.contains(FormulaireRadio)).to.be(true);
  });

  it('définis la position bottom à partir des infos de la zone', function () {
    wrapper.setProps({ zone: { y: 70, r: 3 } });
    expect(wrapper.vm.bottom).to.eql('32.1%');
  });

  it('définis la position à partir des infos de la zone', function () {
    wrapper.setProps({ zone: { x: 4, r: 1 } });
    expect(wrapper.vm.left).to.eql('4.7%');
    expect(wrapper.vm.right).to.eql(undefined);
  });

  it('définis la position pour mettre la boite a gauche la zone', function () {
    wrapper.setProps({ zone: { x: 80, r: 1 } });
    expect(wrapper.vm.left).to.eql(undefined);
    expect(wrapper.vm.right).to.eql('20.7%');
  });
});
