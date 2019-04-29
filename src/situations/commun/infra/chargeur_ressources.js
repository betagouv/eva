export function chargeurAudio (src) {
  const audio = new window.Audio(src);
  return new Promise((resolve, reject) => {
    audio.addEventListener('canplaythrough', resolve);
    audio.addEventListener('error', reject);
  });
}

export function chargeurImage (src) {
  const img = new window.Image();
  const promesse = new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });
  img.src = src;
  return promesse;
}

export const CHARGEURS = {
  'mp3': chargeurAudio,
  'png': chargeurImage
};

export default class ChargeurRessources {
  constructor (chargeurs = CHARGEURS) {
    this.chargeurs = chargeurs;
    this.promesses = [];
  }

  charge (contexte) {
    contexte.keys().forEach((key) => {
      const promesse = this.chargeurs[key.match(/\.([^.]+)$/)[1]](contexte(key));
      this.promesses.push(promesse);
    });
  }

  chargement () {
    return Promise.all(this.promesses);
  }
}
