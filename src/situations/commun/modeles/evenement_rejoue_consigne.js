import Evenement from './evenement';

export default class EvenementRejoueConsigne extends Evenement {
  constructor (donnees = {}) {
    super('rejoueConsigne', donnees);
  }
}
