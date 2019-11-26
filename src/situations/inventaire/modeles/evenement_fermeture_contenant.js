import Evenement from 'commun/modeles/evenement';

export default class EvenementFermetureContenant extends Evenement {
  constructor (donnees = {}) {
    super('fermetureContenant', donnees);
  }
}
