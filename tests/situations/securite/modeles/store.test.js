import { creeStore } from 'securite/modeles/store';

describe('Le store de la situation sécurité', function () {
  it("permet la configuration d'un acte", function () {
    const store = creeStore();
    const zones = [{ x: 1, y: 2, r: 3 }];
    const dangers = { danger1: {} };
    store.commit('configureActe', { zones, dangers, fondSituation: 'fond' });
    expect(store.state.zones).toEqual(zones);
    expect(store.state.dangers).toEqual(dangers);
    expect(store.state.fondSituation).toEqual('fond');
  });

  it("réinitialise les dangers qualifiés et l'aide a la configuration de l'acte", function () {
    const store = creeStore();
    const zones = [{ x: 1, y: 2, r: 3 }];
    const dangers = { danger1: {} };
    store.commit('configureActe', { zones, dangers });
    const qualification = { nom: 'danger1', choix: 'bonne' };
    store.commit('ajouteDangerQualifie', qualification);
    store.commit('ajouteNonDangerIdentifie', 'zone1');
    store.commit('activeAide');
    store.commit('configureActe', { zones, dangers });
    expect(store.state.dangersQualifies).toEqual({});
    expect(store.state.aide).toBe(false);
    expect(store.state.nonDangersIdentifies).toEqual([]);
  });

  it('permet de stocker les dangers qualifiés', function () {
    const store = creeStore();
    expect(store.state.dangersQualifies).toEqual({});
    const qualification = { nom: 'danger1', choix: 'bonne' };
    store.commit('ajouteDangerQualifie', qualification);
    expect(store.state.dangersQualifies).toEqual({ danger1: 'bonne' });
  });

  it('permet de stocker une seule fois un danger qualifié', function () {
    const store = creeStore();
    expect(store.state.dangersQualifies).toEqual({});
    const qualification = { nom: 'danger1', choix: 'mauvaise' };
    const qualification2 = { nom: 'danger1', choix: 'bonne' };
    store.commit('ajouteDangerQualifie', qualification);
    store.commit('ajouteDangerQualifie', qualification2);
    expect(store.state.dangersQualifies).toEqual({ danger1: 'bonne' });
  });

  it("peut donner la qualification d'un danger", function () {
    const store = creeStore();
    expect(store.getters.qualification('danger1')).toEqual(undefined);
    const qualification = { nom: 'danger1', choix: 'mauvaise' };
    store.commit('ajouteDangerQualifie', qualification);
    expect(store.getters.qualification('danger1')).toEqual('mauvaise');
  });

  it('peut donner le nombre de danger qualifiés', function () {
    const store = creeStore();
    expect(store.getters.nombreDangersQualifies).toEqual(0);
    const qualification = { nom: 'danger1', choix: 'mauvaise' };
    store.commit('ajouteDangerQualifie', qualification);
    expect(store.getters.nombreDangersQualifies).toEqual(1);
  });

  it('permet de stocker les non dangers identifiés', function () {
    const store = creeStore();
    expect(store.state.nonDangersIdentifies).toEqual([]);
    store.commit('ajouteNonDangerIdentifie', 'zone1');
    expect(store.state.nonDangersIdentifies).toEqual(['zone1']);
    store.commit('ajouteNonDangerIdentifie', 'zone1');
    expect(store.state.nonDangersIdentifies).toEqual(['zone1']);
  });
});
