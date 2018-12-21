export class Journal {
  constructor (maintenant) {
    this.maintenant = maintenant;
    this.lignes = JSON.parse(window.localStorage.getItem('journal'));
    if (!this.lignes) {
      this.lignes = [];
      window.localStorage.setItem('journal', JSON.stringify(this.lignes));
    }
  }

  enregistre (typeEvenement, valeur) {
    this.lignes.push(
      {
        date: this.maintenant(),
        type: typeEvenement,
        valeur: valeur
      }
    );

    window.localStorage.setItem('journal', JSON.stringify(this.lignes));
  }
}
