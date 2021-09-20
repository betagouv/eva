export default class Synchronisateur {
  constructor (registreUtilisateur) {
    this.registreUtilisateur = registreUtilisateur;
  }

  recupereReseau (event) {
    console.log("J'ai récupéré le réseau en vrai");
  }
}
