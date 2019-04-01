
export default class Situation {
  constructor () {
    this.evenements = new Map();
  }

  observateurs (nomEvenement) {
    if (!this.evenements.has(nomEvenement)) {
      this.evenements.set(nomEvenement, []);
    }
    return this.evenements.get(nomEvenement);
  }

  observe (evenement, action) {
    this.observateurs(evenement.nom()).push(action);
  }

  notifie (evenement) {
    this.observateurs(evenement.nom()).forEach(action => action(evenement));
  }
}
