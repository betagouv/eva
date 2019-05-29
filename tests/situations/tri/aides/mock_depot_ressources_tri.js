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

  fondChronometre () {
    return {
      src: 'image-de-chronometre'
    };
  }

  aiguilleLongue () {
    return {
      src: 'image-aiguille-longue'
    };
  }

  aiguilleCourte () {
    return {
      src: 'image-aiguille-courte'
    };
  }
}
