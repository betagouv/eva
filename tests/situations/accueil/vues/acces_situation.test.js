import { mount, createLocalVue } from '@vue/test-utils';
import AccesSituation from 'accueil/vues/acces_situation.vue';

describe('La vue pour accéder à une situation', function () {
  let depotRessources;
  let wrapper;
  let localVue;
  let existeBatiment;
  let optionsMount;

  beforeEach(function () {
    localVue = createLocalVue();
    depotRessources = new class {
      existeBatimentSituation (identifiant) {
        return existeBatiment;
      }

      batimentSituation (identifiant) {
        return { src: identifiant };
      }
    }();
    optionsMount = {
      localVue,
      propsData: {
        situation: {
          nom: 'ABC',
          chemin: 'abc.html',
          identifiant: 'identifiant-abc',
          niveauMinimum: 2,
          action: () => {}
        },
        desactivee: false
      }
    };
    localVue.prototype.$depotRessources = depotRessources;
  });

  it("sait s'afficher avec un fond", function () {
    existeBatiment = true;
    optionsMount.propsData.afficheFond = true;
    wrapper = mount(AccesSituation, optionsMount);
    expect(wrapper.text()).toEqual('ABC');
    expect(wrapper.attributes('href')).toBe('abc.html');
    expect(wrapper.attributes('style')).toBe('background-image: url(identifiant-abc);');
  });

  it("N'affiche pas le fond s'il n'existe pas, même s'il est demandé", function () {
    existeBatiment = false;
    optionsMount.propsData.afficheFond = true;
    wrapper = mount(AccesSituation, optionsMount);

    expect(wrapper.text()).toEqual('ABC');
    expect(wrapper.attributes('href')).toBe('abc.html');
    expect(wrapper.attributes('style')).toBe(undefined);
  });

  it("sait s'afficher sans fond", function () {
    existeBatiment = true;
    optionsMount.propsData.afficheFond = false;
    wrapper = mount(AccesSituation, optionsMount);
    expect(wrapper.text()).toEqual('ABC');
    expect(wrapper.attributes('href')).toBe('abc.html');
    expect(wrapper.attributes('style')).toBe(undefined);
  });
});
