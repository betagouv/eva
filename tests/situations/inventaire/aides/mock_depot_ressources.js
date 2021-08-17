import MockAudioNode from '../../commun/aides/mock_audio_node';

export default class MockDepotRessourcesInventaire {
  croixRetourStock () {
    return { src: 'croix' };
  }

  loupe () {
    return { src: 'loupe' };
  }

  retourStock () {
    return { src: 'retour-stock' };
  }

  boutonSaisie () {
    return { src: 'bouton-saisie' };
  }

  sonEchec () {
    return new MockAudioNode();
  }

  sonReussite () {
    return new MockAudioNode();
  }
}
