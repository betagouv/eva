import MockAudioNode from '../aides/mock_audio_node';
const chargeurDefaut = () => Promise.resolve(() => {});

export default function (chargeurs = {}) {
  return {
    svg: chargeurDefaut,
    wav: () => Promise.resolve(() => new MockAudioNode()),
    png: chargeurDefaut,
    jpg: chargeurDefaut,
    ...chargeurs
  };
}
