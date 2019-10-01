import { shallowMount } from '@vue/test-utils';
import { creeStore } from 'securite/store/store';
import FenetreZone from 'securite/vues/fenetre_zone';
import FormulaireRadio from 'securite/vues/formulaire_radio';

describe('Le composant FenetreZone', function () {
  let wrapper;
  let store;

  beforeEach(function () {
    store = creeStore();
    wrapper = shallowMount(FenetreZone, {
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

  describe('avec une zone et un danger associé', function () {
    let danger;

    beforeEach(function () {
      const zone = { x: 4, r: 1, danger: 'danger1' };
      danger = { qualifications: [] };
      store.commit('chargeZonesEtDangers', { zones: [zone], dangers: { danger1: danger } });
      wrapper.setProps({ zone });
    });

    it('renvoit les options de qualification', function () {
      expect(wrapper.vm.qualificationDanger.options).to.equal(danger.qualifications);
    });

    it("rend la question d'identification du danger puis de qualification puis c'est terminé", function () {
      expect(wrapper.vm.etat).to.equal('identification');
      wrapper.vm.question.submit();
      expect(wrapper.vm.etat).to.equal('qualification');
      wrapper.vm.question.submit();
      expect(wrapper.vm.etat).to.equal('termine');
    });

    it('mets à jour le store pour stocker le danger qualifié', function (done) {
      wrapper.vm.etat = 'qualification';
      store.commit = (mutation, donnees) => {
        expect(mutation).to.equal('ajouteDangerQualifie');
        expect(donnees).to.equal('danger1');
        done();
      };
      wrapper.vm.question.submit('qualification1');
    });
  });

  describe('avec une zone sans danger associé', function () {
    beforeEach(function () {
      const zone = { x: 4, r: 1 };
      store.commit('chargeZonesEtDangers', { zones: [zone], dangers: {} });
      wrapper.setProps({ zone });
    });

    it("ne propose que l'étape d'identification", function () {
      expect(wrapper.vm.etat).to.equal('identification');
      wrapper.vm.question.submit();
      expect(wrapper.vm.etat).to.equal('termine');
    });
  });

  it('ne rend plus rien une fois terminé', function () {
    expect(wrapper.isEmpty()).to.be(false);
    wrapper.vm.etat = 'termine';
    expect(wrapper.isEmpty()).to.be(true);
  });
});
