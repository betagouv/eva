import { shallowMount, createLocalVue } from '@vue/test-utils';
import Lexique, { CHOIX_FRANCAIS } from 'maintenance/vues/lexique';
import EvenementIdentificationMot from 'maintenance/modeles/evenement_identification_mot';
import EvenementApparitionMot from 'maintenance/modeles/evenement_apparition_mot';
import MockDepotRessources from '../aides/mock_depot_ressources_maintenance';

describe('La vue de la Maintenance', function () {
  let wrapper;
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$depotRessources = new MockDepotRessources();
    localVue.prototype.$journal = { enregistre () {} };
    wrapper = shallowMount(Lexique, {
      localVue,
      propsData: {
        lexique: [{ mot: 'ballon', type: '' }, { mot: 'douermatho', type: '' }, { mot: 'saumon', type: '' }]
      },
      methods: { prepareMotSuivant () {} }
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
    wrapper.setMethods({ prepareMotSuivant () { appelAMotSuivant++; } });
    wrapper.vm.affichePointDeFixation();
    wrapper.trigger('keydown.left');
    expect(wrapper.findAll('.croix').length).to.eql(1);
    expect(appelAMotSuivant).to.eql(0);
  });

  it("terminer est à true lorsque l'on a vu tout les mots", function () {
    let appelAMotSuivant = 0;
    wrapper.setMethods({ prepareMotSuivant () { appelAMotSuivant++; } });
    expect(wrapper.vm.termine).to.be(false);
    wrapper.vm.afficheMot();
    wrapper.vm.afficheMot();
    expect(wrapper.emitted('terminer')).to.be(undefined);
    wrapper.vm.afficheMot();
    expect(wrapper.vm.termine).to.be(true);
    expect(wrapper.emitted('terminer')).to.be(undefined);
    wrapper.vm.enregistreReponse();
    expect(wrapper.emitted('terminer').length).to.eql(1);
    expect(appelAMotSuivant).to.eql(0);
  });

  it("rajoute la classe bouton-arrondi--animation sur le premier bouton lorsqu'un choix est fait", function () {
    expect(wrapper.find('.bouton-arrondi:first-child').classes('bouton-arrondi--animation')).to.be(false);
    wrapper.vm.choixFait = wrapper.vm.CHOIX_FRANCAIS;
    expect(wrapper.find('.bouton-arrondi:first-child').classes('bouton-arrondi--animation')).to.be(true);
  });

  it("rajoute la classe bouton-arrondi--animation lorsqu'un choix est fait", function () {
    expect(wrapper.find('.bouton-arrondi:last-child').classes('bouton-arrondi--animation')).to.be(false);
    wrapper.vm.choixFait = wrapper.vm.CHOIX_PASFRANCAIS;
    expect(wrapper.find('.bouton-arrondi:last-child').classes('bouton-arrondi--animation')).to.be(true);
  });

  it("enregistre l'événement identificationMot", function (done) {
    wrapper.setProps({ lexique: [{ mot: 'premiermot', type: 'neutre' }, { mot: 'deuxiemot', type: 'neutre' }] });
    wrapper.vm.afficheMot();
    localVue.prototype.$journal = {
      enregistre (evenement) {
        expect(evenement).to.be.a(EvenementIdentificationMot);
        expect(evenement.donnees()).to.be.eql({ mot: 'premiermot', type: 'neutre', reponse: CHOIX_FRANCAIS });
        done();
      }
    };
    wrapper.vm.enregistreReponse(CHOIX_FRANCAIS);
  });

  it("enregistre l'événement via la souris sur mobile", function (done) {
    wrapper.setProps({ lexique: [{ mot: 'premiermot', type: 'neutre' }, { mot: 'deuxiemot', type: 'neutre' }] });
    wrapper.vm.afficheMot();
    localVue.prototype.$journal = {
      enregistre (evenement) {
        expect(evenement).to.be.a(EvenementIdentificationMot);
        expect(evenement.donnees()).to.be.eql({ mot: 'premiermot', type: 'neutre', reponse: CHOIX_FRANCAIS });
        done();
      }
    };

    wrapper.vm.enregistreReponseViaSouris(CHOIX_FRANCAIS, true);
  });

  it("enregistre l'événement apparitionMot", function (done) {
    localVue.prototype.$journal = {
      enregistre (evenement) {
        expect(evenement).to.be.a(EvenementApparitionMot);
        expect(evenement.donnees()).to.be.eql({ mot: 'ballon', type: '' });
        done();
      }
    };
    wrapper.vm.afficheMot();
  });
});
