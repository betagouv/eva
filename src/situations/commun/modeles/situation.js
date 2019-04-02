
export default class Situation {
  constructor () {
    this.evenements = new Map();
  }

  observateurs (classe) {
    if (!this.evenements.has(classe)) {
      this.evenements.set(classe, []);
    }
    return this.evenements.get(classe);
  }

  observe (classe, action) {
    this.observateurs(classe).push(action);
  }

  notifie (evenement) {
    this.observateurs(evenement.constructor).forEach(action => action(evenement));
  }
}
