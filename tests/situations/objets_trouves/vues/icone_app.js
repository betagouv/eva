import { shallowMount, createLocalVue } from '@vue/test-utils';
import { traduction } from 'commun/infra/internationalisation';
import IconeApp from 'objets_trouves/vues/icone_app';

describe("Les propriétés d'une app", function () {
  let wrapper;
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$traduction = traduction;
    wrapper = shallowMount(IconeApp, {
      localVue,
      propsData: {
        apps: {
          agenda: {
            0: {
              couleur: 'white',
              icone: 'icon-agenda'
            }
          }
        },
        app: 'agenda',
        desactivee: false
      }
    });
  });

  it("affiche la couleur et l'icone", function () {
    const icone = wrapper.find('.icone');
    expect(icone.attributes('style')).to.equal('background-color: white; background-image: url(icon-agenda);');
  });
});
