import DepotJournal from 'commun/infra/depot_journal';

describe('le depot du journal', function () {
  it('fait un POST des lignes du journal vers le serveur', function () {
    const requetes = [];
    const depot = new DepotJournal({ ajax (params) { requetes.push(params); } });
    depot.enregistre({ autreCle: 'valeur2', description: { cle: 'valeur2' } });

    expect(requetes.length).to.equal(1);
    expect(requetes[0].type).to.equal('POST');
  });

  it('retourne une promesse standard javascript', function () {
    const depot = new DepotJournal({ ajax (params) {} });

    expect(depot.enregistre({})).to.be.a(Promise);
  });

  it('peut attendre la fin de tous les enregistrements', function (done) {
    const requetes = [];
    const depot = new DepotJournal({ ajax (params) { requetes.push(params); } });
    depot.enregistre({});
    depot.enregistre({});

    depot.attendFinEnregistrement().finally(() => { done(); });

    requetes.forEach((requete) => { requete.success(); });
  });
});
