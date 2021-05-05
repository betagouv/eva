import Evenement from 'commun/modeles/evenement';

describe("l'événement", function () {
  it('retourne son nom', function () {
    expect(new Evenement('test', {}).nom()).toEqual('test');
  });

  it('retourne ses donnéees', function () {
    expect(new Evenement().donnees()).toEqual({});
  });
});
