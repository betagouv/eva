import EventEmitter from 'events';

import Progression from 'commun/modeles/progression';

export const CHANGEMENT_CONNEXION = 'changementConnexion';

export default class Utilisateur extends EventEmitter {
  constructor (situationsAccessibles, registreUtilisateur) {
    super();
    this.registreUtilisateur = registreUtilisateur;
    this.situationsAccessibles = situationsAccessibles;
  }

  inscris (nom, codeCampagne) {
    return this.registreUtilisateur.inscris(nom, codeCampagne).then(() => {
      this.emit(CHANGEMENT_CONNEXION);
    });
  }

  estConnecte () {
    return !!this.registreUtilisateur.identifiant();
  }

  nom () {
    return this.registreUtilisateur.nom();
  }

  progression () {
    const situationsFaitesAccessibles =
      this.registreUtilisateur.situationsFaites().filter((situation) => {
        return this.situationsAccessibles.includes(situation);
      });
    return new Progression(situationsFaitesAccessibles);
  }

  deconnecte () {
    this.registreUtilisateur.deconnecte();
    this.emit(CHANGEMENT_CONNEXION);
  }
}
