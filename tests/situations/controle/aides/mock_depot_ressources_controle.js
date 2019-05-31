import MockAudioNode from '../../commun/aides/mock_audio_node';

export default class MockDepotRessources {
  fondSonore () {
    return new MockAudioNode();
  }

  fondSituation () {
    return { src: '' };
  }

  tapis () {
    return { src: '' };
  }
}
