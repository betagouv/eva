const chargeurDefaut = () => Promise.resolve(() => {});

export default function (chargeurs = {}) {
  return {
    svg: chargeurDefaut,
    mp3: chargeurDefaut,
    png: chargeurDefaut,
    ...chargeurs
  };
}
