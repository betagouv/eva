import { shallowMount, createLocalVue } from '@vue/test-utils';
import Lexique, { choixFrancais } from 'maintenance/vues/lexique';
import EvenementIdentificationMot from 'maintenance/modeles/evenement_identification_mot';
import EvenementApparitionMot from 'maintenance/modeles/evenement_apparition_mot';
import MockDepotRessources from '../aides/mock_depot_ressources_maintenance';
import ChoixBidirectionnel from 'commun/vues/components/choix_bidirectionnel';

describe('La vue lexique de la Maintenance', function () {
  let wrapper;
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$depotRessources = new MockDepotRessources();
    localVue.prototype.$traduction = (key) => { return key; };
    localVue.prototype.$journal = { enregistre () {} };
    wrapper = shallowMount(Lexique, {
      localVue,
      propsData: {
        lexique: [{ mot: 'ballon', type: '' }, { mot: 'douermatho', type: '' }, { mot: 'saumon', type: '' }]
      }
    });
  });

  it('affiche la croix de fixation', function (done) {
    wrapper.vm.affichePointDeFixation();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.croix').length).toEqual(1);
      done();
    });
  });

  it('affiche le mot', function (done) {
    wrapper.vm.afficheMot();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.croix').length).toEqual(0);
      expect(wrapper.find('.mot').text()).toEqual('ballon');
      done();
    });
  });

  it('empêche de passer au mot suivant tant que la croix est affichée', function (done) {
    wrapper.vm.affichePointDeFixation();
    wrapper.trigger('keydown.left');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.croix').length).toEqual(1);
      expect(wrapper.vm.choixFait).toBe(null);
      done();
    });
  });

  it("terminer est à true lorsque l'on a vu tout les mots", function () {
    expect(wrapper.vm.termine).toBe(false);
    wrapper.vm.afficheMot();
    wrapper.vm.afficheMot();
    expect(wrapper.emitted('terminer')).toBe(undefined);
    wrapper.vm.afficheMot();
    expect(wrapper.vm.termine).toBe(true);
    expect(wrapper.emitted('terminer')).toBe(undefined);
    wrapper.vm.enregistreReponse(choixFrancais);
    expect(wrapper.emitted('terminer').length).toEqual(1);
  });

  it('affiche le composant de choix', function () {
    expect(wrapper.findComponent(ChoixBidirectionnel).exists()).toBe(true);
  });

  it("enregistre l'événement identificationMot", function (done) {
    wrapper.setProps({ lexique: [{ mot: 'premiermot', type: 'neutre' }, { mot: 'deuxiemot', type: 'neutre' }] });
    wrapper.vm.afficheMot();
    wrapper.vm.$nextTick(() => {
      localVue.prototype.$journal = {
        enregistre (evenement) {
          expect(evenement).toBeInstanceOf(EvenementIdentificationMot);
          expect(evenement.donnees()).toEqual({ mot: 'premiermot', type: 'neutre', reponse: choixFrancais });
          done();
        }
      };
      wrapper.vm.enregistreReponse(choixFrancais);
    });
  });

  it("enregistre l'événement apparitionMot", function (done) {
    localVue.prototype.$journal = {
      enregistre (evenement) {
        expect(evenement).toBeInstanceOf(EvenementApparitionMot);
        expect(evenement.donnees()).toEqual({ mot: 'ballon', type: '' });
        done();
      }
    };
    wrapper.vm.afficheMot();
  });
});
