function chargeurAudio (src) {
  const audio = new window.Audio(src);
  return new Promise((resolve, reject) => {
    audio.addEventListener('canplaythrough', resolve);
    audio.addEventListener('error', reject);
  });
}

function chargeurImage (src) {
  const img = new window.Image();
  const promesse = new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });
  img.src = src;
  return promesse;
}

const CHARGEURS = {
  'mp3': chargeurAudio,
  'png': chargeurImage,
  'svg': chargeurImage
};

export default class ChargeurRessources {
  constructor (chargeurs = CHARGEURS) {
    this.chargeurs = chargeurs;
    this.promesses = [];
  }

  charge (ressources) {
    this.promesses.push(...ressources.map((ressource) => {
      return this.chargeurs[ressource.match(/\.([^.]+)$/)[1]](ressource);
    }));
  }

  chargement () {
    return Promise.all(this.promesses);
  }
}
