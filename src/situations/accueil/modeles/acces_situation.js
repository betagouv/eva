export default class AccesSituation {
  constructor ({ nom, chemin, identifiant, niveauMinimum }) {
    this.nom = nom;
    this.chemin = chemin;
    this.identifiant = identifiant;
    this.niveauMinimum = niveauMinimum;
  }

  estAccessible (niveau) {
    return niveau >= this.niveauMinimum;
  }
}
