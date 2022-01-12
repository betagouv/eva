import JoueurAudioBuffer from 'commun/composants/joueur_audio_buffer';

describe('Joueur AudioBuffer', function () {
  let joueur;
  let started = false;
  let stopCount = 0;

  beforeEach(function () {
    joueur = new JoueurAudioBuffer();
    jest.useFakeTimers('legacy');
  });

  afterEach(function () {
    jest.useRealTimers();
  });

  it('peut stoper un buffer non démarré', function () {
    joueur.stop();
    expect(stopCount).toEqual(0);
    expect(clearTimeout).toHaveBeenCalledTimes(0);
  });

  describe('Peut démarrer puis stoper un buffer', function () {
    beforeEach(function () {
      joueur.start({
        start: () => { started = true; },
        stop: () => { stopCount += 1; },
        buffer: { duration: 3 }
      }, () => {});
    });

    it('peut démarrer un son', function () {
      expect(started).toBe(true);
    });

    it('peut stoper deux fois', function () {
      joueur.stop();
      joueur.stop();
      expect(stopCount).toEqual(1);
      expect(clearTimeout).toHaveBeenCalledTimes(1);
    });
  });
});
