import Evenement from 'commun/modeles/evenement';

export default class EvenementOuvertureZone extends Evenement {
  constructor (donnees = {}) {
    super('ouvertureZone', donnees);
  }
}
