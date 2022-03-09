import MockAudioNode from '../aides/mock_audio_node';
export const chargeurDefaut = (src) => Promise.resolve(() => { return src; });

export default function (chargeurs = {}) {
  return {
    svg: chargeurDefaut,
    mp3: () => Promise.resolve(() => new MockAudioNode()),
    mp4: chargeurDefaut,
    png: chargeurDefaut,
    jpg: chargeurDefaut,
    jpeg: chargeurDefaut,
    ...chargeurs
  };
}
