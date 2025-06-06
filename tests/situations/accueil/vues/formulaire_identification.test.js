import { mount } from '@vue/test-utils';
import FormulaireIdentification from 'accueil/vues/formulaire_identification';
import { traduction } from 'commun/infra/internationalisation';
import { creeStore } from 'accueil/modeles/store';

describe("Le formulaire d'identification", function () {
  let wrapper;
  let store;
  const unUserAgent = "Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion";

  beforeEach(function () {
    const promesse = Promise.resolve();
    const registreUtilisateur = {
      estConnecte () { return false; },
      nom () {},
      on () {},
      situationsFaites () {}
    };
    store = creeStore(registreUtilisateur);
    store.dispatch = () => promesse;
    wrapper = mount(FormulaireIdentification, {
      global: {
        plugins: [store],
        mocks: {
          $traduction: traduction
        }
      }
    });
  });

  it("s'affiche", function () {
    expect(wrapper.exists('form')).toBe(true);
    expect(wrapper.exists('label')).toBe(true);
    expect(wrapper.findAll('input[type=text]').length).toEqual(2);
    expect(wrapper.findAll('input[type=checkbox]').length).toEqual(1);
  });

  it("se cache lorsqu'on est connecté", function (done) {
    store.state.estConnecte = true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.formulaire-identification-titre').exists()).toBe(false);
      done();
    });
  });

  it('écris un code de campagne en majuscule', function () {
    wrapper.vm.campagne = 'Mon code campagne';
    wrapper.vm.forceMajuscule();
    expect(wrapper.vm.campagne).toEqual('MON CODE CAMPAGNE');
  });

  describe('#envoieFormulaire', function () {
    let userAgentGetter;

    beforeEach(function () {
      userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get');
    });

    afterEach(() => {
      userAgentGetter.mockRestore();
    });

    it("inscrit la personne avec le nom et la campagne à l'appui sur le bouton", function (done) {
      store.dispatch = (action, { codeCampagne }) => {
        expect(action).toBe('recupereCampagne');
        expect(codeCampagne).toBe('Mon code campagne');

        store.dispatch = (action, { nom, campagne }) => {
          expect(action).toBe('inscris');
          expect(nom).toBe('Mon pseudo');
          expect(campagne).toBe('Mon code campagne');
          done();
          return Promise.resolve();
        };
        return Promise.resolve({ id: '1' });
      };
      wrapper.find('#formulaire-identification-champ-nom').setValue('  Mon pseudo  ');
      wrapper.find('#formulaire-identification-champ-campagne').setValue('Mon code campagne');
      wrapper.find('input[type=checkbox]').setChecked();
      wrapper.vm.$nextTick(() => {
        wrapper.find('button').trigger('submit');
      });
    });

    it("envoie les conditions de passation au store", function (done) {
      userAgentGetter.mockReturnValue(unUserAgent);
      window.innerWidth = 1366;
      window.innerHeight = 768;
      wrapper.vm.envoieFormulaireInscription();
      wrapper.vm.$nextTick(() => {
        expect(store.state.conditionsDePassation).toEqual({
          user_agent: unUserAgent,
          hauteur_fenetre_navigation: 768,
          largeur_fenetre_navigation: 1366
        });
        done();
      });
    });
  });

  it('réinitialise les valeurs une fois sauvegardé', function () {
    store.dispatch = () => {
      store.dispatch = () => {
        return Promise.resolve({ id: 'evaluation_id' });
      };
      return Promise.resolve({ id: '1' });
    };

    wrapper.vm.nom = 'Mon pseudo';
    wrapper.vm.campagne = 'Ma campagne';
    wrapper.vm.cgu = true;
    return wrapper.vm.envoieFormulaire().then(() => {
      expect(wrapper.vm.nom).toEqual('');
      expect(wrapper.vm.campagne).toEqual('');
      expect(wrapper.vm.cgu).toEqual(false);
    });
  });

  it("ne réinitialise pas les valeurs rentrées lorsque l'on n'a pas réussi à s'identifier", function () {
    store.dispatch = () => {
      store.dispatch = () => {
        return Promise.resolve();
      };
      return Promise.resolve({ id: '1' });
    };
    wrapper.vm.nom = 'Pseudo';
    wrapper.vm.campagne = 'Campagne';
    return wrapper.vm.envoieFormulaire().finally(() => {
      expect(wrapper.vm.nom).toEqual('Pseudo');
      expect(wrapper.vm.campagne).toEqual('Campagne');
    });
  });

  it('est desactivé lorsque le nom est vide ou la campagne est vide ou les conditions ne sont pas accepté', function () {
    expect(wrapper.vm.estDesactive).toBe(true);
    wrapper.vm.nom = 'Mon pseudo';
    expect(wrapper.vm.estDesactive).toBe(true);
    wrapper.vm.campagne = 'Mon pseudo';
    expect(wrapper.vm.estDesactive).toBe(true);
    wrapper.vm.cgu = true;
    expect(wrapper.vm.estDesactive).toBe(false);
  });

  it("est désactivé lorsque l'inscription est en cours", function () {
    wrapper.vm.nom = 'Pseudo';
    wrapper.vm.campagne = 'Campagne';
    wrapper.vm.envoieFormulaire();
    expect(wrapper.vm.enCours).toBe(true);
    expect(wrapper.vm.estDesactive).toBe(true);
  });

  it("réinitialise l'état en cours lorsque l'inscription est terminé", function () {
    return wrapper.vm.envoieFormulaire().then(() => {
      expect(wrapper.vm.enCours).toBe(false);
    });
  });

  it("affiche les erreurs de la campagne quand elle n'existe pas", function () {
    store.dispatch = () => {
      store.state.erreurFormulaireIdentification = { code: 'Code inconnu' };
      return Promise.resolve();
    };

    expect(wrapper.findAll('.erreur-message').length).toBe(0);
    return wrapper.vm.envoieFormulaire().then(() => {
      expect(wrapper.findAll('.erreur-message').length).toBe(1);
      expect(wrapper.findAll('.erreur-message').at(0).text()).toBe('Code inconnu');
    });
  });

  it("affiche les erreurs de l'inscription quand elle échoue", function () {
    store.dispatch = () => {
      store.dispatch = () => {
        store.state.erreurFormulaireIdentification = { nom: 'doit être rempli' };

        return Promise.resolve();
      };
      return Promise.resolve({ id: '1' });
    };

    expect(wrapper.findAll('.erreur-message').length).toBe(0);
    return wrapper.vm.envoieFormulaire().then(() => {
      expect(wrapper.findAll('.erreur-message').length).toBe(1);
      expect(wrapper.findAll('.erreur-message').at(0).text()).toBe('doit être rempli');
    });
  });

  it("affiche les erreurs generale de l'inscription quand elle échoue", function () {
    store.dispatch = () => {
      store.dispatch = () => {
        store.state.erreurFormulaireIdentification = { generale: 'erreur réseau' };

        return Promise.resolve();
      };
      return Promise.resolve({ id: '1' });
    };

    expect(wrapper.findAll('.erreur-generale').length).toBe(0);
    return wrapper.vm.envoieFormulaire().then(() => {
      expect(wrapper.findAll('.erreur-generale').length).toBe(1);
      expect(wrapper.findAll('.erreur-generale').at(0).text()).toBe('erreur réseau');
    });
  });

  function composant (props = {}) {
    return mount(FormulaireIdentification, {
      global: {
        plugins: [store],
        mocks: {
          $traduction: traduction
        }
      },
      props: props
    });
  }

  it('désactive le champ campagne si il y a une propriété forceCampagne', function () {
    expect(wrapper.findAll('.champ-texte-accueil').length).toBe(2);
    wrapper = composant({ forceCampagne: 'ete-2019' });
    expect(wrapper.vm.campagne).toEqual('ETE-2019');
    expect(wrapper.findAll('label').length).toBe(3);
    const champs = wrapper.findAll('.champ-texte-accueil');
    expect(champs.at(1).attributes('disabled')).not.toBeUndefined();
  });

  it('disable le champ nom/prénom si il y a une propriété forceNom', function () {
    expect(wrapper.findAll('.champ-texte-accueil').length).toBe(2);
    wrapper = composant({ forceNom: 'franck-poulain' });
    expect(wrapper.vm.nom).toEqual('franck-poulain');
    expect(wrapper.findAll('label').length).toBe(3);
    const champs = wrapper.findAll('.champ-texte-accueil');
    expect(champs.length).toBe(2);
    expect(champs.at(0).attributes('disabled')).not.toBeUndefined();
  });

  describe('#champCodeEstDesactive', function () {
    it('par défaut le champ est activé', function () {
      expect(wrapper.vm.champCodeEstDesactive).toBe(false);
    });

    describe('quand il y a code campagne forcé', function () {
      beforeEach(function () {
        wrapper = composant({ forceCampagne: 'monCode' });
      });

      it('le champ est désactivé', function () {
        expect(wrapper.vm.champCodeEstDesactive).toBe(true);
      });

      describe('quand il y a une erreur dans le code', function () {
        beforeEach(function () {
          store.state.erreurFormulaireIdentification = { code: 'invalide' };
        });

        it('le champ est activé', function () {
          expect(wrapper.vm.champCodeEstDesactive).toBe(false);
        });
      });
    });
  });

  describe('mode identifiant', function () {
    let wrapperIdentifiant;
  
    beforeEach(() => {
      store.dispatch = jest.fn(() => Promise.resolve({ id: '1' }));
      wrapperIdentifiant = mount(FormulaireIdentification, {
        global: {
          plugins: [store],
          mocks: { $traduction: traduction }
        }
      });
      wrapperIdentifiant.vm.modeConnexion = 'identifiant';
    });
  
    it("n'affiche que le champ identifiant", () => {
      const champs = wrapperIdentifiant.findAll('.champ-texte-accueil');
      expect(champs.length).toBe(2);
      expect(wrapperIdentifiant.find('#formulaire-identification-champ-identifiant').exists()).toBe(true);
      expect(wrapperIdentifiant.find('#formulaire-identification-champ-nom').exists()).toBe(false);
    });
  
    it("appelle connexionParIdentifiant avec les bonnes valeurs", function (done) {
      wrapperIdentifiant.vm.identifiant = 'ABCD1234';
      wrapperIdentifiant.vm.campagne = 'ETE2025';
      wrapperIdentifiant.vm.cgu = true;
  
      store.dispatch = jest.fn((action, payload) => {
        if (action === 'recupereCampagne') return Promise.resolve({ id: 1 });
  
        if (action === 'connexionParIdentifiant') {
          expect(payload.identifiant).toBe('ABCD1234');
          expect(payload.campagne).toBe('ETE2025');
          done();
        }
  
        return Promise.resolve();
      });
  
      wrapperIdentifiant.vm.envoieFormulaire();
    });
  
    it("affiche l'erreur identifiant si présente", async () => {
      store.state.erreurFormulaireIdentification = { identifiant: 'Non reconnu' };
      wrapperIdentifiant.vm.modeConnexion = 'identifiant';
      await wrapperIdentifiant.vm.$nextTick();
  
      const erreur = wrapperIdentifiant.find('.erreur-message');
      expect(erreur.exists()).toBe(true);
      expect(erreur.text()).toBe('Non reconnu');
    });
  });
});
