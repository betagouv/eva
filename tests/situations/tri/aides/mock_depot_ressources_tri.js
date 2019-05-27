import MockAudioNode from '../../commun/aides/mock_audio_node';

export default class MockDepotRessources {
  fondSituation () {
    return { src: 'test' };
  }

  piece () {}

  sonBonBac () {
    return new MockAudioNode();
  }

  sonMauvaisBac () {
    return new MockAudioNode();
  }
}
