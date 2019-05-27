import Evenement from './evenement';

export default class EvenementStop extends Evenement {
  constructor (donnees = {}) {
    super('stop', donnees);
  }
}
