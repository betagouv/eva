let audioCtx;

function chargeurAudio (src, timeout = 2000) {
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  const request = new window.XMLHttpRequest();

  request.open('GET', src, true);
  request.responseType = 'arraybuffer';

  const promesse = new Promise((resolve, reject) => {
    request.onload = function () {
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
    };
  });

  request.send();
  return promesse;
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

function chargeurJSON (src) {
  return window.fetch(src)
    .then(res => {
      if (res.ok) {
        return res;
      } else {
        throw Error(`Le chargement de la resources ${src} a échoué avec le code ${res.status}`);
      }
    })
    .then((response) => response.json())
    .then((json) => { return () => json; });
}

const CHARGEURS = {
  wav: chargeurAudio,
  png: chargeurImage,
  svg: chargeurImage,
  jpg: chargeurImage,
  json: chargeurJSON
};

export default class DepotRessources {
  constructor (chargeurs = CHARGEURS) {
    this.chargeurs = chargeurs;
    this.promesses = [];
    this.cloneursRessource = {};
  }

  charge (ressources) {
    const promesses = ressources.map(ressource => this.promesseRessource(ressource));

    this.promesses.push(...promesses);
  }

  promesseRessource (ressource) {
    const extension = ressource.match(/\.([^.]+)$/)[1];
    const chargeur = this.chargeurs[extension];
    if (chargeur === undefined) {
      throw new Error(
        `Aucun chargeur disponible pour l'extension '${extension}'. Impossible de charger la ressource '${ressource}'`
      );
    }
    return chargeur(ressource).then((cloneur) => {
      this.cloneursRessource[ressource] = cloneur;
    });
  }

  setRessource (cle, valeur) {
    const maFunction = (opt) => {
      const promesse = new Promise((resolve, reject) => {
        resolve(() => {
          return valeur;
        });
      });
      return promesse;
    };
    return maFunction(valeur).then((result) => {
      this.cloneursRessource[cle] = result;
    });
  }

  chargeContexte (contexte) {
    const ressources = contexte.keys().map(contexte);
    this.charge(ressources);
  }

  chargement () {
    return Promise.all(this.promesses);
  }

  ressource (idRessource) {
    const chargeur = this.cloneursRessource[idRessource];
    if (chargeur === undefined) {
      throw new Error(
        `Tentative de chargement d'une ressource dont le nom est '${idRessource}'`
      );
    }
    return chargeur();
  }
}

export { chargeurAudio, chargeurJSON };
