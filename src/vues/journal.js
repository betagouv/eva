export class VueJournal {
  constructor (pointInsertion, journal) {
    this.journal = journal;
    this.element = document.createElement('pre');
    this.element.id = 'journal';
    document.querySelector(pointInsertion).appendChild(this.element);
  }

  affiche () {
    this.element.textContent = this.journal.evenements().map((ligne) => {
      return JSON.stringify(ligne);
    }).join('\n');
  }
}
