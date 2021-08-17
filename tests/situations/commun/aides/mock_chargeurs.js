import MockAudioNode from '../aides/mock_audio_node';
export const chargeurDefaut = (src) => Promise.resolve(() => { return src; });

export default function (chargeurs = {}) {
  return {
    svg: chargeurDefaut,
    wav: () => Promise.resolve(() => new MockAudioNode()),
    png: chargeurDefaut,
    jpg: chargeurDefaut,
    jpeg: chargeurDefaut,
    ...chargeurs
  };
}
