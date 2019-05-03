import MockAudio from './mock_audio';
const chargeurDefaut = () => Promise.resolve(() => {});

export default function (chargeurs = {}) {
  return {
    svg: chargeurDefaut,
    mp3: () => Promise.resolve(() => new MockAudio()),
    png: chargeurDefaut,
    ...chargeurs
  };
}
