import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueEcranTelephoneVerouillage from 'objets_trouves/vues/ecran-telephone-deverrouillage';
import Heure from 'objets_trouves/vues/heure';

describe("L'écran du telephone quand on veut le déverrouiller", function () {
  let wrapper;
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$traduction = () => { };
    localVue.prototype.$depotRessources = {
      iconeDeverrouillageDebloque: () => {
        return {
          src: 'chemin-icone'
        };
      }
    };

    wrapper = shallowMount(VueEcranTelephoneVerouillage, {
      localVue
    });
  });

  it("affiche l'heure", function () {
    expect(wrapper.findComponent(Heure).exists()).toBe(true);
  });

  it("affiche l'icone deverouillée", function () {
    const icone = wrapper.find('.icone');
    expect(icone.classes('icone--deverrouillee')).toBe(true);
    expect(icone.classes('icone--deverrouillage')).toBe(true);
    expect(icone.attributes('style')).toBe('background-image: url(chemin-icone);');
  });
});
