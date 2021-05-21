import RegistreCampagne from 'commun/infra/registre_campagne';

describe('le registre campagne', function () {
  function unRegistre (id, nom, urlServeur, enLigne = true) {
    return new RegistreCampagne({
      ajax (options) {
        options.success({ id, nom });
      }
    }, urlServeur, { onLine: enLigne });
  }

  beforeEach(function () {
    window.localStorage.clear();
  });

  describe('cleCampagnePourLocalStorage', function () {
    it('retourne la clé de la campagne du localStorage', function () {
      const registre = unRegistre(1, 'autre test');
      expect(registre.cleCampagnePourLocalStorage('code de ma campagne')).to.eql('campagne_code de ma campagne');
    });
  });

  describe('recupereCampagne', function () {
    describe('quand on est en ligne', function () {
      it('enregistre les informations de la campagne en locale', function () {
        const registre = unRegistre(1, 'autre test');
        return registre.recupereCampagne('campagne1').then((campagne) => {
          expect(window.localStorage.campagne_campagne1).to.eql('{"id":1,"nom":"autre test"}');
          expect(campagne).to.eql({ id: 1, nom: 'autre test' });
        });
      });

      it('retourne une erreur si le code campagne est inconnu', function () {
        const registre = new RegistreCampagne({
          ajax (options) {
            options.error({ status: 404 });
          }
        }, 'any url', { onLine: true });
        return registre.recupereCampagne('inconnu').then((erreur) => {
          expect(erreur.message).to.eql('Code inconnu');
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
          expect(erreur).to.eql(uneErreur);
        });
      });
    });

    describe('quand on est pas en ligne', function () {
      describe('quand la campagne existe en locale', function () {
        beforeEach(function () {
          window.localStorage.campagne_campagne1 = JSON.stringify({ id: 1, nom: 'autre test' });
        });

        it("retourne une promesse où tout s'est bien passée", function () {
          const registre = unRegistre(1, 'autre test', 'https://serveur.com/', false);
          return registre.recupereCampagne('campagne1').then((campagne) => {
            expect(campagne).to.eql({ id: 1, nom: 'autre test' });
          });
        });
      });

      describe("quand la campagne n'existe pas en locale", function () {
        it('retourne une promesse avec une erreur gérée', function () {
          const registre = unRegistre(1, 'autre test', 'https://serveur.com/', false);
          return registre.recupereCampagne('campagne_absente').catch((erreur) => {
            expect(erreur.message).to.eql('Code campagne inconnu ou erreur réseau');
            expect(erreur.name).to.eql('ErreurCampagne');
          });
        });
      });
    });
  });
});
