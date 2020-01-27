import { creeStore } from 'prevention/modeles/store';

describe('Le store de la situation sécurité', function () {
  it("permet la configuration d'un acte", function () {
    const store = creeStore();
    const zones = [{ x: 1, y: 2, r: 3 }];
    store.commit('configureActe', { zones, fondSituation: 'fond' });
    expect(store.state.zones).to.eql(zones);
    expect(store.state.fondSituation).to.eql('fond');
  });

  it("permet l'évaluation d'une zone", function () {
    const store = creeStore();
    const zones = [{ id: 'zone-test', x: 1, y: 2, r: 3 }];
    store.commit('configureActe', { zones, fondSituation: 'fond' });
    store.commit('previentZone', { id: 'zone-test', panneau: 'ok' });
    expect(store.state.evaluationZones).to.eql({ 'zone-test': 'ok' });
    expect(store.getters.evaluationZone('zone-test')).to.eql('ok');
  });
});
