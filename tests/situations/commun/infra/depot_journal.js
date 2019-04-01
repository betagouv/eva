import { DepotJournal } from 'commun/infra/depot_journal';
import jsdom from 'jsdom-global';

describe('le depot du journal', function () {
  let journal;
  let requetes = [];

  beforeEach(function () {
    jsdom('', { url: 'http://localhost' });
    requetes = [];
    journal = new DepotJournal({ ajax (params) { requetes.push(params); } });
  });

  it('fait un POST des lignes du journal vers le serveur', function () {
    journal.enregistre({ autreCle: 'valeur2', description: { cle: 'valeur2' } });

    expect(requetes.length).to.equal(1);
    expect(requetes[0]['type']).to.equal('POST');
  });

  it('vérifie la conformité des données récupèrées', function () {
    const donnees = { cle: 'valeur2' };
    const payload = journal.recuperePayload({ autreCle: 'valeur2', sessionId: 'ma session id', donnees, situation: 'controle' });

    expect(payload['donnees']).to.equal(donnees);
    expect(payload['session_id']).to.equal('ma session id');
    expect(payload['situation']).to.equal('controle');
  });
});
