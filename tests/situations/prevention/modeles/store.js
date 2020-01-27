import { creeStore } from 'prevention/modeles/store';

describe('Le store de la situation sécurité', function () {
  it("permet la configuration d'un acte", function () {
    const store = creeStore();
    const zones = [{ x: 1, y: 2, r: 3 }];
    store.commit('configureActe', { zones, fondSituation: 'fond' });
    expect(store.state.zones.length).to.eql(1);
    expect(store.state.fondSituation).to.eql('fond');
  });

  it("permet l'évaluation d'une zone", function () {
    const store = creeStore();
    const zones = [{ id: 'zone-test', x: 1, y: 2, r: 3 }];
    store.commit('configureActe', { zones, fondSituation: 'fond' });
    expect(store.getters.evaluationZone('zone-test')).to.eql(null);
    store.commit('selectionEvaluation', { id: 'zone-test', panneau: 'ok' });
    expect(store.getters.evaluationZone('zone-test')).to.eql('ok');
  });

  it("permet l'enregistrement de la prévention d'une zone", function () {
    const store = creeStore();
    const zones = [{ id: 'zone-test', x: 1, y: 2, r: 3 }];
    store.commit('configureActe', { zones, fondSituation: 'fond' });
    expect(store.getters.preventionZone('zone-test')).to.be(null);
    store.commit('selectionPrevention', { id: 'zone-test' });
    expect(store.getters.preventionZone('zone-test')).to.be(true);
  });
});
