import Evenement from 'commun/modeles/evenement';

export default class EvenementFinSituation extends Evenement {
  constructor (donnees = {}) {
    super('finSituation', donnees);
  }
}
