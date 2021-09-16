import DepotJournal from 'commun/infra/depot_journal';
import RegistreUtilisateur from 'commun/infra/registre_utilisateur';

describe('le depot du journal', function () {
  const requetes = [];

  beforeEach(function () {
    window.localStorage.clear();
  });

  describe('#enregistre()', function () {
    it('fait un POST des lignes du journal vers le serveur', function () {
      const depot = new DepotJournal({ ajax (params) { requetes.push(params); } });
      depot.enregistre({ autreCle: 'valeur2', description: { cle: 'valeur2' } });

      expect(requetes.length).toBe(1);
      expect(requetes[0].type).toBe('POST');
    });

    it('retourne une promesse standard javascript', function () {
      const depot = new DepotJournal({ ajax (params) {} });

      expect(depot.enregistre({})).toBeInstanceOf(Promise);
    });
  });

  describe('#attendFinEnregistrement()', function () {
    it('peut attendre la fin de tous les enregistrements', function (done) {
      const depot = new DepotJournal({ ajax (params) { requetes.push(params); } });
      depot.enregistre({});
      depot.enregistre({});

      depot.attendFinEnregistrement().finally(done);

      requetes.forEach((requete) => { requete.success(); });
    });
  });

  describe('#enregistreEnLocale()', function () {
    const registre = new RegistreUtilisateur();
    const depot = new DepotJournal({ ajax (params) { requetes.push(params); } }, registre);

    beforeEach(function () {
      registre.idClient = function () { return 'id_client'; };
    });

    describe("quand il y a déjà des événements d'enregistrés", function () {
      it('ajoute un nouvel évènement à la liste', function () {
        window.localStorage.setItem('evenements_id_client', JSON.stringify([{ id: 1 }]));
        const payload = { id: 2 };

        depot.enregistreEvenementEnLocale(payload);

        const resultat = [{ id: 1 }, { id: 2 }];
        expect(window.localStorage.getItem('evenements_id_client')).toBe(JSON.stringify(resultat));
      });
    });

    describe("quand il n'y a pas d'événements d'enregistrés", function () {
      it("ajoute l'évènement dans le localStorage", function () {
        const payload = { id: 1 };

        depot.enregistreEvenementEnLocale(payload);

        const resultat = [{ id: 1 }];
        expect(window.localStorage.getItem('evenements_id_client')).toBe(JSON.stringify(resultat));
      });
    });
  });

  describe('#cleEvenementsPourLocalStorage()', function () {
    it("retourne la clé pour les événements d'un id client", function () {
      const registre = new RegistreUtilisateur();
      const depot = new DepotJournal({ ajax (params) { requetes.push(params); } }, registre);
      registre.idClient = function () { return 'id_client'; };

      expect(depot.cleEvenementsPourLocalStorage()).toBe('evenements_id_client');
    });
  });
});
