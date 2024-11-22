let audioCtx;

function chargeurAudio (src) {
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  const request = new window.XMLHttpRequest();

  request.open('GET', src, true);
  request.responseType = 'arraybuffer';

  return new Promise((resolve, reject) => {
    request.onload = function () {
      if (request.status >= 200 && request.status < 300) {
        audioCtx.decodeAudioData(
          request.response,
          function (buffer) {
            resolve(() => {
              const source = audioCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(audioCtx.destination);
              return source;
            });
          },
          function (erreur) {
            reject(new Error(`Erreur au décodage de ${src} : ${erreur.message}`));
          }
        );
      } else {
        reject(new Error(`Échec de la requête : HTTP ${request.status}`));
      }
    };

    // Gestion des erreurs réseau (CORS ou autres)
    request.onerror = function () {
      reject(new Error(`Erreur réseau ou problème CORS lors de l'accès à ${src}`));
    };

    // Envoi de la requête
    request.send();
  });
}

function chargeurVideo (src) {
  var request = new window.XMLHttpRequest();
  request.open('GET', src, true);
  request.responseType = 'blob';

  const promesse = new Promise((resolve, reject) => {
    request.onload = function() {
      if (request.status === 200) {
        resolve(() => {
          return request.response;
        });
      }
    };
    request.onerror = function() {
      reject(new Error(`Erreur au chargement de ${src}`));
    };
    request.onprogress = function(e){
      if(e.lengthComputable) {
        var percentComplete = ((e.loaded/e.total)*100|0) + '%';
        console.log('progress: ', src, percentComplete);
      }
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
  mp3: chargeurAudio,
  mp4: chargeurVideo,
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

function extraitDictionnaire (webpackContext, regExp, dictionnaire = {}) {
  return webpackContext.keys().reduce((dictionnaire, fichier) => {
    dictionnaire[fichier.match(regExp)[1]] = webpackContext(fichier);
    return dictionnaire;
  }, dictionnaire);
}

function extraitQuestionsReponsesAudios(questions) {
  return questions.reduce((acc, question) => {
    const { nom_technique, audio_url, intitule_audio, choix, consigne_audio } = question;

    if (audio_url) acc[nom_technique] = audio_url;
    if (intitule_audio) acc[`${nom_technique}_intitule`] = intitule_audio;
    if (consigne_audio) acc[`${nom_technique}_consigne`] = consigne_audio;

    choix?.forEach(({ nom_technique: choixNom, audio_url: choixAudio }) => {
      if (choixAudio) acc[choixNom] = choixAudio;
    });

    return acc;
  }, {});
}

export { chargeurJSON, extraitDictionnaire, extraitQuestionsReponsesAudios };
