import { mount } from '@vue/test-utils';
import AccesSituation from 'accueil/vues/acces_situation.vue';

describe('La vue pour accéder à une situation', function () {
  let depotRessources;
  let wrapper;
  let existeBatiment;
  let optionsMount;

  beforeEach(function () {
    depotRessources = new class {
      existeBatimentSituation () {
        return existeBatiment;
      }

      batimentSituation (identifiant) {
        return { src: identifiant };
      }
    }();
    optionsMount = {
      global: {
        mocks: {
          $depotRessources: depotRessources
        }
      },
      props: {
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
  });

  it("sait s'afficher avec un fond", function () {
    existeBatiment = true;
    optionsMount.props.afficheFond = true;
    wrapper = mount(AccesSituation, optionsMount);
    expect(wrapper.text()).toEqual('ABC');
    expect(wrapper.attributes('href')).toBe('/jeu/abc.html');
    expect(wrapper.attributes('style')).toBe('background-image: url(identifiant-abc);');
  });

  it("N'affiche pas le fond s'il n'existe pas, même s'il est demandé", function () {
    existeBatiment = false;
    optionsMount.props.afficheFond = true;
    wrapper = mount(AccesSituation, optionsMount);

    expect(wrapper.text()).toEqual('ABC');
    expect(wrapper.attributes('href')).toBe('/jeu/abc.html');
    expect(wrapper.attributes('style')).toBe(undefined);
  });

  it("sait s'afficher sans fond", function () {
    existeBatiment = true;
    optionsMount.props.afficheFond = false;
    wrapper = mount(AccesSituation, optionsMount);
    expect(wrapper.text()).toEqual('ABC');
    expect(wrapper.attributes('href')).toBe('/jeu/abc.html');
    expect(wrapper.attributes('style')).toBe(undefined);
  });

  it("N'a pas d'href pour le batiment Resultat", function () {
    optionsMount.props.situation.chemin = undefined;
    wrapper = mount(AccesSituation, optionsMount);
    expect(wrapper.attributes('href')).toBe(undefined);
  });
});
