import RegistreCampagne from 'commun/infra/registre_campagne';

describe('le registre campagne', function () {
  function unRegistre (id, nom, urlServeur, enLigne = true) {
    return new RegistreCampagne({
      ajax (options) {
        if (enLigne) {
          options.success({ id, nom });
        } else {
          options.error({ status: 0 });
        }
      }
    }, urlServeur);
  }

  beforeEach(function () {
    window.localStorage.clear();
  });

  describe('cleCampagnePourLocalStorage', function () {
    it('retourne la clé de la campagne du localStorage', function () {
      const registre = unRegistre(1, 'autre test');
      expect(registre.cleCampagnePourLocalStorage('code de ma campagne')).toEqual('campagne_code de ma campagne');
    });
  });

  describe('assigneCampagneCourante', function () {
    it('enregistre le code campagne de la campagne courante', function () {
      const registre = new RegistreCampagne();
      registre.assigneCampagneCourante('code de ma campagne');

      expect(window.localStorage.getItem('campagneCourante')).toEqual('code de ma campagne');
    });
  });

  describe('recupereCampagneCourante', function () {
    beforeEach(function () {
      window.localStorage.setItem('campagneCourante', 'demo');
    });

    describe('quand la campagne existe en locale', function () {
      beforeEach(function () {
        window.localStorage.setItem('campagne_demo', '{ "id": 1 }');
      });

      it('retourne la campagne courante sauvegardé en locale', function () {
        const registre = new RegistreCampagne();

        expect(registre.recupereCampagneCourante()).toEqual({ id: 1 });
      });
    });
  });

  describe('recupereCampagneEnLocale', function () {
    it('récupère la campagne sauvegardé en locale', function () {
      window.localStorage.setItem('campagne_demo', '{ "id": 1 }');
      const registre = new RegistreCampagne();

      expect(registre.recupereCampagneEnLocale('demo')).toEqual({ id: 1 });
    });
  });

  describe('recupereCampagne', function () {
    describe('quand on est en ligne', function () {
      it('enregistre les informations de la campagne en locale', function () {
        const registre = unRegistre(1, 'autre test');
        return registre.recupereCampagne('campagne1').then((campagne) => {
          expect(window.localStorage.campagne_campagne1).toEqual('{"id":1,"nom":"autre test"}');
          expect(campagne).toEqual({ id: 1, nom: 'autre test' });
        });
      });

      it('retourne une erreur si le code campagne est inconnu', function () {
        const registre = new RegistreCampagne({
          ajax (options) {
            options.error({ status: 404 });
          }
        }, 'any url', { onLine: true });
        return registre.recupereCampagne('inconnu').catch((erreur) => {
          expect(erreur.message).toEqual('accueil.erreurs.code_campagne_inconnu');
        });
      });

      it('Propage les autres erreurs', function () {
        const uneErreur = { status: 500 };
        const registre = new RegistreCampagne({
          ajax (options) {
            options.error(uneErreur);
          }
        }, 'any url', { onLine: true });
        return registre.recupereCampagne('inconnu').catch((erreur) => {
          expect(erreur).toEqual(uneErreur);
        });
      });
    });

    describe('quand on est pas en ligne', function () {
      let registre;
      beforeEach(function () {
        registre = unRegistre(1, 'autre test', 'https://serveur.com/', false);
      });

      describe('mode horsligne active', function () {
        beforeEach(function () {
          registre.enregistreModeHorsLigne(true);
        });

        describe('quand la campagne existe en locale', function () {
          beforeEach(function () {
            window.localStorage.campagne_campagne1 = JSON.stringify({ id: 1, nom: 'autre test' });
          });

          it("retourne une promesse où tout s'est bien passée", function () {
            return registre.recupereCampagne('campagne1').then((campagne) => {
              expect(campagne).toEqual({ id: 1, nom: 'autre test' });
            });
          });
        });

        describe("quand la campagne n'existe pas en locale", function () {
          it('retourne une promesse avec une erreur gérée', function () {
            return registre.recupereCampagne('campagne_absente').catch((erreur) => {
              expect(erreur.message).toEqual('accueil.erreurs.code_campagne_inconnu');
              expect(erreur.name).toEqual('ErreurCampagne');
            });
          });
        });
      });

      describe('mode horsligne non activé', function () {
        beforeEach(function () {
          registre.enregistreModeHorsLigne(false);
        });
        it("retourne l'erreur réseau", function () {
          return registre.recupereCampagne('campagne_absente').catch((erreur) => {
            expect(erreur.status).toEqual(0);
          });
        });
      });
    });
  });
});
