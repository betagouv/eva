import Evenement from 'commun/modeles/evenement';

export default class EvenementApparitionMot extends Evenement {
  constructor (donnees = {}) {
    super('apparitionMot', donnees);
  }
}
