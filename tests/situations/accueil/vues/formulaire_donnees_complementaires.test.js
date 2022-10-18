import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Formulaire from 'accueil/vues/formulaire_donnees_complementaires';
import { traduction } from 'commun/infra/internationalisation';

describe("Le formulaire des données complementaires", function () {
  let wrapper;
  let store;
  let localVue;
  let storeDispatch;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$traduction = traduction;
    store = new Vuex.Store({
      state: {
        nom: 'un nom'
      }
    });
    storeDispatch = jest.spyOn(store, 'dispatch')
      .mockImplementation(() => { return Promise.resolve(); });
    wrapper = mount(Formulaire, {
      store,
      localVue
    });
  });

  function derouleMenu (donnee) {
    wrapper
      .find(`[id='formulaire-donnee_sociodemographique.${donnee}']`)
      .find('.vs__dropdown-toggle')
      .trigger('mousedown');
  }

  it("s'affiche", function () {
    expect(wrapper.find('h2').text()).toEqual('accueil.donnee_sociodemographique.titre{"nom":"un nom"}');
    expect(wrapper.exists('form')).toBe(true);
    expect(wrapper.exists('label')).toBe(true);
    expect(wrapper.findAll('input[type=number]').length).toEqual(1);
    expect(wrapper.find('input[type=number]').classes()).toContain('champ-age');
    expect(wrapper.findAll('.v-select').length).toEqual(3);
    expect(wrapper.findAll('.bouton-sociodemographique').length).toEqual(1);
  });

  it('Les options doivent être mis à jour coté serveur si elles sont modifiées', function() {
    expect(wrapper.vm.genres).toEqual([
      'Homme',
      'Femme',
      'Autre genre'
    ]);
    expect(wrapper.vm.niveaux_etude).toEqual([
      'Niveau Collège',
      'Niveau CFG / DNB (BEPC)',
      'Niveau CAP / BEP',
      'Niveau Bac',
      'Niveau Bac +2',
      'Supérieur Bac +2'
    ]);
    expect(wrapper.vm.situations).toEqual([
      'Scolarisation',
      'Formation professionnelle',
      'Alternance',
      'Emploi',
      'Sans emploi'
    ]);
  });

  it("peut selectionner une valeur dans un select", function (done) {
    const inputGenre = wrapper.find("[id='formulaire-donnee_sociodemographique.genre']");
    derouleMenu('genre');
    wrapper.vm.$nextTick(() => {  
      inputGenre
        .findAll('.vs__dropdown-option')
        .at(0)
        .trigger('click');
      wrapper.vm.$nextTick(() => {  
        expect(inputGenre
          .find('.vs__selected').text()).toBe('Homme');
        expect(wrapper.vm.genre).toEqual('Homme');
        done();
      });
    });
  });

  it("enregistre les données saisies", async () => {
    wrapper.find('.champ-age').setValue(30);
    derouleMenu('dernier_niveau_etude');

    await wrapper.vm.$nextTick();

    wrapper
      .find("[id='formulaire-donnee_sociodemographique.dernier_niveau_etude']")
      .findAll('.vs__dropdown-option')
      .at(0)
      .trigger('click');
    derouleMenu('genre');

    await wrapper.vm.$nextTick();

    wrapper
      .find("[id='formulaire-donnee_sociodemographique.genre']")
      .findAll('.vs__dropdown-option')
      .at(0)
      .trigger('click');
    derouleMenu('derniere_situation');

    await wrapper.vm.$nextTick();

    wrapper
      .find("[id='formulaire-donnee_sociodemographique.derniere_situation']")
      .findAll('.vs__dropdown-option')
      .at(0)
      .trigger('click');
    wrapper.vm.envoieFormulaire();
    await wrapper.vm.$nextTick();
    expect(storeDispatch).toHaveBeenNthCalledWith(1, 'enregistreDonneesComplementaires', {
      "donnee_sociodemographique_attributes": {
        "age": "30",
        "genre": 'Homme',
        "dernier_niveau_etude": 'Niveau Collège',
        "derniere_situation": 'Scolarisation'
      }
    });
  });
});
