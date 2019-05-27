import Evenement from 'commun/modeles/evenement';

export default class EvenementOuvertureContenant extends Evenement {
  constructor (donnees = {}) {
    super('ouvertureContenant', donnees);
  }
}
