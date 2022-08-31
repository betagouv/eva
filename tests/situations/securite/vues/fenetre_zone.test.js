import { shallowMount } from '@vue/test-utils';
import { creeStore } from 'securite/modeles/store';
import FenetreZone from 'securite/vues/fenetre_zone';
import FormulaireRadio from 'securite/vues/formulaire_radio';
import EvenementOuvertureZone from 'commun/modeles/evenement_ouverture_zone';
import EvenementQualificationDanger from 'securite/modeles/evenement_qualification_danger';
import EvenementIdentificationDanger from 'securite/modeles/evenement_identification_danger';

describe('Le composant FenetreZone', function () {
  let wrapper;
  let store;
  let journal;

  function wrapperFenetreZone (props) {
    return shallowMount(FenetreZone, {
      global: {
        plugins: [store],
        mocks: {
          $traduction: (key) => { return key; },
          $journal: journal
        },
        stubs: {
          TransitionFade: false
        }
      },
      props: props
    });
  }

  beforeEach(function () {
    store = creeStore();
    journal = { enregistre () {} };
  });

  it("affiche le formulaire pour dire si c'est un danger ou non", function () {
    wrapper = wrapperFenetreZone({ zone: { } });
    expect(wrapper.findComponent(FormulaireRadio).exists()).toBe(true);
  });

  it('définis la position bottom à partir des infos de la zone', function () {
    wrapper = wrapperFenetreZone({ zone: { y: 70, r: 3 } });
    expect(wrapper.vm.bottom).toEqual('32.1%');
    expect(wrapper.vm.top).toEqual(undefined);
  });

  it('définis la position à partir des infos de la zone', function () {
    wrapper = wrapperFenetreZone({ zone: { x: 4, r: 1 } });
    expect(wrapper.vm.left).toEqual('4.7%');
    expect(wrapper.vm.right).toEqual(undefined);
  });

  it('définis la position pour mettre la boite a gauche la zone', function () {
    wrapper = wrapperFenetreZone({ zone: { x: 80, r: 1 } });
    expect(wrapper.vm.left).toEqual(undefined);
    expect(wrapper.vm.right).toEqual('20.7%');
  });

  it('définis la position pour mettre la boite en bas à droite de la zone', function () {
    wrapper = wrapperFenetreZone({ zone: { y: 40, r: 1 } });
    expect(wrapper.vm.bottom).toEqual(undefined);
    expect(wrapper.vm.top).toEqual('40.7%');
  });

  it('rapporte son ouverture au journal', function (done) {
    journal.enregistre = (evenement) => {
      expect(evenement).toBeInstanceOf(EvenementOuvertureZone);
      expect(evenement.donnees()).toEqual({ zone: 'zone 51', danger: 'un-gros-danger' });
      done();
    };
    wrapperFenetreZone({ zone: { id: 'zone 51', danger: 'un-gros-danger' } });
  });

  describe('avec une zone et un danger associé', function () {
    let zone;
    let danger;

    beforeEach(function () {
      zone = { x: 4, r: 1, danger: 'danger1', id: 'LaZone' };
      danger = { qualifications: [] };
      store.commit('configureActe', { zones: [zone], dangers: { danger1: danger } });
      wrapper = wrapperFenetreZone({ zone });
    });

    it('envoit les options de qualification', function () {
      expect(wrapper.vm.qualificationDanger.options).toEqual(danger.qualifications);
    });

    it('envoit le choix selectionné', function () {
      expect(wrapper.vm.qualificationDanger.choix).toBe('');
      store.commit('ajouteDangerQualifie', { nom: zone.danger, choix: 'choix1' });
      expect(wrapper.vm.qualificationDanger.choix).toBe('choix1');
    });

    it("rend la question d'identification du danger puis informe du résultat puis de qualification puis c'est terminé", function () {
      expect(wrapper.vm.etat).toBe('identification');
      wrapper.vm.question.submit();
      expect(wrapper.vm.etat).toBe('resultat-identification');
      wrapper.vm.termineIdentification();
      expect(wrapper.vm.etat).toBe('qualification');
      wrapper.vm.question.submit();
      expect(wrapper.emitted('ferme').length).toBe(1);
    });

    it("Informe l'utilisateur qu'il a bien identifié le danger", function () {
      wrapper.vm.question.submit('oui');
      expect(wrapper.vm.succesIdentification).toBe(true);
      wrapper.vm.termineIdentification();
      expect(wrapper.vm.etat).toBe('qualification');
    });

    it("Informe l'utilisateur qu'il a bien identifié le danger", function () {
      wrapper.vm.question.submit('non');
      expect(wrapper.vm.succesIdentification).toBe(false);
      wrapper.vm.termineIdentification();
      expect(wrapper.vm.etat).toBe('qualification');
    });

    it('mets à jour le store pour stocker le danger qualifié', function (done) {
      wrapper.vm.etat = 'qualification';
      store.commit = (mutation, donnees) => {
        expect(mutation).toBe('ajouteDangerQualifie');
        expect(donnees).toEqual({ nom: 'danger1', choix: 'qualification1' });
        done();
      };
      wrapper.vm.question.submit('qualification1');
    });

    it('rapporte la qualification du danger au journal', function (done) {
      wrapper.vm.etat = 'qualification';
      journal.enregistre = (evenement) => {
        expect(evenement).toBeInstanceOf(EvenementQualificationDanger);
        expect(evenement.donnees()).toEqual({ danger: 'danger1', reponse: 'qualification1' });
        done();
      };
      wrapper.vm.question.submit('qualification1');
    });

    it('une fois le danger qualifié, on ne peut que modifier la qualification', function () {
      store.commit('ajouteDangerQualifie', { nom: zone.danger, choix: 'choix1' });
      const wrapper = wrapperFenetreZone({ zone });
      expect(wrapper.vm.etat).toBe('qualification');
    });

    it("rapporte le résultat de l'identification au journal", function (done) {
      journal.enregistre = (evenement) => {
        expect(evenement).toBeInstanceOf(EvenementIdentificationDanger);
        expect(evenement.donnees()).toEqual({ zone: zone.id, reponse: 'oui', danger: zone.danger });
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
      wrapper = wrapperFenetreZone({ zone });
    });

    it("Informe l'utilisateur qu'il a bien identifié le non-danger", function () {
      wrapper.vm.question.submit('non');
      expect(wrapper.vm.succesIdentification).toBe(true);
      wrapper.vm.termineIdentification();
      expect(wrapper.emitted('ferme').length).toBe(1);
    });

    it("enregistre dans le store l'identification", function (done) {
      wrapper.vm.question.submit('oui');
      store.commit = (mutation, donnees) => {
        expect(mutation).toBe('ajouteNonDangerIdentifie');
        expect(donnees).toEqual('zone1');
        done();
      };
      wrapper.vm.termineIdentification();
    });

    it('une fois identifié, on ne peut plus rien faire', function () {
      store.commit('ajouteNonDangerIdentifie', zone.id);
      wrapper = wrapperFenetreZone({ zone });
      expect(wrapper.vm.etat).toBe('deja-identifie');
    });
  });
});
