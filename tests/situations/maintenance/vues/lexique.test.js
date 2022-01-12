import { shallowMount, createLocalVue } from '@vue/test-utils';
import Lexique, { choixFrancais, choixPasFrancais } from 'maintenance/vues/lexique';
import EvenementIdentificationMot from 'maintenance/modeles/evenement_identification_mot';
import EvenementApparitionMot from 'maintenance/modeles/evenement_apparition_mot';
import MockDepotRessources from '../aides/mock_depot_ressources_maintenance';
import FlechesClavier from 'commun/vues/components/fleches_clavier';

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

  describe('sur ordinateur', function () {
    beforeEach(function () {
      wrapper.vm.estMobile = false;
    });

    it('affiche les touches du clavier', function () {
      expect(wrapper.findComponent(FlechesClavier).exists()).toBe(true);
    });

    it("N'affiche pas les boutons permettant de répondre à la souris", function () {
      expect(wrapper.find('button').exists()).toBe(false);
    });
  });

  describe('sur tablette', function () {
    beforeEach(function () {
      wrapper.vm.estMobile = true;
    });

    it('affiche les boutons permettant de répondre avec le doigt', function () {
      expect(wrapper.find('button').exists()).toBe(true);
      expect(wrapper.find('.touches-horizontales').exists()).toBe(false);
    });

    it("rajoute la classe action-fleches--animation sur le bouton de gauche pour le choix 'français'", function (done) {
      expect(wrapper.find('.bouton-arrondi:first-child').classes('actions-fleches--animation')).toBe(false);
      wrapper.vm.choixFait = choixFrancais;
      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('.bouton-arrondi:first-child').classes('actions-fleches--animation')).toBe(true);
        done();
      });
    });

    it("rajoute la classe action-fleches--animation sur le bouton de droite pour le choix 'pas francais' ", function (done) {
      expect(wrapper.find('.bouton-arrondi:last-child').classes('actions-fleches--animation')).toBe(false);
      wrapper.vm.choixFait = choixPasFrancais;

      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('.bouton-arrondi:last-child').classes('actions-fleches--animation')).toBe(true);
        done();
      });
    });

    it("enregistre l'événement identificationMot quand on touche le bouton de gauche", function (done) {
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

        wrapper.find('.bouton-arrondi:first-child').trigger('click');
      });
    });

    it("enregistre l'événement identificationMot quand on touche le bouton de droite", function (done) {
      wrapper.setProps({ lexique: [{ mot: 'premiermot', type: 'neutre' }, { mot: 'deuxiemot', type: 'neutre' }] });
      wrapper.vm.afficheMot();
      wrapper.vm.$nextTick(() => {
        localVue.prototype.$journal = {
          enregistre (evenement) {
            expect(evenement).toBeInstanceOf(EvenementIdentificationMot);
            expect(evenement.donnees()).toEqual({ mot: 'premiermot', type: 'neutre', reponse: choixPasFrancais });
            done();
          }
        };

        wrapper.find('.bouton-arrondi:last-child').trigger('click');
      });
    });
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
