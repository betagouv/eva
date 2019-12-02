import Evenement from './evenement';

export default class EvenementAbandon extends Evenement {
  constructor (donnees = {}) {
    super('abandon', donnees);
  }
}
