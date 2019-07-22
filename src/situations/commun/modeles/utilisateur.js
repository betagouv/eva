import EventEmitter from 'events';

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

  nbSituationsDebloquees () {
    return this.nbSituationsFaites() + 1;
  }

  nbSituationsFaites () {
    const situationsFaitesAccessibles =
      this.registreUtilisateur.situationsFaites().filter((situation) => {
        return this.situationsAccessibles.includes(situation);
      });
    return situationsFaitesAccessibles.length;
  }

  deconnecte () {
    this.registreUtilisateur.deconnecte();
    this.emit(CHANGEMENT_CONNEXION);
  }
}
