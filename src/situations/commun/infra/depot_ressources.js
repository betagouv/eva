let audioCtx;

const STATUTS_REESSAYABLES = [429, 502, 503, 504];

function erreurHttp (message, status) {
  const erreur = new Error(message);
  erreur.status = status;
  erreur.reessayable = STATUTS_REESSAYABLES.includes(status);
  return erreur;
}

function erreurReseau (message) {
  const erreur = new Error(message);
  erreur.reessayable = true;
  return erreur;
}

function fetchAvecErreurs (src) {
  return window.fetch(src)
    .catch((erreur) => {
      throw erreurReseau(`Erreur réseau lors de l'accès à ${src} : ${erreur.message}`);
    })
    .then(res => {
      if (res.ok) {
        return res;
      }
      throw erreurHttp(`Le chargement de la ressource ${src} a échoué avec le code ${res.status}`, res.status);
    });
}

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
            const message = erreur && erreur.message
              ? erreur.message
              : 'Erreur inconnue lors du décodage audio';
            reject(new Error(`Erreur au décodage de ${src} : ${message}`));
          }
        );
      } else {
        reject(erreurHttp(`Échec de la requête : HTTP ${request.status}`, request.status));
      }
    };

    // Gestion des erreurs réseau (CORS ou autres)
    request.onerror = function () {
      reject(erreurReseau(`Erreur réseau ou problème CORS lors de l'accès à ${src}`));
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
      } else {
        reject(erreurHttp(`Échec du chargement de ${src} : HTTP ${request.status}`, request.status));
      }
    };
    request.onerror = function() {
      reject(erreurReseau(`Erreur au chargement de ${src}`));
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

    // L'élément image ne donne pas le statut HTTP : on considère l'erreur comme temporaire.
    img.onerror = () => reject(erreurReseau(`Erreur au chargement de ${src}`));
  });
  img.src = src;
  return promesse;
}

function chargeurInlineSvg (src) {
  return fetchAvecErreurs(src)
    .then((response) => response.text())
    .then((svgText) => {
      const parser = new DOMParser();
      const svgDocument = parser.parseFromString(svgText, 'image/svg+xml');
      const svgElement = svgDocument.documentElement;
      return () => svgElement;
    });
}

function chargeurJSON (src) {
  return fetchAvecErreurs(src)
    .then((response) => response.json())
    .then((json) => { return () => json; });
}

const CHARGEURS = {
  mp3: chargeurAudio,
  mp4: chargeurVideo,
  png: chargeurImage,
  svg: chargeurImage,
  inlineSvg: chargeurInlineSvg,
  jpg: chargeurImage,
  json: chargeurJSON
};

const OPTIONS_PAR_DEFAUT = {
  maxSimultanes: 6,
  nombreEssais: 5,
  delaiInitial: 1000,
  attendre: (ms) => new Promise((resolve) => setTimeout(resolve, ms))
};

export default class DepotRessources {
  constructor (chargeurs = CHARGEURS, options = {}) {
    this.chargeurs = chargeurs;
    this.options = { ...OPTIONS_PAR_DEFAUT, ...options };
    this.promesses = [];
    this.cloneursRessource = {};
    this.fileAttente = [];
    this.nombreEnCours = 0;
  }

  charge (ressources, identifiantChargeur = null) {
    const promesses = ressources.map((ressource) => {
      const idChargeur = identifiantChargeur ?? ressource.match(/\.([^.]+)$/)[1];
      return this.promesseRessource(ressource, idChargeur);
    });

    this.promesses.push(...promesses);
  }

  promesseRessource (ressource, idChargeur) {
    const chargeur = this.chargeurs[idChargeur];
    if (chargeur === undefined) {
      throw new Error(
        `Aucun chargeur disponible pour '${idChargeur}'. Impossible de charger la ressource '${ressource}'`
      );
    }
    return this.planifie(() => this.chargeAvecReessais(chargeur, ressource))
      .then((cloneur) => {
        this.cloneursRessource[ressource] = cloneur;
      });
  }

  planifie (tache) {
    return new Promise((resolve, reject) => {
      this.fileAttente.push({ tache, resolve, reject });
      this.lanceTachesEnAttente();
    });
  }

  lanceTachesEnAttente () {
    while (this.nombreEnCours < this.options.maxSimultanes && this.fileAttente.length > 0) {
      const { tache, resolve, reject } = this.fileAttente.shift();
      this.nombreEnCours++;
      new Promise((resolveTache) => resolveTache(tache()))
        .then(resolve, reject)
        .then(() => {
          this.nombreEnCours--;
          this.lanceTachesEnAttente();
        });
    }
  }

  chargeAvecReessais (chargeur, ressource, essai = 1) {
    return chargeur(ressource).catch((erreur) => {
      if (essai >= this.options.nombreEssais || !erreur?.reessayable) {
        throw erreur;
      }
      const delai = this.options.delaiInitial * 2 ** (essai - 1);
      return this.options.attendre(delai)
        .then(() => this.chargeAvecReessais(chargeur, ressource, essai + 1));
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

function extraitQuestionsServeurImages(questions) {
  return questions.reduce((acc, question) => {
    const { nom_technique, zone_depot_url, zone_cliquable_url, image_au_clic_url } = question;

    if (zone_depot_url) acc[`${nom_technique}_zone_depot`] = zone_depot_url;
    if (zone_cliquable_url) acc[`${nom_technique}_zone_cliquable`] = zone_cliquable_url;
    if (image_au_clic_url) acc[`${nom_technique}_image_au_clic`] = image_au_clic_url;

    return acc;
  }, {});
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

export { chargeurAudio, chargeurJSON, chargeurInlineSvg, extraitDictionnaire, extraitQuestionsReponsesAudios, extraitQuestionsServeurImages };
