import RegistreEvenements from 'commun/infra/registre_evenements';
import RegistreUtilisateur from 'commun/infra/registre_utilisateur';

describe('le registre des événements', function () {
  const requetes = [];
  let depot;
  let registreUtilisateur;

  beforeAll(function () {
    registreUtilisateur = new RegistreUtilisateur();
    jest.spyOn(registreUtilisateur, 'idClient').mockImplementation(() => 'id_client');
  });

  beforeEach(function () {
    window.localStorage.clear();
    requetes.length = 0;

    depot = new RegistreEvenements(registreUtilisateur, { ajax (params) { requetes.push(params); } });
  });

  describe('#enregistre()', function () {
    describe('quand on est en ligne', function () {
      beforeEach(function () {
        jest.spyOn(registreUtilisateur, 'activeModeHorsLigne').mockImplementation(() => false);
      });

      afterAll(function () {
        jest.useRealTimers();
      });

      it('fait un POST de chaque evenement du journal vers le serveur', function () {
        depot.enregistre({ autreCle: 'valeur2', description: { cle: 'valeur2' } });

        expect(requetes.length).toBe(1);
        expect(requetes[0].type).toBe('POST');
        expect(requetes[0].data)
          .toEqual('{"autreCle":"valeur2","description":{"cle":"valeur2"}}');
      });

      it("retourne une promesse d'enregistrement", function (done) {
        depot.enregistre({}).then(done);

        requetes[0].success();
      });

      it('re-essaye si le POST échoue', function (done) {
        jest.useFakeTimers();
        depot.enregistre({}).then(done);

        expect(requetes.length).toBe(1);
        requetes[0].error('xhr quelconque');

        jest.advanceTimersByTime(110);

        expect(requetes.length).toBe(2);
        requetes[1].success();
      });
    });

    describe('quand on est hors ligne', function () {
      beforeEach(function () {
        jest.spyOn(registreUtilisateur, 'activeModeHorsLigne').mockImplementation(() => true);
      });

      it('tente un POST puis enregistre en local', function (done) {
        depot.enregistre({}).then(done);

        expect(requetes.length).toBe(1);
        requetes[0].error();

        expect(window.localStorage.getItem('evenements_id_client')).toBe('[{}]');
      });
    });
  });

  describe('#attendFinEnregistrement()', function () {
    it('peut attendre la fin de tous les enregistrements', function (done) {
      depot.enregistre({});
      depot.enregistre({});

      depot.attendFinEnregistrement().finally(done);

      requetes.forEach((requete) => { requete.success(); });
    });
  });

  describe('#enregistreEvenementEnLocale()', function () {
    it('ajoute un premier évènement dans le localStorage', function () {
      const payload = { id: 1 };

      depot.enregistreEvenementEnLocale(payload);

      const resultat = JSON.stringify([{ id: 1 }]);
      expect(window.localStorage.getItem('evenements_id_client')).toBe(resultat);
    });

    it('ajoute un nouvel évènement à une liste existante', function () {
      window.localStorage.setItem('evenements_id_client', JSON.stringify([{ id: 1 }]));
      const payload = { id: 2 };

      depot.enregistreEvenementEnLocale(payload);

      const resultat = JSON.stringify([{ id: 1 }, { id: 2 }]);
      expect(window.localStorage.getItem('evenements_id_client')).toBe(resultat);
    });
  });

  describe('#cleEvenementsPourLocalStorage()', function () {
    it("retourne la clé pour les événements d'un id client", function () {
      expect(depot.cleEvenementsPourLocalStorage('id_client')).toBe('evenements_id_client');
    });
  });
});
