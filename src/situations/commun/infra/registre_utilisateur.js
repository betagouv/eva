import BaseRegistre from 'commun/infra/base_registre';

export const CLEF_SITUATIONS_FAITES = 'situationsFaites';
export const CLEF_IDENTIFIANT = 'identifiantUtilisateur';
export const CLEF_MODE_HORS_LIGNE = 'modeHorsLigne';
export const CHANGEMENT_CONNEXION = 'changementConnexion';

export default class RegistreUtilisateur extends BaseRegistre {
  inscris (nom, codeCampagne) {
    return new Promise((resolve, reject) => {
      this.$.ajax({
        type: 'POST',
        url: `${this.urlServeur}/api/evaluations`,
        data: JSON.stringify({ nom: nom, code_campagne: codeCampagne }),
        contentType: 'application/json; charset=utf-8',
        success: (data) => {
          const utilisateur = this.enregistreUtilisateurEnLocal(data);
          resolve(utilisateur);
        },
        error: (xhr) => {
          if (this.activeModeHorsLigne(xhr)) {
            var data = {
              id: `temporaire_${nom}`,
              nom: nom
            };
            const utilisateur = this.enregistreUtilisateurEnLocal(data);
            resolve(utilisateur);
          } else {
            reject(xhr);
          }
        }
      });
    }).finally(() => {
      window.localStorage.removeItem(CLEF_SITUATIONS_FAITES);
      this.emit(CHANGEMENT_CONNEXION);
    });
  }

  enregistreContact (email, telephone) {
    return new Promise((resolve, reject) => {
      this.$.ajax({
        type: 'PATCH',
        url: `${this.urlServeur}/api/evaluations/${this.idEvaluation()}`,
        data: JSON.stringify({ email: email, telephone: telephone }),
        contentType: 'application/json; charset=utf-8',
        success: (data) => {
          const utilisateur = this.enregistreUtilisateurEnLocal(data);
          resolve(utilisateur);
        },
        error: (xhr) => {
          if (this.activeModeHorsLigne(xhr)) {
            const data = this.parseLocalStorage(CLEF_IDENTIFIANT);
            data.email = email;
            data.telephone = telephone;
            const utilisateur = this.enregistreUtilisateurEnLocal(data);
            resolve(utilisateur);
          } else {
            reject(xhr);
          }
        }
      });
    });
  }

  urlEvaluation (element = '') {
    const urlEvaluation = `${this.urlServeur}/api/evaluations/${this.idEvaluation()}`;
    if (element.length > 0) {
      return `${urlEvaluation}/${element}`;
    } else {
      return `${urlEvaluation}.json`;
    }
  }

  enregistreUtilisateurEnLocal (data) {
    const utilisateur = JSON.stringify(data);
    window.localStorage.setItem(CLEF_IDENTIFIANT, utilisateur);
    return data;
  }

  estConnecte () {
    return !!this.idEvaluation();
  }

  nom () {
    return this.parseLocalStorage(CLEF_IDENTIFIANT).nom;
  }

  idEvaluation () {
    return this.parseLocalStorage(CLEF_IDENTIFIANT).id;
  }

  enregistreSituationFaite (situation) {
    const situations = this.situationsFaites();
    if (!situations.includes(situation)) {
      situations.push(situation);
    }
    window.localStorage.setItem(CLEF_SITUATIONS_FAITES, JSON.stringify(situations));
  }

  situationsFaites () {
    const situations = window.localStorage.getItem(CLEF_SITUATIONS_FAITES);
    if (situations) {
      return JSON.parse(situations);
    }
    return [];
  }

  deconnecte () {
    window.localStorage.removeItem(CLEF_IDENTIFIANT);
    window.localStorage.removeItem(CLEF_SITUATIONS_FAITES);
    this.emit(CHANGEMENT_CONNEXION);
  }
}
