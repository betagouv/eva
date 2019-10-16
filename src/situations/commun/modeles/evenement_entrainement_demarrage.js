import Evenement from './evenement';

export default class EvenementEntrainementDemarrage extends Evenement {
  constructor (donnees = {}) {
    super('demarrageEntrainement', donnees);
  }
}
