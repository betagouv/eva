import JoueurAudioBuffer from 'commun/composants/joueur_audio_buffer';

describe('Joueur AudioBuffer', function () {
  let joueur;

  beforeEach(function () {
    joueur = new JoueurAudioBuffer();
  });

  afterEach(function () {
    jest.useRealTimers();
  });

  it('peut stoper un buffer non démarré', () => {
    jest.useFakeTimers('legacy');
    joueur.stop();
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });
});
