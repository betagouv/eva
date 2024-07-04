import { shallowMount } from '@vue/test-utils';
import VueJauge from 'commun/vues/defi/jauge';
import { creeStore } from 'objets_trouves/modeles/store';

describe('La vue jauge', function () {
  let question;
  let store;
  let wrapper;

  beforeEach(function () {
    question = {
      choix: [
        {
          id: '475d3d22-00ac-4fe6-8e25-5a05a800b6d2',
          intitule: '1 : Pas du tout facile',
          nom_technique: 'bienvenue_pas_du_tout_facile'
        },
        {
          id: '2c178015-a7c1-4ff8-a344-8553a61e754a',
          intitule: '2 : Pas facile',
          nom_technique: 'bienvenue_pas_facile'
        },
        {
          id: '3c178015-a7c1-4ff8-a344-8553a61e754a',
          intitule: '3 : facile',
          nom_technique: 'bienvenue_facile'
        }
      ]
    };
    const depotRessources = new class {
      existeMessageAudio () {
        return true;
      }
    }();
    store = creeStore();
    wrapper = shallowMount(VueJauge, {
      props: {
        question
      },
      global: {
        plugins: [store],
        mocks: {
          $depotRessources: depotRessources
        }
      }
    });
  });

  it('affiche une jauge', function () {
    expect(wrapper.find('.jauge-conteneur').exists()).toBe(true);
    expect(wrapper.find('.jauge input').exists()).toBe(true);
    const labels = wrapper.findAll('.label-libelle');
    expect(labels.length).toEqual(3);
    expect(labels.at(0).attributes('id')).toEqual('3c178015-a7c1-4ff8-a344-8553a61e754a');
    expect(labels.at(0).text()).toEqual('3 : facile');
  });

  it('affiche la jauge au millieu au démarrage', function () {
    expect(wrapper.vm.choixFait).toEqual(1);
    const labels = wrapper.findAll('.jauge-labels li');
    expect(labels.at(0).classes('selected')).toBe(false);
    expect(labels.at(1).classes('selected')).toBe(true);
    expect(labels.at(2).classes('selected')).toBe(false);
  });

  it('met à jour choixFait quand on selection la jauge', function () {
    wrapper.find('.jauge input').setValue(2);
    expect(wrapper.vm.choixFait).toEqual(2);
  });

  it('met à jour la jauge quand on clique sur un label', function () {
    wrapper.find('.label-libelle').trigger('click');
    expect(wrapper.vm.choixFait).toEqual(2);
  });

  it('emet le choix de la jauge quand on clique sur un label', function (done) {
    wrapper.find('.label-libelle').trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('reponse')[0])
        .toEqual([{ reponse: '3c178015-a7c1-4ff8-a344-8553a61e754a', reponseIntitule: '3 : facile' }]);
      done();
    });
  });

  it('emet le choix de la jauge quand on utilise la jauge', function (done) {
    wrapper.find('.jauge input').setValue(2);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('reponse')[0])
        .toEqual([{ reponse: '3c178015-a7c1-4ff8-a344-8553a61e754a', reponseIntitule: '3 : facile' }]);
      done();
    });
  });

  it('calcule la taille et la position du curseur', function () {
    expect(wrapper.vm.styleCurseur.width).toEqual('1.5rem');
    expect(wrapper.vm.styleCurseur.height).toEqual('1.5rem');
    expect(wrapper.vm.styleCurseur.left).toEqual('2.75rem');

    wrapper.vm.choixFait = 0;
    expect(wrapper.vm.styleCurseur.bottom).toEqual('-0.25rem');
    wrapper.vm.choixFait = 1;
    expect(wrapper.vm.styleCurseur.bottom).toEqual('6.5rem');
    wrapper.vm.choixFait = 2;
    expect(wrapper.vm.styleCurseur.bottom).toEqual('13.25rem');
  });

  it("crée une balise pour l'affichage du pourcentage de la jauge", function () {
    expect(wrapper.vm.jaugeStyle.textContent).toEqual('.jauge input::-webkit-slider-runnable-track {background: linear-gradient(to top, #9ADBD0 0%, #9ADBD0 50%, #d6daec 50%, #d6daec 100%)}.jauge input::-moz-range-track {background: linear-gradient(to top, #9ADBD0 0%, #9ADBD0 50%, #d6daec 50%, #d6daec 100%)}.jauge input::-ms-track {background: linear-gradient(to top, #9ADBD0 0%, #9ADBD0 50%, #d6daec 50%, #d6daec 100%)}');
  });
});
