import Evenement from 'commun/modeles/evenement';

export default class EvenementActivationAide extends Evenement {
  constructor (donnees = {}) {
    super('activationAide', donnees);
  }
}
