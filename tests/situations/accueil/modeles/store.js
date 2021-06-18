import { creeStore, DECONNECTE, CONTACT, DEMARRE } from 'accueil/modeles/store';
import ErreurCampagne from 'commun/infra/erreur_campagne';

describe("Le store de l'accueil", function () {
  let registreUtilisateur;
  let registreCampagne;

  beforeEach(function () {
    registreUtilisateur = {
      estConnecte () {},
      nom () {},
      on () {},
      situationsFaites () {},
      enregistreContact () {
        return Promise.resolve();
      }
    };
    registreCampagne = {};
  });

  it("s'initialise a partir du registre utilisateur", function () {
    registreUtilisateur.estConnecte = () => false;
    registreUtilisateur.nom = () => undefined;
    const store = creeStore(registreUtilisateur);
    expect(store.state.estConnecte).to.eql(false);
    expect(store.state.etat).to.eql(DECONNECTE);
    expect(store.state.nom).to.eql(undefined);
  });

  it('initialise son état connecté a partir du registre utilisateur avec une situation faites', function () {
    registreUtilisateur.estConnecte = () => true;
    registreUtilisateur.nom = () => 'Mon nom';
    registreUtilisateur.situationsFaites = () => [1];
    const store = creeStore(registreUtilisateur);
    expect(store.state.estConnecte).to.eql(true);
    expect(store.state.etat).to.eql(DEMARRE);
    expect(store.state.nom).to.eql('Mon nom');
    expect(store.state.situationsFaites).to.eql([1]);
  });

  it("réinitilise les propriétés de l'évalué·e a la déconnexion", function () {
    registreUtilisateur.estConnecte = () => true;
    registreUtilisateur.nom = () => 'Mon nom';
    registreUtilisateur.situationsFaites = () => [1];
    const store = creeStore(registreUtilisateur);
    store.commit('metsAJourSituations', [1, 2]);
    store.commit('deconnecte');
    expect(store.state.estConnecte).to.eql(false);
    expect(store.state.etat).to.eql(DECONNECTE);
    expect(store.state.nom).to.eql('');
    expect(store.state.situationsFaites.length).to.eql(0);
    expect(store.state.situations.length).to.eql(0);
  });

  it('initialise à la connexion', function () {
    registreUtilisateur.situationsFaites = () => [1];
    const store = creeStore(registreUtilisateur);
    store.commit('connecte', 'nom évalué');
    expect(store.state.etat).to.eql(CONTACT);
    expect(store.state.nom).to.equal('nom évalué');
    expect(store.state.situationsFaites.length).to.eql(0);
  });

  it('mets à jour les situations accessible', function () {
    const store = creeStore(registreUtilisateur);
    store.commit('metsAJourSituations', [1, 2]);
    expect(store.state.situations.length).to.eql(2);
  });

  it("mets à jour l'état connecte lorsque le registre change d'état", function () {
    let callback;
    registreUtilisateur.on = (_, cb) => { callback = cb; };
    const store = creeStore(registreUtilisateur);
    registreUtilisateur.estConnecte = () => true;
    callback();
    expect(store.state.estConnecte).to.eql(true);
    registreUtilisateur.estConnecte = () => false;
    callback();
    expect(store.state.estConnecte).to.eql(false);
    expect(store.state.nom).to.eql('');
  });

  it('mets à jour les informations de contact', function () {
    const store = creeStore(registreUtilisateur);
    return store.dispatch('enregistreContact', 'mail@entreprise.fr', '0987654321').then(() => {
      expect(store.state.etat).to.eql(DEMARRE);
    });
  });

  it('sait récupérer les situations depuis le serveur', function () {
    registreUtilisateur.urlEvaluation = () => '/evaluation';
    registreCampagne.recupereCampagneCourante = () => {
      const situation = { nom_technique: 'nom_technique', libelle: 'libelle' };
      return { situations: [situation], libelle: 'libellé campagne' };
    };
    const fetch = (url) => Promise.resolve({
      json: () => {}
    });
    const store = creeStore(registreUtilisateur, registreCampagne, fetch);
    return store.dispatch('synchroniseEvaluation').then(() => {
      const situationAttendue = {
        identifiant: 'nom_technique',
        nom: 'libelle',
        chemin: 'nom_technique.html',
        niveauMinimum: 1
      };
      expect(store.state.nomCampagne).to.eql('libellé campagne');
      expect(store.state.situations).to.eql([situationAttendue]);
    });
  });

  it('se déconnecte en cas de 404 du serveur', function () {
    registreUtilisateur.urlEvaluation = () => '/evaluation';
    const fetch = (url) => Promise.resolve({
      status: 404
    });
    const store = creeStore(registreUtilisateur, registreCampagne, fetch);
    store.commit('connecte', 'test');
    return store.dispatch('synchroniseEvaluation').catch(() => {
      expect(store.state.estConnecte).to.eql(false);
    });
  });

  it('sait récupérer les deux compétences fortes depuis le serveur', function () {
    registreUtilisateur.urlEvaluation = (element) => {
      expect(element).to.eql('fin');
      return '/evaluation/1/fin';
    };
    const fetch = (url) => Promise.resolve({
      json: () => {
        return { competences_fortes: ['comprehension_consigne', 'rapidite', 'tri'] };
      }
    });
    const store = creeStore(registreUtilisateur, registreCampagne, fetch);
    return store.dispatch('termineEvaluation').then(() => {
      const competencesFortesAttendues = ['comprehension_consigne', 'rapidite'];
      expect(store.state.competencesFortes).to.eql(competencesFortesAttendues);
    });
  });

  describe('Action : inscris', function () {
    describe("quand l'inscription se passe bien", function () {
      beforeEach(function () {
        registreUtilisateur.inscris = () => {
          return Promise.resolve();
        };
      });

      it("vide les erreurs de l'inscription à la soumission d'une nouvelle inscription", function () {
        const store = creeStore(registreUtilisateur, registreCampagne);
        store.state.erreurFormulaireIdentification = 'Nom invalide';
        store.dispatch('inscris', { nom: 'Jean', campagne: 'code' });

        expect(store.state.erreurFormulaireIdentification).to.eql('');
      });
    });

    describe("quand l'inscription se passe mal", function () {
      it('traite les erreurs de validation', function () {
        registreUtilisateur.inscris = () => {
          return Promise.reject({ // eslint-disable-line prefer-promise-reject-errors
            status: 422,
            responseJSON: { nom: 'doit être rempli' }
          });
        };
        const store = creeStore(registreUtilisateur, registreCampagne);
        return store.dispatch('inscris', { nom: '', campagne: 'code' }).then((utilisateur) => {
          expect(utilisateur).to.eql(undefined);
          expect(store.state.erreurFormulaireIdentification).to.eql({ nom: 'doit être rempli' });
        });
      });

      it('traite une erreur réseau', function () {
        registreUtilisateur.inscris = () => {
          return Promise.reject({ // eslint-disable-line prefer-promise-reject-errors
            status: 0
          });
        };
        const store = creeStore(registreUtilisateur, registreCampagne);
        store.traduction = (code) => { return code; };
        return store.dispatch('inscris', { nom: '', campagne: 'code' }).then((utilisateur) => {
          expect(utilisateur).to.eql(undefined);
          expect(store.state.erreurFormulaireIdentification).to.eql({ generale: 'accueil.erreurs.reseau' });
        });
      });
    });
  });

  describe('Action : recupereCampagne', function () {
    beforeEach(function () {
      registreCampagne.assigneCampagneCourante = (codeCampagne) => {};
    });

    describe('quand la campagne est récupérer', function () {
      beforeEach(function () {
        const mockRegistre = { code: { id: 1, nom: 'ma campagne' } };
        registreCampagne.recupereCampagne = (codeCampagne) => {
          return Promise.resolve(mockRegistre[codeCampagne]);
        };
      });

      it('retourne la campagne', function () {
        const store = creeStore(registreUtilisateur, registreCampagne);
        return store.dispatch('recupereCampagne', { codeCampagne: 'code' }).then((campagne) => {
          expect(campagne).to.eql({ id: 1, nom: 'ma campagne' });
        });
      });

      it('assigne la campagne comme étant la campagne courante', function () {
        let campagneAssigne = false;
        registreCampagne.assigneCampagneCourante = (codeCampagne) => {
          campagneAssigne = true;
        };

        const store = creeStore(registreUtilisateur, registreCampagne);
        return store.dispatch('recupereCampagne', { codeCampagne: 'code' }).then((campagne) => {
          expect(campagneAssigne).to.eql(true);
        });
      });
    });

    it('gères certaines erreurs', function () {
      registreCampagne.recupereCampagne = () => {
        return Promise.reject(new ErreurCampagne('une erreur à gérer'));
      };
      const store = creeStore(registreUtilisateur, registreCampagne);
      return store.dispatch('recupereCampagne', { codeCampagne: 'code' }).then((campagne) => {
        expect(campagne).to.be(undefined);
        expect(store.state.erreurFormulaireIdentification.code).to.eql('une erreur à gérer');
      });
    });

    it('propage les erreurs inattendues', function () {
      registreCampagne.recupereCampagne = () => {
        return Promise.reject(new Error('non gérée'));
      };
      const store = creeStore(registreUtilisateur, registreCampagne);
      return store.dispatch('recupereCampagne', { codeCampagne: 'code' }).catch((erreur) => {
        expect(erreur.message).to.eql('non gérée');
      });
    });
  });
});
