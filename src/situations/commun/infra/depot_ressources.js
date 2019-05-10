function chargeurAudio (src) {
  const audio = new window.Audio(src);

  return new Promise((resolve, reject) => {
    audio.addEventListener('canplaythrough', () => {
      resolve(() => new window.Audio(src));
    });

    audio.addEventListener('error', reject);
  });
}

function chargeurImage (src) {
  const img = new window.Image();
  const promesse = new Promise((resolve, reject) => {
    img.onload = () => {
      resolve(() => {
        const clone = new window.Image();
        clone.src = src;
        return clone;
      });
    };

    img.onerror = reject;
  });
  img.src = src;
  return promesse;
}

const CHARGEURS = {
  'mp3': chargeurAudio,
  'png': chargeurImage,
  'svg': chargeurImage,
  'jpg': chargeurImage
};

export default class DepotRessources {
  constructor (chargeurs = CHARGEURS) {
    this.chargeurs = chargeurs;
    this.promesses = [];
    this.cloneursRessource = {};
  }

  charge (ressources) {
    const promesses = ressources.map((ressource) => {
      const extension = ressource.match(/\.([^.]+)$/)[1];
      const chargeur = this.chargeurs[extension];

      return chargeur(ressource).then((cloneur) => {
        this.cloneursRessource[ressource] = cloneur;
      });
    });

    this.promesses.push(...promesses);
  }

  chargement () {
    return Promise.all(this.promesses);
  }

  ressource (idRessource) {
    return this.cloneursRessource[idRessource]();
  }
}
