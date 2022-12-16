import { creeStore, DECONNECTE, DONNEES, DEMARRE } from 'accueil/modeles/store';
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
      enregistreDonneesComplementaires () {
        return Promise.resolve();
      }
    };
    registreCampagne = {};
  });

  it("s'initialise a partir du registre utilisateur", function () {
    registreUtilisateur.estConnecte = () => false;
    registreUtilisateur.nom = () => undefined;
    const store = creeStore(registreUtilisateur);
    expect(store.state.estConnecte).toEqual(false);
    expect(store.state.etat).toEqual(DECONNECTE);
    expect(store.state.nom).toEqual(undefined);
  });

  it('initialise son état connecté a partir du registre utilisateur avec une situation faites', function () {
    registreUtilisateur.estConnecte = () => true;
    registreUtilisateur.nom = () => 'Mon nom';
    registreUtilisateur.situationsFaites = () => [1];
    const store = creeStore(registreUtilisateur);
    expect(store.state.estConnecte).toEqual(true);
    expect(store.state.etat).toEqual(DEMARRE);
    expect(store.state.nom).toEqual('Mon nom');
    expect(store.state.situationsFaites).toEqual([1]);
  });

  it("réinitilise les propriétés de l'évalué·e a la déconnexion", function () {
    registreUtilisateur.estConnecte = () => true;
    registreUtilisateur.nom = () => 'Mon nom';
    registreUtilisateur.situationsFaites = () => [1];
    const store = creeStore(registreUtilisateur);
    store.commit('metsAJourSituations', [1, 2]);
    store.commit('deconnecte');
    expect(store.state.estConnecte).toEqual(false);
    expect(store.state.etat).toEqual(DECONNECTE);
    expect(store.state.nom).toEqual('');
    expect(store.state.situationsFaites.length).toEqual(0);
    expect(store.state.situations.length).toEqual(0);
  });

  it('initialise à la connexion', function () {
    registreUtilisateur.situationsFaites = () => [1];
    const store = creeStore(registreUtilisateur);
    store.commit('connecte', 'nom évalué');
    expect(store.state.etat).toEqual(DONNEES);
    expect(store.state.nom).toBe('nom évalué');
    expect(store.state.situationsFaites.length).toEqual(0);
  });

  it('mets à jour les situations accessible', function () {
    const store = creeStore(registreUtilisateur);
    store.commit('metsAJourSituations', [1, 2]);
    expect(store.state.situations.length).toEqual(2);
  });

  it("mets à jour l'état connecte lorsque le registre change d'état", function () {
    let callback;
    registreUtilisateur.on = (_, cb) => { callback = cb; };
    const store = creeStore(registreUtilisateur);
    registreUtilisateur.estConnecte = () => true;
    callback();
    expect(store.state.estConnecte).toEqual(true);
    registreUtilisateur.estConnecte = () => false;
    callback();
    expect(store.state.estConnecte).toEqual(false);
    expect(store.state.nom).toEqual('');
  });

  describe('Action : enregistreDonneesComplementaires', function () {
    let data = { age: '35', genre: 'Femme' };

    it('démarre après avoir enregistré les données', function () {
      const store = creeStore(registreUtilisateur);
      registreUtilisateur.idEvaluation = () => { return 1; };
      return store.dispatch('enregistreDonneesComplementaires', data).then(() => {
        expect(store.state.etat).toEqual(DEMARRE);
      });
    });

    it("déconnecte si l'id évaluation n'est pas connu", function () {
      const store = creeStore(registreUtilisateur);
      store.commit('connecte', 'test');
      registreUtilisateur.idEvaluation = () => { return undefined; };
      return store.dispatch('enregistreDonneesComplementaires', data).then(() => {
        expect(store.state.estConnecte).toEqual(false);
      });
    });
  });

  describe('Action : recupereSituations', function () {
    it('sait récupérer les situations avec le registreCampagne', function () {
      registreCampagne.recupereCampagneCourante = () => {
        const situation = { nom_technique: 'nom_technique', libelle: 'libelle' };
        return { situations: [situation], libelle: 'libellé campagne' };
      };
      const store = creeStore(registreUtilisateur, registreCampagne);
      return store.dispatch('recupereSituations').then(() => {
        const situationAttendue = {
          identifiant: 'nom_technique',
          nom: 'libelle',
          chemin: 'nom_technique.html',
          niveauMinimum: 1
        };
        expect(store.state.nomCampagne).toEqual('libellé campagne');
        expect(store.state.situations).toEqual([situationAttendue]);
      });
    });

    it("se déconnecte si la campagne récupérée n'a pas de situation pour forcer rechargement de la campagne", function () {
      registreCampagne.recupereCampagneCourante = () => {
        return { libelle: 'libellé campagne' };
      };
      const store = creeStore(registreUtilisateur, registreCampagne);
      store.commit('connecte', 'test');
      return store.dispatch('recupereSituations').then(() => {
        expect(store.state.estConnecte).toEqual(false);
      });
    });

    it("se déconnecte s'il n'y a pas de campagne courrante", function () {
      registreCampagne.recupereCampagneCourante = () => {
        return null;
      };
      const store = creeStore(registreUtilisateur, registreCampagne);
      store.commit('connecte', 'test');
      return store.dispatch('recupereSituations').then(() => {
        expect(store.state.estConnecte).toEqual(false);
      });
    });
  });

  describe('Action : terminerEvaluation', function () {
    let store;

    beforeEach(function () {
      registreUtilisateur.termineEvaluation = () => {
        return Promise.resolve(['comprehension_consigne', 'rapidite', 'tri']);
      };
    });

    describe('quand la requete se termine avec succès', function () {
      beforeEach(function () {
        store = creeStore(registreUtilisateur, registreCampagne);
      });

      it("indiquer par une variable que l'évaluation est terminée", function () {
        expect(store.state.evaluationTerminee).toBe(false);
        return store.dispatch('termineEvaluation').then(() => {
          expect(store.state.evaluationTerminee).toBe(true);
        });
      });

      it('sait récupérer les deux compétences fortes depuis le serveur', function () {
        return store.dispatch('termineEvaluation').then(() => {
          const competencesFortesAttendues = ['comprehension_consigne', 'rapidite'];
          expect(store.state.competencesFortes).toEqual(competencesFortesAttendues);
        });
      });
    });

    describe('quand la requete se termine avec une erreur', function () {
      beforeEach(function () {
        registreUtilisateur.termineEvaluation = () => {
          return Promise.reject({ // eslint-disable-line prefer-promise-reject-errors
            status: 422
          });
        };
        store = creeStore(registreUtilisateur, registreCampagne);
      });

      it("indiquer que l'évaluation est terminée", function (done) {
        expect(store.state.evaluationTerminee).toBe(false);
        store.dispatch('termineEvaluation').catch((erreur) => {
          expect(store.state.evaluationTerminee).toBe(true);
          expect(erreur).toEqual({ status: 422 });
          done();
        });
      });
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

        expect(store.state.erreurFormulaireIdentification).toEqual('');
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
          expect(utilisateur).toEqual(undefined);
          expect(store.state.erreurFormulaireIdentification).toEqual({ nom: 'doit être rempli' });
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
          expect(utilisateur).toEqual(undefined);
          expect(store.state.erreurFormulaireIdentification).toEqual({ generale: 'accueil.erreurs.reseau' });
        });
      });
    });
  });

  describe('Action : recupereCampagne', function () {
    beforeEach(function () {
      registreCampagne.assigneCampagneCourante = () => {};
    });

    describe('quand la campagne est récupérée', function () {
      beforeEach(function () {
        const mockRegistre = { code: { id: 1, nom: 'ma campagne' } };
        registreCampagne.recupereCampagne = (codeCampagne) => {
          return Promise.resolve(mockRegistre[codeCampagne]);
        };
      });

      it('retourne la campagne', function () {
        const store = creeStore(registreUtilisateur, registreCampagne);
        return store.dispatch('recupereCampagne', { codeCampagne: 'code' }).then((campagne) => {
          expect(campagne).toEqual({ id: 1, nom: 'ma campagne' });
        });
      });

      it('assigne la campagne comme étant la campagne courante', function () {
        let campagneAssigne = false;
        registreCampagne.assigneCampagneCourante = () => {
          campagneAssigne = true;
        };

        const store = creeStore(registreUtilisateur, registreCampagne);
        return store.dispatch('recupereCampagne', { codeCampagne: 'code' }).then(() => {
          expect(campagneAssigne).toEqual(true);
        });
      });
    });

    it('gères certaines erreurs', function () {
      registreCampagne.recupereCampagne = () => {
        return Promise.reject(new ErreurCampagne('une erreur à gérer'));
      };
      const store = creeStore(registreUtilisateur, registreCampagne);
      return store.dispatch('recupereCampagne', { codeCampagne: 'code' }).then((campagne) => {
        expect(campagne).toBe(undefined);
        expect(store.state.erreurFormulaireIdentification.code).toEqual('une erreur à gérer');
      });
    });

    it('propage les erreurs inattendues', function () {
      registreCampagne.recupereCampagne = () => {
        return Promise.reject(new Error('non gérée'));
      };
      const store = creeStore(registreUtilisateur, registreCampagne);
      return store.dispatch('recupereCampagne', { codeCampagne: 'code' }).catch((erreur) => {
        expect(erreur.message).toEqual('non gérée');
      });
    });

    describe('#estTermine', function () {
      const situation = { nom_technique: 'inventaire' };

      it("n'indique pas l'évaluation terminée tant que les situations n'ont pas été mise à jour", function () {
        registreUtilisateur.situationsFaites = () => ['inventaire'];
        const store = creeStore(registreUtilisateur);
        expect(store.getters.estTermine).toBe(false);
      });

      it("faux lorsque toute les situations n'ont pas été faites", function () {
        registreUtilisateur.situationsFaites = () => [];
        const store = creeStore(registreUtilisateur);
        store.commit('metsAJourSituations', [situation]);
        expect(store.getters.estTermine).toBe(false);
      });

      it('vraie lorsque toute les situations ont été faites', function () {
        registreUtilisateur.situationsFaites = () => ['inventaire'];
        const store = creeStore(registreUtilisateur);
        store.commit('metsAJourSituations', [situation]);
        expect(store.getters.estTermine).toBe(true);
      });

      it("toujours vraie lorsque qu'on dépasse le nombre de situations à faire", function () {
        registreUtilisateur.situationsFaites = () => ['inventaire', 'tri'];
        const store = creeStore(registreUtilisateur);
        store.commit('metsAJourSituations', [situation]);
        expect(store.getters.estTermine).toBe(true);
      });
    });
  });
});
