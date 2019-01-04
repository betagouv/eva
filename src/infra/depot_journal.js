export class DepotJournal {
  constructor () {
    this.lignes = JSON.parse(window.localStorage.getItem('journal'));
    if (!this.lignes) {
      this.lignes = [];
      window.localStorage.setItem('journal', JSON.stringify(this.lignes));
    }
  }

  enregistre (ligne) {
    this.lignes.push(ligne);

    window.localStorage.setItem('journal', JSON.stringify(this.lignes));
  }
}
