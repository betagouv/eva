import { mount } from '@vue/test-utils';
import Lexique from 'maintenance/vues/lexique';
import { traduction } from 'commun/infra/internationalisation';
import EvenementIdentificationMot from 'maintenance/modeles/evenement_identification_mot';
import EvenementApparitionMot from 'maintenance/modeles/evenement_apparition_mot';
import MockDepotRessources from '../aides/mock_depot_ressources_maintenance';
import ChoixBidirectionnel from 'commun/vues/components/choix_bidirectionnel';

describe('La vue lexique de la Maintenance', function () {
  let wrapper;
  let journal = { enregistre () {} };

  beforeEach(function () {
    wrapper = mount(Lexique, {
      shallow: true,
      global: {
        mocks: {
          $depotRessources: new MockDepotRessources(),
          $traduction: traduction,
          $journal: journal
        }
      },
      props: {
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
      done();
    });
  });

  it("emet terminer lorsque l'on a vu tout les mots", function (done) {
    expect(wrapper.vm.termine).toBe(false);
    wrapper.vm.prepareMotSuivant();
    wrapper.vm.prepareMotSuivant();
    expect(wrapper.emitted('terminer')).toBe(undefined);
    wrapper.vm.prepareMotSuivant();
    expect(wrapper.vm.termine).toBe(true);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('terminer').length).toEqual(1);
      done();
    });
  });

  it('affiche le composant de choix', function () {
    expect(wrapper.findComponent(ChoixBidirectionnel).exists()).toBe(true);
  });

  it("enregistre l'événement identificationMot", function (done) {
    wrapper.setProps({ lexique: [{ mot: 'premiermot', type: 'neutre' }, { mot: 'deuxiemot', type: 'neutre' }] });
    wrapper.vm.afficheMot();
    wrapper.vm.$nextTick(() => {
      journal.enregistre = (evenement) => {
        expect(evenement).toBeInstanceOf(EvenementIdentificationMot);
        expect(evenement.donnees()).toEqual({ mot: 'premiermot', type: 'neutre', reponse: 'reponse' });
        done();
      };
      wrapper.vm.enregistreReponse('reponse');
    });
  });

  it("enregistre l'événement apparitionMot", function (done) {
    journal.enregistre = (evenement) => {
      expect(evenement).toBeInstanceOf(EvenementApparitionMot);
      expect(evenement.donnees()).toEqual({ mot: 'ballon', type: '' });
      done();
    };
    wrapper.vm.afficheMot();
  });
});
