import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import FormulaireIdentificationVue from 'accueil/vues/formulaire_identification';
import { traduction } from 'commun/infra/internationalisation';

describe("Le formulaire d'identification", function () {
  let wrapper;
  let promesse;
  let store;
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$traduction = traduction;
    promesse = Promise.resolve();
    store = new Vuex.Store({
      state: {
        estConnecte: false,
        erreurFormulaireIdentification: ''
      }
    });
    store.dispatch = () => promesse;
    wrapper = mount(FormulaireIdentificationVue, { store, localVue });
  });

  it("s'affiche", function () {
    expect(wrapper.exists('form')).to.be(true);
    expect(wrapper.exists('label')).to.be(true);
    expect(wrapper.findAll('input[type=text]').length).to.eql(2);
    expect(wrapper.findAll('input[type=checkbox]').length).to.eql(1);
  });

  it("se cache lorsqu'on est connecté", function () {
    store.state.estConnecte = true;
    expect(wrapper.isEmpty()).to.be(true);
  });

  it("inscrit la personne avec le nom et la campagne à l'appui sur le bouton", function (done) {
    store.dispatch = (action, { codeCampagne }) => {
      expect(action).to.equal('recupereCampagne');
      expect(codeCampagne).to.equal('Mon code campagne');

      store.dispatch = (action, { nom, campagne }) => {
        expect(action).to.equal('inscris');
        expect(nom).to.equal('Mon pseudo');
        expect(campagne).to.equal('Mon code campagne');
        done();
        return Promise.resolve();
      };
      return Promise.resolve('{id: 1}');
    };
    wrapper.findAll('input[type=text]').at(0).setValue('  Mon pseudo  ');
    wrapper.findAll('input[type=text]').at(1).setValue('Mon code campagne');
    wrapper.find('input[type=checkbox]').setChecked();
    wrapper.find('button').trigger('submit');
  });

  it('réinitialise les valeurs une fois sauvegardé', function () {
    store.dispatch = (action, { codeCampagne }) => {
      store.dispatch = (action, { nom, campagne }) => {
        return Promise.resolve('{id: evaluation_id}');
      };
      return Promise.resolve('{id: 1}');
    };

    wrapper.vm.nom = 'Mon pseudo';
    wrapper.vm.campagne = 'Ma campagne';
    wrapper.vm.cgu = true;
    return wrapper.vm.envoieFormulaire().then(() => {
      expect(wrapper.vm.nom).to.eql('');
      expect(wrapper.vm.campagne).to.eql('');
      expect(wrapper.vm.cgu).to.eql(false);
    });
  });

  it("ne réinitialise pas les valeurs rentrées lorsque l'on n'a pas réussi à s'identifier", function () {
    store.dispatch = (action, { codeCampagne }) => {
      store.dispatch = (action, { nom, campagne }) => {
        return Promise.resolve();
      };
      return Promise.resolve('{id: 1}');
    };
    wrapper.vm.nom = 'Pseudo';
    wrapper.vm.campagne = 'Campagne';
    return wrapper.vm.envoieFormulaire().finally(() => {
      expect(wrapper.vm.nom).to.eql('Pseudo');
      expect(wrapper.vm.campagne).to.eql('Campagne');
    });
  });

  it('est desactivé lorsque le nom est vide ou la campagne est vide ou les conditions ne sont pas accepté', function () {
    expect(wrapper.vm.estDesactive).to.be(true);
    wrapper.vm.nom = 'Mon pseudo';
    expect(wrapper.vm.estDesactive).to.be(true);
    wrapper.vm.campagne = 'Mon pseudo';
    expect(wrapper.vm.estDesactive).to.be(true);
    wrapper.vm.cgu = true;
    expect(wrapper.vm.estDesactive).to.be(false);
  });

  it("est désactivé lorsque l'inscription est en cours", function () {
    wrapper.vm.nom = 'Pseudo';
    wrapper.vm.campagne = 'Campagne';
    wrapper.vm.envoieFormulaire();
    expect(wrapper.vm.enCours).to.be(true);
    expect(wrapper.vm.estDesactive).to.be(true);
  });

  it("réinitialise l'état en cours lorsque l'inscription est terminé", function () {
    return wrapper.vm.envoieFormulaire().then(() => {
      expect(wrapper.vm.enCours).to.be(false);
    });
  });

  it("affiche les erreurs de la campagne quand elle n'existe pas", function () {
    store.dispatch = (action, { codeCampagne }) => {
      store.state.erreurFormulaireIdentification = { code: 'Code inconnu' };
      return Promise.resolve();
    };

    expect(wrapper.findAll('.erreur-message').length).to.equal(0);
    return wrapper.vm.envoieFormulaire().then(() => {
      expect(wrapper.findAll('.erreur-message').length).to.equal(1);
      expect(wrapper.findAll('.erreur-message').at(0).text()).to.equal('Code inconnu');
    });
  });

  it("affiche les erreurs de l'inscription quand elle échoue", function () {
    store.dispatch = (action, { codeCampagne }) => {
      store.dispatch = (action, { nom, campagne }) => {
        store.state.erreurFormulaireIdentification = { nom: 'doit être rempli' };

        return Promise.resolve();
      };
      return Promise.resolve('{id: 1}');
    };

    expect(wrapper.findAll('.erreur-message').length).to.equal(0);
    return wrapper.vm.envoieFormulaire().then(() => {
      expect(wrapper.findAll('.erreur-message').length).to.equal(1);
      expect(wrapper.findAll('.erreur-message').at(0).text()).to.equal('doit être rempli');
    });
  });

  it("affiche les erreurs generale de l'inscription quand elle échoue", function () {
    store.dispatch = (action, { codeCampagne }) => {
      store.dispatch = (action, { nom, campagne }) => {
        store.state.erreurFormulaireIdentification = { generale: 'erreur réseau' };

        return Promise.resolve();
      };
      return Promise.resolve('{id: 1}');
    };

    expect(wrapper.findAll('.erreur-generale').length).to.equal(0);
    return wrapper.vm.envoieFormulaire().then(() => {
      expect(wrapper.findAll('.erreur-generale').length).to.equal(1);
      expect(wrapper.findAll('.erreur-generale').at(0).text()).to.equal('erreur réseau');
    });
  });

  it('cache le champ campagne si il y a une propriété forceCampagne', function () {
    expect(wrapper.findAll('.input-accueil').length).to.equal(2);
    wrapper = mount(FormulaireIdentificationVue, { store, localVue, propsData: { forceCampagne: 'ete-2019' } });
    expect(wrapper.vm.campagne).to.eql('ete-2019');
    expect(wrapper.findAll('label').length).to.equal(2);
    expect(wrapper.findAll('.input-accueil').length).to.equal(1);
  });

  it('cache le champ nom/prénom si il y a une propriété forceNom', function () {
    expect(wrapper.findAll('.input-accueil').length).to.equal(2);
    wrapper = mount(FormulaireIdentificationVue, { store, localVue, propsData: { forceNom: 'franck-poulain' } });
    expect(wrapper.vm.nom).to.eql('franck-poulain');
    expect(wrapper.findAll('label').length).to.equal(2);
    expect(wrapper.findAll('.input-accueil').length).to.equal(1);
  });
});
