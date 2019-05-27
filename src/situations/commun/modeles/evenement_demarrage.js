import Evenement from './evenement';

export default class EvenementDemarrage extends Evenement {
  constructor (donnees = {}) {
    super('demarrage', donnees);
  }
}
