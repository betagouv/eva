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

  describe("#enregistre()", function () {
    it("enregistre l'événement dans le localStorage sans requête au serveur", function () {
      depot.enregistre({ id: 1 });
      depot.enregistre({ id: 2 });

      expect(requetes.length).toBe(0);
      expect(window.localStorage.getItem("evenements_id_client")).toBe('[{"id":1},{"id":2}]');
    });

    it("retourne une promesse résolue", async function () {
      await expect(depot.enregistre({ id: 1 })).resolves.toBeUndefined();
    });

    describe("quand le localStorage est plein", function () {
      beforeEach(function () {
        jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
          throw new DOMException("plein", "QuotaExceededError");
        });
      });

      afterEach(function () {
        Storage.prototype.setItem.mockRestore();
      });

      it("garde l'événement en mémoire", async function () {
        await expect(depot.enregistre({ id: 1 })).resolves.toBeUndefined();

        expect(depot.evenementsEnMemoire).toEqual([{ id: 1 }]);
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

  describe('#creeEvenements()', function () {
    let evenements;

    beforeEach(function () {
      evenements = [{ autreCle: 'valeur2', description: { cle: 'valeur2' } }];
      window.localStorage.setItem('evenements_id_client', JSON.stringify(evenements));
    });

    it("fait un POST pour l'ensemble des évènements à partir d'un id client", function () {
      depot.creeEvenements('id_client', 'id_evaluation');

      expect(requetes.length).toBe(1);
      expect(requetes[0].type).toBe('POST');
      expect(requetes[0].url).toBe(`${process.env.URL_API}/api/evaluations/id_evaluation/collections_evenements`);
      expect(requetes[0].data)
        .toEqual('{"evenements":[{"autreCle":"valeur2","description":{"cle":"valeur2"}}]}');
    });

    it("retourne une promesse d'enregistrement", function (done) {
      depot.creeEvenements('id_client', 'id_evaluation').then(done);

      requetes[0].success();
    });

    it('supprime les évènements du localStorage en cas de succès', function (done) {
      depot.creeEvenements('id_client', 'id_evaluation').then(() => {
        expect(window.localStorage.getItem('evenements_id_client')).toBe(null);
        done();
      });

      requetes[0].success();
    });

    it("rejete la promesse en cas d'erreur", function (done) {
      const error = { status: 0 };
      depot.creeEvenements('id_client', 'id_evaluation').catch((xhr) => {
        expect(xhr).toEqual(error);
        done();
      });

      requetes[0].error(error);
    });

    describe("quand il n'y a pas d'évènements dans le localStorage", function () {
      it('ne fais rien', function () {
        depot.creeEvenements('id_client_innexistant', 'id_evaluation');

        expect(requetes.length).toBe(0);
      });
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

  describe('#evenements()', function () {
    it("retourne une liste d'évènements à partir d'un IdClient", function () {
      const listeEvenements = [{ id: 1 }];
      window.localStorage.setItem('evenements_id_client', JSON.stringify(listeEvenements));

      expect(depot.evenements('id_client')).toStrictEqual(listeEvenements);
    });

    describe("quand il n'y a pas d'évènements pour un IdClient", function () {
      it('retourne une liste vide', function () {
        expect(depot.evenements('inconnu')).toStrictEqual([]);
      });
    });
  });

  describe('#clePourLocalStorage()', function () {
    it("retourne la clé pour les événements d'un id client", function () {
      expect(depot.clePourLocalStorage('id_client')).toBe('evenements_id_client');
    });
  });
});
