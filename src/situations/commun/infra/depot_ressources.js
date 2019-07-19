const chargeurAudio = function (src, timeout = 2000) {
  const request = new window.XMLHttpRequest();

  request.open('GET', src, true);
  request.responseType = 'arraybuffer';

  const promesse = new Promise((resolve, reject) => {
    request.onload = function () {
      if (window.AudioContext) {
        const audioCtx = new window.AudioContext();
        audioCtx.decodeAudioData(request.response,
          function (buffer) {
            resolve(() => {
              const source = audioCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(audioCtx.destination);
              return source;
            });
          },
          reject);
      } else {
        resolve(() => {
          const audio = new window.Audio();
          audio.src = src;
          audio.start = audio.play;
          audio.stop = audio.pause;
          return audio;
        });
      }
    };
  });

  request.send();
  return promesse;
};

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

function chargeurJSON (src) {
  return window.fetch(src)
    .then((response) => response.json())
    .then((json) => { return () => json; });
}

const CHARGEURS = {
  'wav': chargeurAudio,
  'png': chargeurImage,
  'svg': chargeurImage,
  'jpg': chargeurImage,
  'json': chargeurJSON
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

  chargeContexte (contexte) {
    const ressources = contexte.keys().map(contexte);
    this.charge(ressources);
  }

  chargement () {
    return Promise.all(this.promesses);
  }

  ressource (idRessource) {
    const message = "Tentative de chargement d'une ressource dont le nom est `undefined`";
    if (idRessource === undefined) throw new Error(message);
    return this.cloneursRessource[idRessource]();
  }
}

export { chargeurAudio };
