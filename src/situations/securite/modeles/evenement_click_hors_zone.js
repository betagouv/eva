import Evenement from 'commun/modeles/evenement';

export default class EvenementClickHorsZone extends Evenement {
  constructor (donnees = {}) {
    super('clickHorsZone', donnees);
  }
}
