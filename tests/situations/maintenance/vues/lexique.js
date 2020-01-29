import { shallowMount, createLocalVue } from '@vue/test-utils';
import Lexique from 'maintenance/vues/lexique';
import MockDepotRessources from '../aides/mock_depot_ressources_maintenance';

describe('La vue de la Maintenance', function () {
  let wrapper;
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$depotRessources = new MockDepotRessources();
    wrapper = shallowMount(Lexique, {
      localVue,
      propsData: {
        lexique: ['ballon', 'douermatho', 'saumon']
      },
      methods: { motSuivantAvecDelai () {} }
    });
  });

  it('affiche la croix de fixation', function () {
    wrapper.vm.affichePointDeFixation();
    expect(wrapper.findAll('.croix').length).to.eql(1);
  });

  it('affiche le mot', function () {
    wrapper.vm.afficheMot();
    expect(wrapper.findAll('.croix').length).to.eql(0);
    expect(wrapper.find('.mot').text()).to.eql('ballon');
  });

  it('empêche de passer au mot suivant tant que la croix est affichée', function () {
    let appelAMotSuivant = 0;
    wrapper.setMethods({ motSuivantAvecDelai () { appelAMotSuivant++; } });
    wrapper.vm.affichePointDeFixation();
    wrapper.trigger('keydown.left');
    expect(wrapper.findAll('.croix').length).to.eql(1);
    expect(appelAMotSuivant).to.eql(0);
  });

  it("terminer est à true lorsque l'on a vu tout les mots", function () {
    expect(wrapper.vm.termine).to.be(false);
    wrapper.vm.afficheMot();
    wrapper.vm.afficheMot();
    expect(wrapper.emitted('terminer')).to.be(undefined);
    wrapper.vm.afficheMot();
    expect(wrapper.vm.termine).to.be(true);
    expect(wrapper.emitted('terminer')).to.be(undefined);
    wrapper.vm.motSuivant();
    expect(wrapper.emitted('terminer').length).to.eql(1);
  });
});
