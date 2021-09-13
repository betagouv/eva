import BaseRegistre from 'commun/infra/base_registre';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

export const CLEF_SITUATIONS_FAITES = 'situationsFaites';
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
        success: (utilisateur) => {
          this.enregistreIdClient();
          this.enregistreUtilisateurEnLocal(utilisateur);
          resolve(utilisateur);
        },
        error: (xhr) => {
          if (this.activeModeHorsLigne(xhr)) {
            this.enregistreIdClient();
            const utilisateurHorsLigne = { nom: nom };
            this.enregistreUtilisateurEnLocal(utilisateurHorsLigne);
            resolve(utilisateurHorsLigne);
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
        success: (utilisateur) => {
          this.enregistreUtilisateurEnLocal(utilisateur);
          resolve(utilisateur);
        },
        error: (xhr) => {
          if (this.activeModeHorsLigne(xhr)) {
            const utilisateur = this.evaluationCourante();
            utilisateur.email = email;
            utilisateur.telephone = telephone;
            this.enregistreUtilisateurEnLocal(utilisateur);
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

  enregistreIdClient () {
    const quatreHeures = 4 / 24;
    Cookies.set('EVA_ID', this.genereIdClient(), { expires: quatreHeures });
  }

  genereIdClient () {
    return uuidv4();
  }

  enregistreUtilisateurEnLocal (data) {
    const utilisateur = JSON.stringify(data);
    window.localStorage.setItem(this.cleEvaluationPourLocalStorage(this.idClient()), utilisateur);
  }

  evaluationCourante () {
    return this.evaluation(this.idClient());
  }

  estConnecte () {
    return !!this.idClient();
  }

  nom () {
    return this.evaluationCourante().nom;
  }

  idEvaluation () {
    return this.evaluationCourante().id;
  }

  idClient () {
    return Cookies.get('EVA_ID');
  }

  evaluation (idClient) {
    const cle = this.cleEvaluationPourLocalStorage(idClient);
    return this.parseLocalStorage(cle);
  }

  cleEvaluationPourLocalStorage (idClient) {
    return `evaluation_${idClient}`;
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
    if (!situations) {
      return [];
    }
    return JSON.parse(situations);
  }

  deconnecte () {
    Cookies.remove('EVA_ID');
    window.localStorage.removeItem(CLEF_SITUATIONS_FAITES);
    this.emit(CHANGEMENT_CONNEXION);
  }
}
