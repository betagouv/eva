import JoueurConsigne from 'commun/composants/joueur_consigne';

import MockAudioNode from '../aides/mock_audio_node';

describe('joueur de consigne', function () {
  let uneConsigne;
  let joueur;

  beforeEach(function () {
    uneConsigne = new MockAudioNode();
    const depot = {
      consigneDemarrage: () => uneConsigne
    };
    joueur = new JoueurConsigne(depot, 'consigneDemarrage');
  });

  afterEach(function () {
    joueur.stop();
    jest.useRealTimers();
  });

  it('joue la consigne du dépôt', function (done) {
    uneConsigne.start = done;
    joueur.joue(false, () => {});
  });

  it('appelle la callback de fin après la lecture de la consigne', function (done) {
    let consigneJouee = false;
    uneConsigne.start = () => { consigneJouee = true; };
    joueur.joue(() => {
      expect(consigneJouee).toBe(true);
      done();
    });
  });

  it('peut stoper la consigne en cours', () => {
    jest.useFakeTimers('legacy');
    let consigneStopee = false;
    uneConsigne.stop = () => {
      consigneStopee = true;
    };
    joueur.joue(false, () => { });
    joueur.stop();
    expect(consigneStopee).toBe(true);
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });
});
