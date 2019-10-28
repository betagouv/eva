import { shallowMount, createLocalVue } from '@vue/test-utils';
import { creeStore } from 'securite/modeles/store';
import FenetreZone from 'securite/vues/fenetre_zone';
import FormulaireRadio from 'securite/vues/formulaire_radio';
import EvenementOuvertureZone from 'securite/modeles/evenement_ouverture_zone';
import EvenementQualificationDanger from 'securite/modeles/evenement_qualification_danger';
import EvenementIdentificationDanger from 'securite/modeles/evenement_identification_danger';

describe('Le composant FenetreZone', function () {
  let wrapper;
  let store;
  let localVue;

  beforeEach(function () {
    store = creeStore();
    localVue = createLocalVue();
    localVue.prototype.journal = { enregistre () {} };
    wrapper = shallowMount(FenetreZone, {
      localVue,
      store,
      propsData: {
        zone: {}
      }
    });
  });

  it("affiche le formulaire pour dire si c'est un danger ou non", function () {
    expect(wrapper.contains(FormulaireRadio)).to.be(true);
  });

  it('définis la position bottom à partir des infos de la zone', function () {
    wrapper.setProps({ zone: { y: 70, r: 3 } });
    expect(wrapper.vm.bottom).to.eql('32.1%');
    expect(wrapper.vm.top).to.eql(undefined);
  });

  it('définis la position à partir des infos de la zone', function () {
    wrapper.setProps({ zone: { x: 4, r: 1 } });
    expect(wrapper.vm.left).to.eql('4.7%');
    expect(wrapper.vm.right).to.eql(undefined);
  });

  it('définis la position pour mettre la boite a gauche la zone', function () {
    wrapper.setProps({ zone: { x: 80, r: 1 } });
    expect(wrapper.vm.left).to.eql(undefined);
    expect(wrapper.vm.right).to.eql('20.7%');
  });

  it('définis la position pour mettre la boite en bas à droite de la zone', function () {
    wrapper.setProps({ zone: { y: 40, r: 1 } });
    expect(wrapper.vm.bottom).to.eql(undefined);
    expect(wrapper.vm.top).to.eql('40.7%');
  });

  it('rapporte son ouverture au journal', function (done) {
    localVue.prototype.journal.enregistre = (evenement) => {
      expect(evenement).to.be.a(EvenementOuvertureZone);
      expect(evenement.donnees()).to.eql({ zone: 'zone 51', danger: 'un-gros-danger' });
      done();
    };
    shallowMount(FenetreZone, {
      localVue,
      store,
      propsData: {
        zone: { id: 'zone 51', danger: 'un-gros-danger' }
      }
    });
  });

  describe('avec une zone et un danger associé', function () {
    let zone;
    let danger;

    beforeEach(function () {
      zone = { x: 4, r: 1, danger: 'danger1', id: 'LaZone' };
      danger = { qualifications: [] };
      store.commit('configureActe', { zones: [zone], dangers: { danger1: danger } });
      wrapper.setProps({ zone });
    });

    it('envoit les options de qualification', function () {
      expect(wrapper.vm.qualificationDanger.options).to.equal(danger.qualifications);
    });

    it('envoit le choix selectionné', function () {
      expect(wrapper.vm.qualificationDanger.choix).to.equal('');
      store.commit('ajouteDangerQualifie', { nom: zone.danger, choix: 'choix1' });
      expect(wrapper.vm.qualificationDanger.choix).to.equal('choix1');
    });

    it("rend la question d'identification du danger puis informe du résultat puis de qualification puis c'est terminé", function () {
      expect(wrapper.vm.etat).to.equal('identification');
      wrapper.vm.question.submit();
      expect(wrapper.vm.etat).to.equal('resultat-identification');
      wrapper.vm.termineIdentification();
      expect(wrapper.vm.etat).to.equal('qualification');
      wrapper.vm.question.submit();
      expect(wrapper.emitted('ferme').length).to.equal(1);
    });

    it("Informe l'utilisateur qu'il a bien identifié le danger", function () {
      wrapper.vm.question.submit('oui');
      expect(wrapper.vm.succesIdentification).to.equal(true);
      wrapper.vm.termineIdentification();
      expect(wrapper.vm.etat).to.equal('qualification');
    });

    it("Informe l'utilisateur qu'il a bien identifié le danger", function () {
      wrapper.vm.question.submit('non');
      expect(wrapper.vm.succesIdentification).to.equal(false);
      wrapper.vm.termineIdentification();
      expect(wrapper.vm.etat).to.equal('qualification');
    });

    it('mets à jour le store pour stocker le danger qualifié', function (done) {
      wrapper.vm.etat = 'qualification';
      store.commit = (mutation, donnees) => {
        expect(mutation).to.equal('ajouteDangerQualifie');
        expect(donnees).to.eql({ nom: 'danger1', choix: 'qualification1' });
        done();
      };
      wrapper.vm.question.submit('qualification1');
    });

    it('rapporte la qualification du danger au journal', function (done) {
      wrapper.vm.etat = 'qualification';
      localVue.prototype.journal.enregistre = (evenement) => {
        expect(evenement).to.be.a(EvenementQualificationDanger);
        expect(evenement.donnees()).to.eql({ danger: 'danger1', reponse: 'qualification1' });
        done();
      };
      wrapper.vm.question.submit('qualification1');
    });

    it('une fois le danger qualifié, on ne peut que modifier la qualification', function () {
      store.commit('ajouteDangerQualifie', { nom: zone.danger, choix: 'choix1' });
      const wrapper = shallowMount(FenetreZone, {
        store,
        localVue,
        propsData: { zone }
      });
      expect(wrapper.vm.etat).to.equal('qualification');
    });

    it("rapporte le résultat de l'identification au journal", function (done) {
      localVue.prototype.journal.enregistre = (evenement) => {
        expect(evenement).to.be.a(EvenementIdentificationDanger);
        expect(evenement.donnees()).to.eql({ zone: zone.id, reponse: 'oui', danger: zone.danger });
        done();
      };
      wrapper.vm.question.submit('oui');
    });
  });

  describe('avec une zone sans danger associé', function () {
    let zone;

    beforeEach(function () {
      zone = { id: 'zone1', x: 4, r: 1 };
      store.commit('configureActe', { zones: [zone], dangers: {} });
      wrapper.setProps({ zone });
    });

    it("Informe l'utilisateur qu'il a bien identifié le non-danger", function () {
      wrapper.vm.question.submit('non');
      expect(wrapper.vm.succesIdentification).to.equal(true);
      wrapper.vm.termineIdentification();
      expect(wrapper.emitted('ferme').length).to.equal(1);
    });

    it("enregistre dans le store l'identification", function (done) {
      wrapper.vm.question.submit('oui');
      store.commit = (mutation, donnees) => {
        expect(mutation).to.equal('ajouteNonDangerIdentifie');
        expect(donnees).to.eql('zone1');
        done();
      };
      wrapper.vm.termineIdentification();
    });

    it('une fois identifié, on ne peut plus rien faire', function () {
      store.commit('ajouteNonDangerIdentifie', zone.id);
      const wrapper = shallowMount(FenetreZone, {
        store,
        localVue,
        propsData: { zone }
      });
      expect(wrapper.vm.etat).to.equal('deja-identifie');
    });
  });
});
